/**
 * Script to download and update filter lists before building
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONSTANTS_FILE_PATH = resolve(__dirname, '../src/constants.ts');

// URLs for filter lists
const UBO_PRIVACY_URL = 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt';
const ADGUARD_GENERAL_URL =
  'https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/master/TrackParamFilter/sections/general_url.txt';
const ADGUARD_SPECIFIC_URL =
  'https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/master/TrackParamFilter/sections/specific.txt';

/**
 * Fetch a filter list from URL
 */
async function fetchFilterList(url) {
  console.log(`Downloading: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

/**
 * Escape backticks in filter list text
 */
function escapeBackticks(text) {
  return text.replace(/`/g, '\\`');
}

/**
 * Update the constants.ts file with new filter lists
 */
async function updateFilterLists() {
  console.log('Updating filter lists...');

  // Fetch all filter lists in parallel
  const [uboPrivacy, adguardGeneral, adguardSpecific] = await Promise.all([
    fetchFilterList(UBO_PRIVACY_URL),
    fetchFilterList(ADGUARD_GENERAL_URL),
    fetchFilterList(ADGUARD_SPECIFIC_URL),
  ]);

  // Check if any fetch failed
  if (!uboPrivacy || !adguardGeneral || !adguardSpecific) {
    console.error('Failed to fetch one or more filter lists. Aborting update.');
    process.exit(1);
  }

  // Escape backticks in filter content to avoid breaking template literals
  const escapedUboPrivacy = escapeBackticks(uboPrivacy);
  const escapedAdguardGeneral = escapeBackticks(adguardGeneral);
  const escapedAdguardSpecific = escapeBackticks(adguardSpecific);

  try {
    // Read existing file content
    const constantsFile = readFileSync(CONSTANTS_FILE_PATH, 'utf8');

    // Replace the template literals with the new content
    let updatedContent = constantsFile.replace(
      /export const UBO_PRIVACY_FILTERS = `[\s\S]*?`;/,
      `export const UBO_PRIVACY_FILTERS = \`\n${escapedUboPrivacy}\`;`,
    );

    updatedContent = updatedContent.replace(
      /export const ADGUARD_GENERAL_TRACK_PARAMS = `[\s\S]*?`;/,
      `export const ADGUARD_GENERAL_TRACK_PARAMS = \`\n${escapedAdguardGeneral}\`;`,
    );

    updatedContent = updatedContent.replace(
      /export const ADGUARD_SPECIFIC_TRACK_PARAMS = `[\s\S]*?`;/,
      `export const ADGUARD_SPECIFIC_TRACK_PARAMS = \`\n${escapedAdguardSpecific}\`;`,
    );

    // Write back to the file
    writeFileSync(CONSTANTS_FILE_PATH, updatedContent, 'utf8');

    console.log('Filter lists updated successfully!');

    // Update timestamp in the header
    const timestamp = new Date().toISOString();
    console.log(`Filter lists updated at: ${timestamp}`);
  } catch (error) {
    console.error('Error updating constants file:', error);
    process.exit(1);
  }
}

// Run the update
updateFilterLists().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
