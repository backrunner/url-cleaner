import { describe, it, expect, vi, afterEach } from 'vitest';

import { DEFAULT_FILTER_LISTS } from '../constants';
import URLCleaner from '../main';

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

describe('URLCleaner with Default Lists', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load default filter lists when useDefaultLists is true', async () => {
    const cleaner = new URLCleaner({
      useDefaultLists: true
    });

    await cleaner.init();

    const mockEngine = cleaner['engine'];
    expect(mockEngine!.useLists).toHaveBeenCalledTimes(1);

    // Check that useLists was called with the default lists
    const usedLists = vi.mocked(mockEngine!.useLists).mock.calls[0][0];

    // Verify that all default lists were included
    const defaultListsWithIndices = DEFAULT_FILTER_LISTS.map((list, index) => ({ list, index }));
    for (const { list, index } of defaultListsWithIndices) {
      expect(usedLists[index]).toEqual(list);
    }

    // The last item should be the domain-specific rules list
    const lastList = usedLists[usedLists.length - 1];
    expect(lastList.name).toBe('domain-specific-rules');

    // Total count should be default lists plus domain-specific rules
    expect(usedLists.length).toBe(DEFAULT_FILTER_LISTS.length + 1);

    await cleaner.dispose();
  });

  it('should not load default filter lists when useDefaultLists is false', async () => {
    const cleaner = new URLCleaner({
      useDefaultLists: false
    });

    await cleaner.init();

    const mockEngine = cleaner['engine'];

    // Domain-specific rules should still be loaded
    expect(mockEngine!.useLists).toHaveBeenCalledTimes(1);

    // Check that useLists was called with domain-specific rules only
    const usedLists = vi.mocked(mockEngine!.useLists).mock.calls[0][0];

    // Should have exactly one list for domain-specific rules
    expect(usedLists.length).toBe(1);
    expect(usedLists[0].name).toBe('domain-specific-rules');

    // Verify that default lists were not included
    const defaultListNames = DEFAULT_FILTER_LISTS.map(list => list.name);
    const usedListNames = usedLists.map(list => list.name);

    for (const name of defaultListNames) {
      expect(usedListNames.includes(name)).toBe(false);
    }

    await cleaner.dispose();
  });

  it('should combine custom filter lists with default lists when both are provided', async () => {
    const customList = {
      name: 'custom-list',
      raw: '*$removeparam=custom_param'
    };

    const cleaner = new URLCleaner({
      useDefaultLists: true,
      filterLists: [customList]
    });

    await cleaner.init();

    const mockEngine = cleaner['engine'];
    expect(mockEngine!.useLists).toHaveBeenCalledTimes(1);

    // Check that useLists was called with both the custom list and default lists
    const usedLists = vi.mocked(mockEngine!.useLists).mock.calls[0][0];

    // First item should be the custom list
    expect(usedLists[0]).toEqual(customList);

    // Default lists should be included
    DEFAULT_FILTER_LISTS.forEach((list, index) => {
      expect(usedLists[index + 1]).toEqual(list);
    });

    // The last item should be the domain-specific rules list
    const lastList = usedLists[usedLists.length - 1];
    expect(lastList.name).toBe('domain-specific-rules');

    await cleaner.dispose();
  });

  it('should include domain-specific rules in filter lists', async () => {
    const cleaner = new URLCleaner({
      useDefaultLists: false
    });

    await cleaner.init();

    const mockEngine = cleaner['engine'];
    expect(mockEngine!.useLists).toHaveBeenCalledTimes(1);

    // Check that useLists was called with domain-specific rules
    const usedLists = vi.mocked(mockEngine!.useLists).mock.calls[0][0];

    // Should have exactly one list for domain-specific rules
    expect(usedLists.length).toBe(1);
    expect(usedLists[0].name).toBe('domain-specific-rules');

    await cleaner.dispose();
  });
});
