/**
 * 🌱 SEED SIMPLE Y CLARO - MVP ADARA STYLE
 */

const Strapi = require('@strapi/strapi');

async function seed() {
  const strapi = await Strapi().load();
  
  console.log('🌱 Iniciando seed MVP...\n');

  // 1. DEPARTAMENTOS
  console.log('📂 Creando departamentos...');
  
  const departments = await Promise.all([
    strapi.entityService.create('api::department.department', {
      data: {
        name: 'Bolsos',
        slug: 'bolsos',
        description: 'Bolsos elegantes para toda ocasión',
        displayOrder: 1,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::department.department', {
      data: {
        name: 'Carteras',
        slug: 'carteras',
        description: 'Carteras prácticas y sofisticadas',
        displayOrder: 2,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::department.department', {
      data: {
        name: 'Accesorios',
        slug: 'accesorios',
        description: 'Complementos perfectos para tu estilo',
        displayOrder: 3,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  console.log(`✓ ${departments.length} departamentos creados\n`);

  // 2. CATEGORÍAS
  console.log('🏷️  Creando categorías...');

  const categories = await Promise.all([
    // Categorías de Bolsos
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Totes',
        slug: 'totes',
        description: 'Bolsos grandes ideales para el día a día',
        department: departments[0].id,
        displayOrder: 1,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Bandoleras',
        slug: 'bandoleras',
        description: 'Bolsos cruzados cómodos y versátiles',
        department: departments[0].id,
        displayOrder: 2,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Mochilas',
        slug: 'mochilas',
        description: 'Mochilas urbanas con estilo',
        department: departments[0].id,
        displayOrder: 3,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    // Categorías de Carteras
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Billeteras',
        slug: 'billeteras',
        description: 'Billeteras elegantes de cuero',
        department: departments[1].id,
        displayOrder: 1,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Tarjeteros',
        slug: 'tarjeteros',
        description: 'Tarjeteros compactos y funcionales',
        department: departments[1].id,
        displayOrder: 2,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Monederos',
        slug: 'monederos',
        description: 'Monederos prácticos con estilo',
        department: departments[1].id,
        displayOrder: 3,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    // Categorías de Accesorios
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Llaveros',
        slug: 'llaveros',
        description: 'Llaveros de cuero premium',
        department: departments[2].id,
        displayOrder: 1,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Organizadores',
        slug: 'organizadores',
        description: 'Organizadores para bolsos',
        department: departments[2].id,
        displayOrder: 2,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::category.category', {
      data: {
        name: 'Estuches',
        slug: 'estuches',
        description: 'Estuches para cosméticos y más',
        department: departments[2].id,
        displayOrder: 3,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  console.log(`✓ ${categories.length} categorías creadas\n`);

  // 3. PRODUCTOS
  console.log('👜 Creando productos...');

  const products = [];

  // BOLSOS
  products.push(
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Bolso Tote Adara',
        slug: 'bolso-tote-adara',
        sku: 'TOTE-001',
        description: '<p>Elegante bolso tote de cuero genuino</p>',
        shortDescription: 'Bolso grande ideal para el trabajo',
        price: 350000,
        salePrice: 315000,
        department: departments[0].id,
        category: categories[0].id,
        inStock: true,
        stockQuantity: 15,
        isFeatured: true,
        isNewArrival: true,
        rating: 4.8,
        reviewCount: 24,
        publishedAt: new Date(),
      },
    }),
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Bandolera Valentina',
        slug: 'bandolera-valentina',
        sku: 'BAND-001',
        description: '<p>Bandolera cruzada de cuero suave</p>',
        shortDescription: 'Perfecta para salir',
        price: 280000,
        department: departments[0].id,
        category: categories[1].id,
        inStock: true,
        stockQuantity: 20,
        isFeatured: true,
        rating: 4.6,
        reviewCount: 18,
        publishedAt: new Date(),
      },
    }),
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Mochila Diana',
        slug: 'mochila-diana',
        sku: 'MOCH-001',
        description: '<p>Mochila urbana con múltiples compartimientos</p>',
        shortDescription: 'Estilo y funcionalidad',
        price: 320000,
        salePrice: 288000,
        department: departments[0].id,
        category: categories[2].id,
        inStock: true,
        stockQuantity: 12,
        isNewArrival: true,
        rating: 4.7,
        reviewCount: 15,
        publishedAt: new Date(),
      },
    })
  );

  // CARTERAS
  products.push(
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Billetera Sophia',
        slug: 'billetera-sophia',
        sku: 'BILL-001',
        description: '<p>Billetera de cuero con múltiples compartimientos</p>',
        shortDescription: 'Elegante y práctica',
        price: 180000,
        salePrice: 162000,
        department: departments[1].id,
        category: categories[3].id,
        inStock: true,
        stockQuantity: 30,
        isFeatured: true,
        isBestseller: true,
        rating: 4.9,
        reviewCount: 45,
        publishedAt: new Date(),
      },
    }),
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Tarjetero Aurora',
        slug: 'tarjetero-aurora',
        sku: 'TARJ-001',
        description: '<p>Tarjetero minimalista de cuero premium</p>',
        shortDescription: 'Compacto y elegante',
        price: 120000,
        department: departments[1].id,
        category: categories[4].id,
        inStock: true,
        stockQuantity: 25,
        isBestseller: true,
        rating: 4.5,
        reviewCount: 32,
        publishedAt: new Date(),
      },
    }),
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Monedero Isabella',
        slug: 'monedero-isabella',
        sku: 'MON-001',
        description: '<p>Monedero con cremallera y diseño sofisticado</p>',
        shortDescription: 'Para tus monedas y billetes',
        price: 150000,
        department: departments[1].id,
        category: categories[5].id,
        inStock: true,
        stockQuantity: 18,
        rating: 4.6,
        reviewCount: 28,
        publishedAt: new Date(),
      },
    })
  );

  // ACCESORIOS
  products.push(
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Llavero Camila',
        slug: 'llavero-camila',
        sku: 'LLAV-001',
        description: '<p>Llavero de cuero con grabado personalizable</p>',
        shortDescription: 'Detalle perfecto',
        price: 45000,
        salePrice: 40000,
        department: departments[2].id,
        category: categories[6].id,
        inStock: true,
        stockQuantity: 50,
        isNewArrival: true,
        rating: 4.7,
        reviewCount: 38,
        publishedAt: new Date(),
      },
    }),
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Organizador Luna',
        slug: 'organizador-luna',
        sku: 'ORG-001',
        description: '<p>Organizador interno para bolsos grandes</p>',
        shortDescription: 'Mantén todo en orden',
        price: 85000,
        department: departments[2].id,
        category: categories[7].id,
        inStock: true,
        stockQuantity: 22,
        rating: 4.4,
        reviewCount: 19,
        publishedAt: new Date(),
      },
    }),
    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Estuche Gabriela',
        slug: 'estuche-gabriela',
        sku: 'EST-001',
        description: '<p>Estuche de cuero para cosméticos y accesorios</p>',
        shortDescription: 'Compacto y versátil',
        price: 95000,
        department: departments[2].id,
        category: categories[8].id,
        inStock: true,
        stockQuantity: 16,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 26,
        publishedAt: new Date(),
      },
    })
  );

  console.log(`✓ ${products.length} productos creados\n`);

  // 4. HERO BANNERS
  console.log('🎯 Creando hero banners...');

  await Promise.all([
    strapi.entityService.create('api::hero-banner.hero-banner', {
      data: {
        title: 'Nueva Colección Primavera 2025',
        subtitle: 'Descubre nuestros diseños exclusivos',
        buttonText: 'Ver Colección',
        buttonLink: '/products',
        textPosition: 'center',
        overlayOpacity: 0.4,
        displayOrder: 1,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::hero-banner.hero-banner', {
      data: {
        title: 'Hasta 30% OFF en Carteras',
        subtitle: 'Ofertas por tiempo limitado',
        buttonText: 'Comprar Ahora',
        buttonLink: '/departments/carteras',
        textPosition: 'left',
        overlayOpacity: 0.5,
        displayOrder: 2,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
    strapi.entityService.create('api::hero-banner.hero-banner', {
      data: {
        title: 'Diseño Artesanal',
        subtitle: 'Cada pieza cuenta una historia',
        buttonText: 'Conoce Más',
        buttonLink: '/products',
        textPosition: 'right',
        overlayOpacity: 0.3,
        displayOrder: 3,
        isActive: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  console.log('✓ 3 hero banners creados\n');

  // 5. STORE CONFIG
  console.log('🏪 Creando configuración...');

  await strapi.entityService.create('api::store-config.store-config', {
    data: {
      storeName: 'Adara Style',
      storeDescription: 'Bolsos y accesorios de cuero premium',
      contactEmail: 'hola@adarastyle.com',
      contactPhone: '+57 320 261 4823',
      whatsappNumber: '+573202614823',
      instagramUrl: 'https://instagram.com/adarastyle',
      facebookUrl: 'https://facebook.com/adarastyle',
      currency: 'COP',
      locale: 'es-CO',
      timezone: 'America/Bogota',
      publishedAt: new Date(),
    },
  });

  console.log('✓ Configuración creada\n');

  // 6. PERMISOS PÚBLICOS
  console.log('🔓 Configurando permisos...');

  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (publicRole) {
    const contentTypes = [
      'department',
      'category',
      'product',
      'hero-banner',
      'store-config',
    ];

    for (const contentType of contentTypes) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${contentType}.${contentType}.find`,
          role: publicRole.id,
        },
      });

      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${contentType}.${contentType}.findOne`,
          role: publicRole.id,
        },
      });
    }
  }

  console.log('✓ Permisos configurados\n');
  
  console.log('\n✅ SEED COMPLETADO!\n');
  console.log('📊 Resumen:');
  console.log('   - 3 Departamentos');
  console.log('   - 9 Categorías');
  console.log('   - 9 Productos');
  console.log('   - 3 Hero Banners\n');

  await strapi.destroy();
}

seed().catch(console.error);
