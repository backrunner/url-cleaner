import type { FilterList } from '@gorhill/ubo-core';
import { StaticNetFilteringEngine, enableWASM } from '@gorhill/ubo-core';

import { DEFAULT_FILTER_LISTS } from './constants';
import { FilterRuleBuilder, SHORTENER_DOMAINS, DOMAIN_SPECIFIC_RULES } from './rules';

export { FilterList } from '@gorhill/ubo-core';
export { FilterRuleBuilder, COMMON_TRACKING_PARAMS, SHORTENER_DOMAINS, DOMAIN_SPECIFIC_RULES } from './rules';
export {
  DEFAULT_FILTER_LISTS,
  createDefaultFilterList,
  UBO_PRIVACY_FILTERS,
  ADGUARD_GENERAL_TRACK_PARAMS,
  ADGUARD_SPECIFIC_TRACK_PARAMS
} from './constants';

export interface URLCleanerOptions {
  /**
   * An array of filter lists
   */
  filterLists?: FilterList[];
  /**
   * Whether to enable WebAssembly for better performance
   * @default true
   */
  enableWASM?: boolean;
  /**
   * Whether to disable PublicSuffixList
   * @default false
   */
  noPSL?: boolean;
  /**
   * Whether to use default built-in filter lists
   * @default false
   */
  useDefaultLists?: boolean;
  /**
   * Whether to handle URL shorteners and special domains with redirection
   * @default false
   */
  handleRedirects?: boolean;
  /**
   * Maximum time in milliseconds to wait for a redirect response
   * @default 5000
   */
  redirectTimeout?: number;
}

export interface CleanURLOptions {
  /**
   * The origin URL
   * @default ''
   */
  originURL?: string;
  /**
   * Whether to follow redirects for URL shorteners
   * @default false
   */
  followRedirects?: boolean;
}

/**
 * Result of URL cleaning operation
 */
export interface CleanURLResult {
  /**
   * The cleaned URL
   */
  url: string;
  /**
   * Whether the URL was modified
   */
  modified: boolean;
  /**
   * Whether a redirect was followed
   */
  redirected: boolean;
  /**
   * The original URL before cleaning
   */
  originalUrl: string;
}

export default class URLCleaner {
  private engine: StaticNetFilteringEngine | null = null;
  private initialized = false;
  private options: URLCleanerOptions;

  /**
   * Create a URL cleaner
   * @param options Options
   */
  public constructor(options: URLCleanerOptions = {}) {
    this.options = {
      redirectTimeout: 5000,
      ...options
    };
  }

  /**
   * Initialize the URL cleaner
   */
  public async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Enable WASM if needed
    if (this.options.enableWASM !== false) {
      await enableWASM();
    }

    // Create engine
    this.engine = await StaticNetFilteringEngine.create({
      noPSL: this.options.noPSL === true,
    });

    // Prepare filter lists
    const filterLists: FilterList[] = [];

    // Add user-provided filter lists if available
    if (this.options.filterLists && this.options.filterLists.length > 0) {
      filterLists.push(...this.options.filterLists);
    }

    // Add default filter lists if enabled
    if (this.options.useDefaultLists) {
      filterLists.push(...DEFAULT_FILTER_LISTS);
    }

    // Add domain-specific rules
    filterLists.push(FilterRuleBuilder.createDomainSpecificList());

    // Load filter lists if there are any
    if (filterLists.length > 0) {
      await this.engine.useLists(filterLists);
    }

