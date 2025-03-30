/**
 * This is an integration test that demonstrates how to use the URL cleaner in real-world scenarios.
 * Note: These tests use the actual ubo-core engine.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import URLCleaner from '../main';
import { FilterRuleBuilder } from '../rules';

describe('URLCleaner Integration', () => {
  let cleaner: URLCleaner;

  beforeAll(async () => {
    // Create a new URL cleaner with a combination of filter rules
    cleaner = new URLCleaner({
      enableWASM: true,
      filterLists: [
        // Create a filter list with custom rules
        new FilterRuleBuilder()
          .removeParam('utm_source')
          .removeParam('utm_medium')
          .removeParam('utm_campaign')
          .removeParam('fbclid')
          .removeParam('gclid')
          .removeParamRegex('^fb_.*')
          .build('custom-filter-list'),

        // Create a filter list specific to a domain
        new FilterRuleBuilder()
          .removeParam('ref', 'amazon.com')
          .removeParam('pd_rd_r', 'amazon.com')
          .removeParam('pd_rd_w', 'amazon.com')
          .removeParam('pd_rd_wg', 'amazon.com')
          .removeParam('pf_rd_r', 'amazon.com')
          .removeParam('pf_rd_p', 'amazon.com')
          .removeParam('psc', 'amazon.com')
          .build('amazon-specific-filters'),

        // Add rules for Google search parameters
        new FilterRuleBuilder()
          .removeParam('ved', 'google.com')
          .removeParam('ei', 'google.com')
          .removeParam('gs_lcp', 'google.com')
          .removeParam('sourceid', 'google.com')
          .build('google-filters')
      ]
    });

    // Initialize the cleaner
    await cleaner.init();
  });

  afterAll(async () => {
    // Clean up resources
    await cleaner.dispose();
  });

  it('should clean UTM parameters from URLs', async () => {
    const url = 'https://example.com/page?id=123&utm_source=newsletter&utm_medium=email&utm_campaign=summer';
    const result = await cleaner.cleanURLWithResult(url);

    expect(result.url).toBe('https://example.com/page?id=123');
    expect(result.modified).toBe(true);
  });

  it('should clean Facebook tracking parameters', async () => {
    const url = 'https://example.com/product?id=456&fbclid=IwAR1234567890&fb_action=share';
    const result = await cleaner.cleanURLWithResult(url);

    expect(result.url).toBe('https://example.com/product?id=456');
    expect(result.modified).toBe(true);
  });

  it('should clean Amazon specific parameters', async () => {
    const url = 'https://amazon.com/dp/B09B9XJ332?ref=myi_title_dp&psc=1&pd_rd_w=abc';
    const result = await cleaner.cleanURLWithResult(url);

    expect(result.url).toBe('https://amazon.com/dp/B09B9XJ332');
    expect(result.modified).toBe(true);
  });

  it('should clean Google search parameters', async () => {
    const url = 'https://google.com/search?q=test&ved=123&ei=abc&gs_lcp=xyz&sourceid=chrome';
    const result = await cleaner.cleanURLWithResult(url);

    expect(result.url).toBe('https://google.com/search?q=test');
    expect(result.modified).toBe(true);
  });

  it('should not change URLs without tracking parameters', async () => {
    const url = 'https://example.com/page?id=123&category=tech&sort=desc';
    const result = await cleaner.cleanURLWithResult(url);

    expect(result.url).toBe(url);
    expect(result.modified).toBe(false);
  });

  it('should load additional filter lists at runtime', async () => {
    // Add a new filter list at runtime
    await cleaner.loadFilterLists([
      new FilterRuleBuilder()
        .removeParam('sid', 'forum.example.com')
        .build('forum-filters')
    ]);

    const url = 'https://forum.example.com/thread/123?sid=abcdef&page=2';
    const result = await cleaner.cleanURLWithResult(url);

    expect(result.url).toBe('https://forum.example.com/thread/123?page=2');
    expect(result.modified).toBe(true);
  });
});
