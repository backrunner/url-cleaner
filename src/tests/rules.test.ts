import { describe, it, expect } from 'vitest';

import { FilterRuleBuilder, COMMON_TRACKING_PARAMS } from '../rules';

describe('FilterRuleBuilder', () => {
  describe('removeParam', () => {
    it('should create a parameter removal rule for all domains', () => {
      const builder = new FilterRuleBuilder();
      builder.removeParam('utm_source');

      const result = builder.build();
      expect(result.raw).toBe('*$removeparam=utm_source');
    });

    it('should create a parameter removal rule for a specific domain', () => {
      const builder = new FilterRuleBuilder();
      builder.removeParam('utm_source', 'example.com');

      const result = builder.build();
      expect(result.raw).toBe('example.com$removeparam=utm_source');
    });

    it('should support chained calls', () => {
      const builder = new FilterRuleBuilder();
      builder
        .removeParam('param1')
        .removeParam('param2');

      const result = builder.build();
      expect(result.raw).toBe('*$removeparam=param1\n*$removeparam=param2');
    });
  });

  describe('removeParamRegex', () => {
    it('should create a regex parameter removal rule for all domains', () => {
      const builder = new FilterRuleBuilder();
      builder.removeParamRegex('utm_.*');

      const result = builder.build();
      expect(result.raw).toBe('*$removeparam=/utm_.*/')
    });

    it('should create a regex parameter removal rule for a specific domain', () => {
      const builder = new FilterRuleBuilder();
      builder.removeParamRegex('utm_.*', 'example.com');

      const result = builder.build();
      expect(result.raw).toBe('example.com$removeparam=/utm_.*/');
    });
  });

  describe('removeCommonTrackingParams', () => {
    it('should add rules for all common tracking parameters', () => {
      const builder = new FilterRuleBuilder();
      builder.removeCommonTrackingParams();

      const result = builder.build();

      // Count the number of lines in the result
      const lineCount = (result.raw || '').split('\n').length;

      // Should have one line for each common tracking parameter
      expect(lineCount).toBe(COMMON_TRACKING_PARAMS.length);

      // Check that each parameter is included
      for (const param of COMMON_TRACKING_PARAMS) {
        expect(result.raw).toContain(`*$removeparam=${param}`);
      }
    });

    it('should add domain-specific rules for all common tracking parameters', () => {
      const builder = new FilterRuleBuilder();
      builder.removeCommonTrackingParams('example.com');

      const result = builder.build();

      // Check that each parameter is included with the domain
      for (const param of COMMON_TRACKING_PARAMS) {
        expect(result.raw).toContain(`example.com$removeparam=${param}`);
      }
    });
  });

  describe('removeParamsByPrefix', () => {
    it('should create a regex rule that matches parameters by prefix', () => {
      const builder = new FilterRuleBuilder();
      builder.removeParamsByPrefix('utm_');

      const result = builder.build();
      expect(result.raw).toBe('*$removeparam=/^utm_.*/')
    });
  });

  describe('addRule', () => {
    it('should add a custom rule', () => {
      const builder = new FilterRuleBuilder();
      builder.addRule('example.com##.ads');

      const result = builder.build();
      expect(result.raw).toBe('example.com##.ads');
    });
  });

  describe('build', () => {
    it('should return a FilterList object with the rules', () => {
      const builder = new FilterRuleBuilder();
      builder
        .removeParam('param1')
        .removeParam('param2');

      const result = builder.build('test-list');

      expect(result).toEqual({
        name: 'test-list',
        raw: '*$removeparam=param1\n*$removeparam=param2'
      });
    });
  });

  describe('createCommonTrackingList', () => {
    it('should create a filter list with all common tracking parameters', () => {
      const result = FilterRuleBuilder.createCommonTrackingList();

      expect(result.name).toBe('common-tracking-params');

      // Check that each parameter is included
      for (const param of COMMON_TRACKING_PARAMS) {
        expect(result.raw).toContain(`*$removeparam=${param}`);
      }
    });

    it('should accept a custom name', () => {
      const result = FilterRuleBuilder.createCommonTrackingList('custom-name');

      expect(result.name).toBe('custom-name');
    });
  });
});