    this.initialized = true;
  }

  /**
   * Clean URL query parameters based on the filter rules with detailed result
   * @param url URL to clean
   * @param options Options
   * @returns Object containing cleaning result details
   */
  public async cleanURLWithResult(url: string, options: CleanURLOptions = {}): Promise<CleanURLResult> {
    if (!this.initialized || !this.engine) {
      throw new Error('URLCleaner not initialized. Call init() first.');
    }

    // Initialize result
    const result: CleanURLResult = {
      url,
      modified: false,
      redirected: false,
      originalUrl: url
    };

    // Validate URL
    if (!FilterRuleBuilder.isValidURL(url)) {
      return result; // Return original if invalid
    }

    const originURL = options.originURL || '';
    let currentUrl = url;

    // Handle redirects for URL shorteners
    if (options.followRedirects || this.options.handleRedirects) {
      try {
        const urlObj = new URL(url);
        const needsRedirect = SHORTENER_DOMAINS.includes(urlObj.hostname);

        if (needsRedirect) {
          const redirectedUrl = await this.getRedirectedUrl(url);
          if (redirectedUrl && redirectedUrl !== url) {
            currentUrl = redirectedUrl;
            result.redirected = true;
          }
        }
      } catch {
        // Invalid URL, continue with original
      }
    }

    // Apply parameter cleaning if URL has a query
    if (this.engine.hasQuery({ originURL, url: currentUrl, type: 'main_frame' })) {
      const engineResult = this.engine.filterQuery({
        originURL,
        url: currentUrl,
      });

      if (engineResult?.redirectURL) {
        currentUrl = engineResult.redirectURL;
        result.modified = true;
      }
    }

    // Apply domain-specific cleaning for known domains
    try {
      const urlObj = new URL(currentUrl);
      const domainRule = DOMAIN_SPECIFIC_RULES.find(rule => rule.domain === urlObj.hostname);

      if (domainRule) {
        if (domainRule.clearAllParams) {
          urlObj.search = '';
          currentUrl = urlObj.toString();
          result.modified = true;
        } else if (domainRule.removeParams.length > 0) {
          let paramsRemoved = false;
          for (const param of domainRule.removeParams) {
            if (urlObj.searchParams.has(param)) {
              urlObj.searchParams.delete(param);
              paramsRemoved = true;
            }
          }

          if (paramsRemoved) {
            currentUrl = urlObj.toString();
            result.modified = true;
          }
        }
      }
    } catch {
      // Invalid URL, continue with already processed URL
    }

    result.url = currentUrl;
    return result;
  }

  /**
   * Load additional filter lists
   * @param lists Filter lists to load
   */
  public async loadFilterLists(lists: FilterList[]): Promise<void> {
    if (!this.initialized || !this.engine) {
      throw new Error('URLCleaner not initialized. Call init() first.');
    }

    await this.engine.useLists(lists);
  }

  /**
   * Clean multiple URLs in a text, extracting and cleaning them
   * @param text Text containing URLs to clean
   * @param options Options for URL cleaning
   * @returns Text with cleaned URLs
   */
  public async cleanURLsInText(text: string, options: CleanURLOptions = {}): Promise<string> {
    if (!this.initialized || !this.engine) {
      throw new Error('URLCleaner not initialized. Call init() first.');
    }

    // Simple URL extraction regex
    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;

    const urls: string[] = [];
    let match: RegExpExecArray | null;

    // Extract all URLs
    while ((match = urlRegex.exec(text)) !== null) {
      urls.push(match[0]);
    }

    if (urls.length === 0) {
      return text;
    }

    let newText = text;

    // Process each URL
    await Promise.all(urls.map(async (url) => {
      try {
        const cleanResult = await this.cleanURLWithResult(url, options);
        if (cleanResult.modified || cleanResult.redirected) {
          newText = newText.replace(url, cleanResult.url);
        }
      } catch {
        // Skip invalid URLs
      }
    }));

    return newText;
  }

  /**
   * Release resources
   */
  public async dispose(): Promise<void> {
    if (this.engine) {
      await StaticNetFilteringEngine.release();
      this.engine = null;
      this.initialized = false;
    }
  }

  /**
   * Fetches the redirected URL for a given URL
   * @param url URL to get redirection for
   * @returns The redirected URL or null if there's an error
   */
  private async getRedirectedUrl(url: string): Promise<string | null> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.options.redirectTimeout);

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'manual',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if ([301, 302].includes(response.status)) {
        const location = response.headers.get('location');
        if (location) {
          if (/^https?:\/\//.test(location)) {
            return location;
          } else {
            return new URL(location, url).toString();
          }
        }
      }

      return url;
    } catch {
      // Handle timeout or network errors
      return null;
    }
  }
}
