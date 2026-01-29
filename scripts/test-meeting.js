#!/usr/bin/env node

/**
 * Test script for Google Calendar API integration
 *
 * Usage:
 *   node scripts/test-meeting.js
 *   node scripts/test-meeting.js --email test@example.com --name "Test Investor"
 */

const args = process.argv.slice(2);

// Parse command line arguments
const email =
  args.find((arg) => arg.startsWith('--email='))?.split('=')[1] ||
  'test@example.com';
const name =
  args.find((arg) => arg.startsWith('--name='))?.split('=')[1] ||
  'Test Investor';
const date = args.find((arg) => arg.startsWith('--date='))?.split('=')[1];
const time =
  args.find((arg) => arg.startsWith('--time='))?.split('=')[1] || '14:00';

const url = process.env.API_URL || 'http://localhost:3011/api/meetings/book';

const payload = {
  email,
  name,
  ...(date && { preferredDate: date }),
  ...(time && { preferredTime: time }),
};

console.log('🧪 Testing Google Calendar API Integration\n');
console.log('Request:', JSON.stringify(payload, null, 2));
console.log('\nSending request...\n');

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then(async (response) => {
    const data = await response.json();

    console.log(`Status: ${response.status} ${response.statusText}\n`);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok && data.meetingLink) {
      console.log('\n✅ Success! Meeting created.');
      console.log(`\n📅 Meet Link: ${data.meetingLink}`);
      if (data.calendarEventLink) {
        console.log(`📆 Calendar Event: ${data.calendarEventLink}`);
      }
    } else {
      console.log('\n❌ Error creating meeting');
      if (data.error) {
        console.log(`Error: ${data.error}`);
      }
      if (data.message) {
        console.log(`Message: ${data.message}`);
      }
    }
  })
  .catch((error) => {
    console.error('\n❌ Request failed:', error.message);
    console.log('\nMake sure:');
    console.log('1. Dev server is running: npm run dev');
    console.log('2. Environment variables are set in .env');
    process.exit(1);
  });
