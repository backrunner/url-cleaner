import URLCleaner from '../main';

/**
 * Example showing how to use built-in default filter lists
 */
async function example() {
  // Create a cleaner with default filter lists enabled
  const cleaner = new URLCleaner({
    enableWASM: true,
    useDefaultLists: true // This will automatically load the built-in filter lists
  });

  // Initialize the cleaner
  await cleaner.init();

  console.log('Testing with default filter lists:');
  console.log('----------------------------------');

  // Test URLs with various tracking parameters
  const testUrls = [
    // UTM parameters
    'https://example.com/product?id=123&utm_source=newsletter&utm_medium=email&utm_campaign=summer',

    // Google tracking
    'https://www.google.com/search?q=test&ved=123&ei=abc&gs_lcp=xyz',

    // Amazon tracking
    'https://www.amazon.com/dp/B09B9XJ332?pf_rd_r=ABCDEF&pf_rd_p=12345&pd_rd_r=aaabbb',

    // Facebook click ID
    'https://website.com/page?fbclid=IwAR1234567890',

    // YouTube tracking
    'https://www.youtube.com/watch?v=abcdefg&feature=related&si=a1b2c3',

    // Reddit tracking
    'https://www.reddit.com/r/programming?ref_source=email&correlation_id=123456'
  ];

  // Clean each URL and display results
  for (const url of testUrls) {
    const result = await cleaner.cleanURLWithResult(url);
    console.log(`\nOriginal: ${url}`);
    console.log(`Cleaned:  ${result.url}`);
    console.log(`Parameters removed: ${result.modified ? 'Yes' : 'No'}`);
  }

  // Release resources
  await cleaner.dispose();
}

// Run the example
example().catch(console.error);
