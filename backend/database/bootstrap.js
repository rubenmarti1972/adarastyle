/**
 * Script de inicialización para crear administrador y ejecutar seed
 */

const axios = require('axios');
const { seed } = require('./seed');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'admin@adarastyle.com';
const ADMIN_PASSWORD = 'Admin123456!';
const ADMIN_USERNAME = 'admin';
const ADMIN_FIRSTNAME = 'Admin';
const ADMIN_LASTNAME = 'AdaraStyle';

async function waitForStrapi(maxRetries = 30) {
  console.log('⏳ Waiting for Strapi to be ready...');

  for (let i = 0; i < maxRetries; i++) {
    try {
      await axios.get(`${STRAPI_URL}/_health`);
      console.log('✅ Strapi is ready!');
      return true;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  throw new Error('Strapi did not start in time');
}

async function createAdmin() {
  try {
    console.log('\n👤 Creating admin user...');

    // Check if admin already exists
    const { data: hasAdmin } = await axios.get(`${STRAPI_URL}/admin/init`);

    if (!hasAdmin.data.hasAdmin) {
      // Create admin
      const response = await axios.post(`${STRAPI_URL}/admin/register-admin`, {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        firstname: ADMIN_FIRSTNAME,
        lastname: ADMIN_LASTNAME,
      });

      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Password: ${ADMIN_PASSWORD}`);
      return response.data;
    } else {
      console.log('ℹ️  Admin user already exists');
      return null;
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error.response?.data || error.message);
    throw error;
  }
}

async function runSeed() {
  try {
    console.log('\n🌱 Running seed...');

    // Load Strapi instance
    const Strapi = require('@strapi/strapi');

    const instance = Strapi.createStrapi({
      dir: require('path').resolve(__dirname, '..'),
    });

    await instance.load();
    global.strapi = instance;

    await seed();

    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error running seed:', error);
    throw error;
  }
}

async function bootstrap() {
  try {
    await waitForStrapi();
    await createAdmin();
    await runSeed();

    console.log('\n🎉 Bootstrap completed successfully!');
    console.log('\n📋 Access information:');
    console.log(`   Admin Panel: ${STRAPI_URL}/admin`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   API: ${STRAPI_URL}/api`);

  } catch (error) {
    console.error('\n❌ Bootstrap failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  bootstrap().then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { bootstrap, createAdmin, runSeed };
