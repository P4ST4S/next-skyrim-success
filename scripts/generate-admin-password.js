#!/usr/bin/env node

/**
 * Generate a bcrypt hash for admin password
 * Usage: node scripts/generate-admin-password.js yourpassword
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('❌ Please provide a password as argument');
  console.log('\nUsage: node scripts/generate-admin-password.js yourpassword');
  process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('❌ Error generating hash:', err);
    process.exit(1);
  }

  console.log('\n✅ Password hash generated successfully!\n');
  console.log('Add this to your .env file:\n');
  console.log(`ADMIN_PASS=${hash}\n`);
  console.log('Or use the plain password (less secure):\n');
  console.log(`ADMIN_PASS=${password}\n`);
});
