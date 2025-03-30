import URLCleaner from '../main';
import { FilterRuleBuilder } from '../rules';

async function example() {
  // Create filter rules using the FilterRuleBuilder
  const ruleBuilder = new FilterRuleBuilder();

  // Add specific parameter removal rules
  ruleBuilder
    // Remove specific parameters from all domains
    .removeParam('sessionid')
    .removeParam('token')

    // Domain-specific parameter removal
    .removeParam('ref', 'amazon.com')
    .removeParam('psc', 'amazon.com')

    // Remove all parameters starting with '_' from twitter.com
    .removeParamRegex('^_.*', 'twitter.com')

    // Remove parameters matching a pattern
    .removeParamRegex('session[\\w]*')

    // Add a custom rule (any valid uBlock Origin filter syntax)
    .addRule('example.com##.ads');

  // Create a second rule builder specifically for Google
  const googleRuleBuilder = new FilterRuleBuilder();
  googleRuleBuilder
    .removeParam('ved', 'google.com')
    .removeParam('ei', 'google.com')
    .removeParam('gs_lcp', 'google.com')
    .removeParam('sourceid', 'google.com')
    .removeParamRegex('^aqs.*', 'google.com');

  // Create a URL cleaner with both filter lists
  const cleaner = new URLCleaner({
    enableWASM: true,
    filterLists: [
      // Use the builder to create a filter list
      ruleBuilder.build('custom-filters'),

      // Add Google specific rules
      googleRuleBuilder.build('google-specific-filters'),

      // Use the static helper to add common tracking parameters
      FilterRuleBuilder.createCommonTrackingList()
    ]
  });

  // Initialization happens automatically in the constructor

  // Clean some example URLs
  const examples = [
    'https://example.com/login?sessionid=12345&token=abcdef&valid=yes',
    'https://amazon.com/product/12345?ref=sidebar&psc=1&id=5',
    'https://twitter.com/user?_session=xyz&_csrf=token&username=test',
    'https://google.com/search?q=test&ved=123&ei=abc&gs_lcp=xyz&sourceid=chrome'
  ];

  for (const url of examples) {
    const result = await cleaner.cleanURLWithResult(url);
    console.log(`Original: ${url}`);
    console.log(`Cleaned:  ${result.url}`);
    console.log(`Modified: ${result.modified ? 'Yes' : 'No'}`);
    console.log('---');
  }

  // Release resources when done
  await cleaner.dispose();
}

// Run the example
example().catch(console.error);
