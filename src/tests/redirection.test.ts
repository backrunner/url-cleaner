import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';

import URLCleaner from '../main';
import { FilterRuleBuilder, SHORTENER_DOMAINS } from '../rules';

describe('URL Redirection Tests', () => {
  let cleaner: URLCleaner;

  // Mock the fetch function for testing redirects
  const setupFetchMock = () => {
    global.fetch = vi.fn().mockImplementation((url) => {
      // Check if the URL is from b23.tv
      if (url.toString().startsWith('https://b23.tv/')) {
        return Promise.resolve({
          status: 302,
          headers: {
            get: (name: string) => {
              if (name.toLowerCase() === 'location') {
                // Convert b23.tv/BV1jT421a72z to bilibili.com
                const bvid = url.toString().split('/').pop();
                return `https://www.bilibili.com/video/${bvid}`;
              }
              return null;
            }
          }
        });
      }

      // For other URLs, return 200 OK
      return Promise.resolve({
        status: 200,
        headers: {
          get: () => null
        }
      });
    });
  };

  beforeAll(async () => {
    // Setup fetch mock
    setupFetchMock();

    // Create a URL cleaner with redirection handling
    cleaner = new URLCleaner({
      enableWASM: true,
      handleRedirects: true,
      redirectTimeout: 1000, // Short timeout for tests
      filterLists: [
        // Create a filter list with URL shortener rules
        new FilterRuleBuilder()
          .removeCommonTrackingParams()
          .addShortenerRules()
          .build('redirection-test-filters'),

        // Add domain-specific rules
        FilterRuleBuilder.createDomainSpecificList()
      ]
    });

    // Initialize the cleaner
    await cleaner.init();
  });

  afterAll(async () => {
    // Clean up resources
    await cleaner.dispose();

    // Restore original fetch
    vi.restoreAllMocks();
  });

  it('should include b23.tv in the list of shortener domains', () => {
    expect(SHORTENER_DOMAINS).toContain('b23.tv');
  });

  it('should redirect b23.tv links to bilibili.com', async () => {
    const shortUrl = 'https://b23.tv/BV1jT421a72z';
    const expectedUrl = 'https://www.bilibili.com/video/BV1jT421a72z';

    const result = await cleaner.cleanURLWithResult(shortUrl);

    expect(result.redirected).toBe(true);
    expect(result.url).toBe(expectedUrl);
    expect(result.originalUrl).toBe(shortUrl);
  });

  it('should remove query parameters from bilibili.com URLs', async () => {
    const dirtyUrl = 'https://www.bilibili.com/video/BV1jT421a72z?p=1&vd_source=abcdef123456';
    const expectedUrl = 'https://www.bilibili.com/video/BV1jT421a72z';

    const result = await cleaner.cleanURLWithResult(dirtyUrl);

    expect(result.modified).toBe(true);
    expect(result.url).toBe(expectedUrl);
  });

  it('should redirect and clean in a single operation', async () => {
    const shortDirtyUrl = 'https://b23.tv/BV1jT421a72z?p=1&vd_source=abcdef123456';
    const expectedUrl = 'https://www.bilibili.com/video/BV1jT421a72z';

    const result = await cleaner.cleanURLWithResult(shortDirtyUrl);

    expect(result.redirected).toBe(true);
    expect(result.modified).toBe(true);
    expect(result.url).toBe(expectedUrl);
    expect(result.originalUrl).toBe(shortDirtyUrl);
  });

  it('should clean multiple URLs in text content', async () => {
    const text = 'Check these videos: https://b23.tv/BV1jT421a72z and https://www.bilibili.com/video/BV2nV411F7fo?p=2';
    const expectedText = 'Check these videos: https://www.bilibili.com/video/BV1jT421a72z and https://www.bilibili.com/video/BV2nV411F7fo';

    const result = await cleaner.cleanURLsInText(text);

    expect(result).toBe(expectedText);
  });

  it('should handle invalid URLs gracefully', async () => {
    const invalidUrl = 'https://not-a-valid-url-@%$#';

    const result = await cleaner.cleanURLWithResult(invalidUrl);

    expect(result.url).toBe(invalidUrl);
    expect(result.modified).toBe(false);
    expect(result.redirected).toBe(false);
  });
});
