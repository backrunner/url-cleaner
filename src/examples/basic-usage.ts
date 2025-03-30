import URLCleaner from '../main';

// Create a URL cleaner with filter rules for common tracking parameters
async function example() {
  // Create a cleaner instance
  const cleaner = new URLCleaner({
    // Enable WebAssembly for better performance
    enableWASM: true,
    // Provide filter rules
    filterLists: [
      {
        name: 'basic-tracking-params',
        // Simple filter rules to remove common tracking parameters
        raw: `
          # Remove UTM parameters
          *$removeparam=utm_source
          *$removeparam=utm_medium
          *$removeparam=utm_campaign
          *$removeparam=utm_term
          *$removeparam=utm_content

          # Remove Facebook click ID
          *$removeparam=fbclid

          # Remove Google click ID
          *$removeparam=gclid

          # Remove other common tracking parameters
          *$removeparam=_ga
          *$removeparam=_gl
          *$removeparam=ref
          *$removeparam=source
          *$removeparam=mc_cid
          *$removeparam=mc_eid
        `
      }
    ]
  });

  // Initialize the cleaner
  await cleaner.init();

  // Clean some URLs
  const examples = [
    'https://example.com/page?id=123&utm_source=newsletter&utm_medium=email',
    'https://example.com/product?p=456&fbclid=1234567890',
    'https://example.com/article?title=test&gclid=abcdef&_ga=1.2.3.4',
    'https://example.com/normal?id=789&category=tech'
  ];

  for (const url of examples) {
    const result = await cleaner.cleanURLWithResult(url);
    console.log(`Original: ${url}`);
    console.log(`Cleaned:  ${result.url}`);
    console.log(`Modified: ${result.modified}`);
    console.log('---');
  }

  // Clean with origin URL context
  const urlWithOrigin = 'https://example.com/page?id=123&utm_source=newsletter';
  const resultWithOrigin = await cleaner.cleanURLWithResult(urlWithOrigin, {
    originURL: 'https://newsletter.sender.com'
  });
  console.log(`Original: ${urlWithOrigin}`);
  console.log(`Cleaned with origin: ${resultWithOrigin.url}`);

  // Release resources when done
  await cleaner.dispose();
}

// Run the example
example().catch(console.error);
