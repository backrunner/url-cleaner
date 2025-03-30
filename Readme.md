# url-cleaner

Clean query parameters from URLs using uBlock Origin's powerful filtering engine. Also supports URL shortener expansion and domain-specific cleaning rules.

This library uses [@gorhill/ubo-core](https://github.com/gorhill/uBlock/tree/master/platform/npm) to remove tracking parameters and clean URLs based on customizable filter rules.

## Installation

```bash
npm install url-cleaner
```

### Requirements

- Node.js 14.0.0 or higher
- This package is ESM-only. It cannot be `require()`'d from CommonJS.

```js
// ✅ Works
import URLCleaner from 'url-cleaner';

// ❌ Does not work
const URLCleaner = require('url-cleaner');
```

## Usage

### Basic Usage

```typescript
import URLCleaner from 'url-cleaner';

// Create a URL cleaner with filter rules
const cleaner = new URLCleaner({
  enableWASM: true, // Optional, enables WebAssembly for better performance
  filterLists: [
    {
      name: 'basic-tracking-params',
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
    `,
    },
  ],
});

// Initialize (must be called before using the cleaner)
await cleaner.init();

// Clean a URL
const result = await cleaner.cleanURLWithResult('https://example.com/page?id=123&utm_source=newsletter');
console.log(result.url); // Output: https://example.com/page?id=123
console.log(result.modified); // Output: true

// Release resources when done
await cleaner.dispose();
```

### URL Redirection and Shortener Expansion

The library can follow redirects from URL shorteners (like bit.ly, t.co, b23.tv) and clean the resulting URLs:

```typescript
import URLCleaner from 'url-cleaner';

// Create a cleaner with redirection support
const cleaner = new URLCleaner({
  handleRedirects: true, // Enable automatic redirection for known URL shorteners
  redirectTimeout: 3000, // Optional: Set timeout for redirect requests (default: 5000ms)
  useDefaultLists: true, // Use built-in filter lists
});

await cleaner.init();

// Get detailed result with redirection information
const result = await cleaner.cleanURLWithResult('https://b23.tv/BV1jT421a72z');
console.log(result);
/* Output:
{
  url: 'https://www.bilibili.com/video/BV1jT421a72z',
  modified: true,
  redirected: true,
  originalUrl: 'https://b23.tv/BV1jT421a72z'
}
*/

// Clean multiple URLs in text
const cleanedText = await cleaner.cleanURLsInText(
  'Check this video: https://b23.tv/BV1jT421a72z and this page: https://example.com?utm_source=email',
);
// Output: 'Check this video: https://www.bilibili.com/video/BV1jT421a72z and this page: https://example.com'

await cleaner.dispose();
```

### Using the FilterRuleBuilder

The library includes a helpful `FilterRuleBuilder` class to create filter rules programmatically:

```typescript
import URLCleaner, { FilterRuleBuilder } from 'url-cleaner';

// Create filter rules using the builder
const ruleBuilder = new FilterRuleBuilder();

// Add rules with fluent API
ruleBuilder
  // Remove specific parameters
  .removeParam('sessionid')
  .removeParam('token')

  // Domain-specific parameter removal
  .removeParam('ref', 'amazon.com')

  // Remove parameters matching a regex pattern
  .removeParamRegex('^_.*', 'twitter.com')

  // Add all common tracking parameters
  .removeCommonTrackingParams()

  // Add rules for URL shorteners that need redirection
  .addShortenerRules();

// Create URL cleaner with the built filter list
const cleaner = new URLCleaner({
  filterLists: [
    ruleBuilder.build('my-filters'),
    // Use helper to create common tracking params list
    FilterRuleBuilder.createCommonTrackingList(),
    // Use helper to create domain-specific rules
    FilterRuleBuilder.createDomainSpecificList(),
  ],
  handleRedirects: true,
});

await cleaner.init();
```

### Domain-Specific Cleaning Rules

The library includes built-in rules for specific domains:

```typescript
import URLCleaner from 'url-cleaner';

const cleaner = new URLCleaner({
  useDefaultLists: true,
  handleRedirects: true,
});

await cleaner.init();

// Bilibili links will have all query parameters removed
const result = await cleaner.cleanURLWithResult(
  'https://www.bilibili.com/video/BV1jT421a72z?p=1&vd_source=abcdef123456',
);
console.log(result.url); // Output: https://www.bilibili.com/video/BV1jT421a72z

// Xiaohongshu links will have specific parameters removed
const xhsResult = await cleaner.cleanURLWithResult('https://www.xiaohongshu.com/discover?apptime=123&shareRedId=456');
console.log(xhsResult.url); // Output: https://www.xiaohongshu.com/discover
```

### Using Built-in Default Filter Lists

The library comes with pre-configured filter lists from uBlock Origin and AdGuard:

```typescript
import URLCleaner from 'url-cleaner';

// Create a cleaner with default filter lists
const cleaner = new URLCleaner({
  useDefaultLists: true, // This will load all built-in filter lists
});

await cleaner.init();

// Clean a URL with tracking parameters
const result = await cleaner.cleanURLWithResult('https://example.com/page?utm_source=newsletter&fbclid=123');
console.log(result.url); // Output: https://example.com/page

await cleaner.dispose();
```

You can also use the built-in filters directly:

```typescript
import URLCleaner, {
  UBO_PRIVACY_FILTERS,
  ADGUARD_GENERAL_TRACK_PARAMS,
  ADGUARD_SPECIFIC_TRACK_PARAMS,
  createDefaultFilterList,
} from 'url-cleaner';

// Create a cleaner with only specific built-in filters
const cleaner = new URLCleaner({
  filterLists: [
    { name: 'ubo-privacy', raw: UBO_PRIVACY_FILTERS },
    // Or use the helper function to combine all default lists
    // createDefaultFilterList()
  ],
});

await cleaner.init();
```

### Providing Context

You can provide the origin URL for more context-aware filtering:

```typescript
const result = await cleaner.cleanURLWithResult('https://example.com/article?utm_source=email', {
  originURL: 'https://mail.sender.com',
});
```

### Loading Additional Filter Lists

```typescript
await cleaner.loadFilterLists([
  {
    name: 'additional-filters',
    raw: '...',
  },
]);
```

## Filter Syntax

This library supports the same filter syntax as uBlock Origin. For removing query parameters, use the `$removeparam` syntax:

```
*$removeparam=parameter_name
domain.com$removeparam=parameter_name
domain.com$removeparam=/regex/
```

For more advanced filtering options, refer to [uBlock Origin's documentation](https://github.com/gorhill/uBlock/wiki/Static-filter-syntax).

## Included Filter Lists

The library includes several built-in filter lists:

1. **uBlock Origin Privacy Filters** - Basic tracking parameter removal
2. **AdGuard General Tracking Parameters** - Common tracking parameters across all domains
3. **AdGuard Specific Tracking Parameters** - Domain-specific tracking parameters (Amazon, Google, YouTube, etc.)
4. **Domain-Specific Rules** - Special handling for sites like Bilibili, Xiaohongshu, etc.

These lists are maintained as constants in the codebase, but can be updated with the included script:

```bash
npm run update-lists
```

This script is also run automatically before each build to ensure the latest filter lists are included.

## Testing

This library includes comprehensive unit and integration tests using Vitest.

To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

The integration tests demonstrate real-world usage of the library with various URL patterns and filter rules.

## Building and Development

To build this project:

```bash
npm run build
```

For development with watch mode:

```bash
npm run watch
```

## License

MIT
