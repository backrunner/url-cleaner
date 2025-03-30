import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import URLCleaner from '../main';
import { FilterRuleBuilder } from '../rules';

// Mock the ubo-core module
vi.mock('@gorhill/ubo-core', async () => {
  const mockEngine = {
    useLists: vi.fn().mockResolvedValue(undefined),
    matchRequest: vi.fn().mockReturnValue(0),
    hasQuery: vi.fn(),
    filterQuery: vi.fn(),
    toLogData: vi.fn().mockReturnValue({}),
  };

  return {
    StaticNetFilteringEngine: {
      create: vi.fn().mockResolvedValue(mockEngine),
      release: vi.fn().mockResolvedValue(undefined),
    },
    enableWASM: vi.fn().mockResolvedValue(true),
  };
});

describe('URLCleaner', () => {
  let cleaner: URLCleaner;

  beforeEach(async () => {
    // Create a new cleaner instance before each test
    cleaner = new URLCleaner({
      enableWASM: true,
      filterLists: [
        FilterRuleBuilder.createCommonTrackingList(),
      ],
    });
    await cleaner.init();
  });

  afterEach(async () => {
    // Dispose cleaner after each test
    await cleaner.dispose();
    vi.clearAllMocks();
  });

  it('should initialize correctly', () => {
    expect(cleaner['initialized']).toBe(true);
    expect(cleaner['engine']).not.toBeNull();
  });

  it('should throw error if trying to clean URL before initialization', async () => {
    const uninitializedCleaner = new URLCleaner();

    await expect(async () => {
      await uninitializedCleaner.cleanURLWithResult('https://example.com');
    }).rejects.toThrow('URLCleaner not initialized');
  });

  it('should return original URL when no query parameters need cleaning', async () => {
    // Mock hasQuery to return false
    const mockEngine = cleaner['engine'];
    vi.mocked(mockEngine!.hasQuery).mockReturnValueOnce(false);

    const url = 'https://example.com/page?id=123';
    const result = await cleaner.cleanURLWithResult(url);

    // Should return the original URL
    expect(result.url).toBe(url);
    expect(result.modified).toBe(false);
    expect(mockEngine!.hasQuery).toHaveBeenCalledWith({
      originURL: '',
      url,
      type: 'main_frame',
    });
  });

  it('should clean URL when query parameters need removal', async () => {
    // Mock hasQuery to return true
    const mockEngine = cleaner['engine'];
    vi.mocked(mockEngine!.hasQuery).mockReturnValueOnce(true);

    // Mock filterQuery to return a modified URL
    const originalUrl = 'https://example.com/page?id=123&utm_source=test';
    const cleanedUrl = 'https://example.com/page?id=123';
    vi.mocked(mockEngine!.filterQuery).mockReturnValueOnce({
      redirectURL: cleanedUrl,
    });

    const result = await cleaner.cleanURLWithResult(originalUrl);

    // Should return the cleaned URL
    expect(result.url).toBe(cleanedUrl);
    expect(result.modified).toBe(true);
    expect(result.originalUrl).toBe(originalUrl);
    expect(mockEngine!.hasQuery).toHaveBeenCalledWith({
      originURL: '',
      url: originalUrl,
      type: 'main_frame',
    });
    expect(mockEngine!.filterQuery).toHaveBeenCalledWith({
      originURL: '',
      url: originalUrl,
    });
  });

  it('should use originURL when provided', async () => {
    // Mock hasQuery to return true
    const mockEngine = cleaner['engine'];
    vi.mocked(mockEngine!.hasQuery).mockReturnValueOnce(true);

    // Mock filterQuery to return a modified URL
    const originalUrl = 'https://example.com/page?utm_source=newsletter';
    const cleanedUrl = 'https://example.com/page';
    const originURL = 'https://newsletter.sender.com';
    vi.mocked(mockEngine!.filterQuery).mockReturnValueOnce({
      redirectURL: cleanedUrl,
    });

    const result = await cleaner.cleanURLWithResult(originalUrl, { originURL });

    // Should return the cleaned URL
    expect(result.url).toBe(cleanedUrl);
    expect(result.modified).toBe(true);
    expect(mockEngine!.hasQuery).toHaveBeenCalledWith({
      originURL,
      url: originalUrl,
      type: 'main_frame',
    });
    expect(mockEngine!.filterQuery).toHaveBeenCalledWith({
      originURL,
      url: originalUrl,
    });
  });

  it('should load additional filter lists', async () => {
    const mockEngine = cleaner['engine'];

    const additionalList = {
      name: 'additional-list',
      raw: '*$removeparam=test',
    };

    await cleaner.loadFilterLists([additionalList]);

    expect(mockEngine!.useLists).toHaveBeenCalledWith([additionalList]);
  });

  it('should throw error if trying to load filter lists before initialization', async () => {
    const uninitializedCleaner = new URLCleaner();

    await expect(async () => {
      await uninitializedCleaner.loadFilterLists([{ name: 'test', raw: '' }]);
    }).rejects.toThrow('URLCleaner not initialized');
  });
});
