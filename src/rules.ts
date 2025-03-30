import type { FilterList } from '@gorhill/ubo-core';

/**
 * Common tracking parameters to remove
 */
export const COMMON_TRACKING_PARAMS = [
  // UTM parameters
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_name',

  // Google related
  'gclid',  // Google Click ID
  'gclsrc', // Google Click Source
  'dclid',  // DoubleClick ID
  '_ga',    // Google Analytics
  '_gl',    // Google Analytics Link Query

  // Facebook related
  'fbclid', // Facebook Click ID
  'fb_action_ids',
  'fb_action_types',
  'fb_source',
  'fb_ref',

  // Microsoft/Bing related
  'msclkid', // Microsoft Click ID

  // Other common tracking IDs
  'cid',      // Campaign ID
  'mc_cid',   // Mailchimp Campaign ID
  'mc_eid',   // Mailchimp Email ID
  'oly_anon_id',
  'oly_enc_id',
  '_hsenc',   // HubSpot
  '_hsmi',    // HubSpot
  'hsa_acc',  // HubSpot
  'hsa_cam',  // HubSpot
  'hsa_grp',  // HubSpot
  'hsa_ad',   // HubSpot
  'hsa_src',  // HubSpot
  'hsa_tgt',  // HubSpot
  'hsa_kw',   // HubSpot
  'hsa_mt',   // HubSpot
  'hsa_net',  // HubSpot
  'hsa_ver',  // HubSpot

  // Xiaohongshu related
  'apptime',
  'shareRedId',
  'share_id',

  // Netease Music related
  'userid',
  'app_version',

  // Other common
  'ref',
  'source',
  'trk',     // LinkedIn
  'li_fat_id', // LinkedIn
  'yclid',   // Yandex Click ID
];

/**
 * Known URL shorteners that may need special handling
 */
export const SHORTENER_DOMAINS = [
  'bit.ly',
  'tinyurl.com',
  'goo.gl',
  't.co',
  'b23.tv',
  'xhslink.com',
  '163cn.tv',
];

/**
 * Domain-specific parameter cleaning rules
 */
export interface DomainCleaningRule {
  /** Domain to match */
  domain: string;
  /** Parameters to remove */
  removeParams: string[];
  /** Whether to clear all query parameters */
  clearAllParams?: boolean;
}

/**
 * Predefined domain-specific cleaning rules
 */
export const DOMAIN_SPECIFIC_RULES: DomainCleaningRule[] = [
  {
    domain: 'www.bilibili.com',
    removeParams: ['*'],
    clearAllParams: true
  },
  {
    domain: 'www.xiaohongshu.com',
    removeParams: ['apptime', 'shareRedId', 'share_id']
  },
  {
    domain: 'y.music.163.com',
    removeParams: ['userid', 'app_version']
  }
];

/**
 * Helper class to build filter rules
 */
export class FilterRuleBuilder {
  /**
   * Create a filter list with common tracking parameters
   *
   * @param name Optional name for the filter list
   */
  public static createCommonTrackingList(name = 'common-tracking-params'): FilterList {
    return new FilterRuleBuilder()
      .removeCommonTrackingParams()
      .build(name);
  }

  /**
   * Create a filter list with domain-specific rules
   *
   * @param name Optional name for the filter list
   */
  public static createDomainSpecificList(name = 'domain-specific-rules'): FilterList {
    const builder = new FilterRuleBuilder();

    for (const rule of DOMAIN_SPECIFIC_RULES) {
      if (rule.clearAllParams) {
        builder.removeAllParams(rule.domain);
      } else {
        for (const param of rule.removeParams) {
          builder.removeParam(param, rule.domain);
        }
      }
    }

    return builder.build(name);
  }

  /**
   * Validates a URL string
   *
   * @param url URL to validate
   * @returns True if valid URL, false otherwise
   */
  public static isValidURL(url: string): boolean {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  }

  private rules: string[] = [];

  /**
   * Add a custom rule
   */
  public addRule(rule: string): this {
    this.rules.push(rule);
    return this;
  }

  /**
   * Add a parameter removal rule
   *
   * @param param Parameter name to remove
   * @param domain Optional domain to restrict the rule to
   */
  public removeParam(param: string, domain?: string): this {
    const prefix = domain ? `${domain}` : '*';
    this.rules.push(`${prefix}$removeparam=${param}`);
    return this;
  }

  /**
   * Add a regex parameter removal rule
   *
   * @param regex Regex pattern to match parameters
   * @param domain Optional domain to restrict the rule to
   */
  public removeParamRegex(regex: string, domain?: string): this {
    const prefix = domain ? `${domain}` : '*';
    this.rules.push(`${prefix}$removeparam=/${regex}/`);
    return this;
  }

  /**
   * Add rules to remove all common tracking parameters
   *
   * @param domain Optional domain to restrict the rules to
   */
  public removeCommonTrackingParams(domain?: string): this {
    for (const param of COMMON_TRACKING_PARAMS) {
      this.removeParam(param, domain);
    }
    return this;
  }

  /**
   * Add a rule to remove all parameters matching a prefix
   *
   * @param prefix Parameter prefix to match
   * @param domain Optional domain to restrict the rule to
   */
  public removeParamsByPrefix(prefix: string, domain?: string): this {
    return this.removeParamRegex(`^${prefix}.*`, domain);
  }

  /**
   * Add a rule to remove all parameters from a domain
   *
   * @param domain Domain to restrict the rule to
   */
  public removeAllParams(domain: string): this {
    this.rules.push(`${domain}$removeparam=*`);
    return this;
  }

  /**
   * Add rules for handling URL shorteners that need redirection
   */
  public addShortenerRules(): this {
    for (const domain of SHORTENER_DOMAINS) {
      this.rules.push(`${domain}$need_redirect=true`);
    }
    return this;
  }

  /**
   * Build the filter list object
   *
   * @param name Optional name for the filter list
   */
  public build(name?: string): FilterList {
    return {
      name,
      raw: this.rules.join('\n')
    };
  }
}
