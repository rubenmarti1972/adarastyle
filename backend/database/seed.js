/**
 * Script de seed para poblar la base de datos con datos de ejemplo
 * Incluye: themes, departments, products, store config, hero banners, collections, lookbooks, brand stories
 *
 * Características:
 * - Configuración automática de permisos públicos para todos los content types
 * - Contenido CMS completo para diseño impactante e-commerce
 * - Inspirado en: Liderlamp, Bershka, Likely, Mr. Wonderful
 */

const { faker } = require('@faker-js/faker');
const {
  heroBanners,
  featuredCollections,
  lookbooks,
  brandStories,
} = require('./seed-cms-content');

// Definir los 6 temas
const themes = [
  {
    name: 'elegante',
    displayName: 'Elegante',
    description: 'Tema sofisticado con vinotinto, dorado y blanco. Perfecto para marcas de lujo.',
    slug: 'elegante',
    isActive: true,
    colors: {
      primary: '#8B1538', // Vinotinto
      secondary: '#D4AF37', // Dorado
      accent: '#FFFFFF', // Blanco
      background: '#FFFFFF',
      backgroundAlt: '#FFF8F0',
      text: '#2D1B1E',
      textLight: '#6B4C4F',
      border: '#E8D5C4',
      success: '#2D5F3F',
      warning: '#C07F00',
      error: '#8B1538',
      info: '#4A5D7C',
    },
    fonts: {
      primary: 'Playfair Display, serif',
      secondary: 'Lato, sans-serif',
      headingWeight: '700',
      bodyWeight: '400',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2.5rem',
      xxl: '4rem',
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      xl: '12px',
      full: '9999px',
    },
    shadows: {
      sm: '0 2px 4px rgba(139, 21, 56, 0.08)',
      md: '0 4px 12px rgba(139, 21, 56, 0.12)',
      lg: '0 8px 24px rgba(139, 21, 56, 0.16)',
      xl: '0 16px 48px rgba(139, 21, 56, 0.2)',
    },
    animations: {
      duration: '0.4s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  {
    name: 'minimalista',
    displayName: 'Minimalista',
    description: 'Diseño limpio y moderno con colores neutros y tipografía elegante.',
    slug: 'minimalista',
    isActive: false,
    colors: {
      primary: '#1A1A1A',
      secondary: '#757575',
      accent: '#FFFFFF',
      background: '#FFFFFF',
      backgroundAlt: '#F5F5F5',
      text: '#1A1A1A',
      textLight: '#757575',
      border: '#E0E0E0',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
    fonts: {
      primary: 'Helvetica Neue, sans-serif',
      secondary: 'Arial, sans-serif',
      headingWeight: '300',
      bodyWeight: '400',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
      xl: '3rem',
      xxl: '5rem',
    },
    borderRadius: {
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 2px 4px rgba(0,0,0,0.08)',
      lg: '0 4px 8px rgba(0,0,0,0.12)',
      xl: '0 8px 16px rgba(0,0,0,0.15)',
    },
    animations: {
      duration: '0.2s',
      easing: 'linear',
    },
  },
  {
    name: 'colorido',
    displayName: 'Colorido',
    description: 'Paleta vibrante y alegre con elementos decorativos llamativos.',
    slug: 'colorido',
    isActive: false,
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      background: '#FFFFFF',
      backgroundAlt: '#FFF9E6',
      text: '#2C3E50',
      textLight: '#7F8C8D',
      border: '#E8E8E8',
      success: '#51CF66',
      warning: '#FFA94D',
      error: '#FF6B6B',
      info: '#4DABF7',
    },
    fonts: {
      primary: 'Poppins, sans-serif',
      secondary: 'Open Sans, sans-serif',
      headingWeight: '700',
      bodyWeight: '400',
    },
    spacing: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1.25rem',
      lg: '2rem',
      xl: '3rem',
      xxl: '4.5rem',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },
    shadows: {
      sm: '0 2px 8px rgba(255, 107, 107, 0.15)',
      md: '0 4px 16px rgba(255, 107, 107, 0.2)',
      lg: '0 8px 32px rgba(255, 107, 107, 0.25)',
      xl: '0 16px 48px rgba(255, 107, 107, 0.3)',
    },
    animations: {
      duration: '0.3s',
      easing: 'ease-out',
    },
  },
  {
    name: 'moderno',
    displayName: 'Moderno',
    description: 'Diseño contemporáneo con gradientes y animaciones suaves.',
    slug: 'moderno',
    isActive: false,
    colors: {
      primary: '#667EEA',
      secondary: '#764BA2',
      accent: '#F093FB',
      background: '#FFFFFF',
      backgroundAlt: '#F7FAFC',
      text: '#2D3748',
      textLight: '#718096',
      border: '#E2E8F0',
      success: '#48BB78',
      warning: '#ED8936',
      error: '#F56565',
      info: '#4299E1',
    },
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Roboto, sans-serif',
      headingWeight: '600',
      bodyWeight: '400',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '14px',
      xl: '20px',
      full: '9999px',
    },
    shadows: {
      sm: '0 2px 10px rgba(102, 126, 234, 0.1)',
      md: '0 4px 20px rgba(102, 126, 234, 0.15)',
      lg: '0 10px 40px rgba(102, 126, 234, 0.2)',
      xl: '0 20px 60px rgba(102, 126, 234, 0.25)',
    },
    animations: {
      duration: '0.35s',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },
  {
    name: 'boutique',
    displayName: 'Boutique',
    description: 'Estilo femenino y delicado con tonos pasteles y detalles románticos.',
    slug: 'boutique',
    isActive: false,
    colors: {
      primary: '#E91E63',
      secondary: '#F8BBD0',
      accent: '#FCE4EC',
      background: '#FFFFFF',
      backgroundAlt: '#FFF0F5',
      text: '#4A4A4A',
      textLight: '#9E9E9E',
      border: '#F5E6E8',
      success: '#66BB6A',
      warning: '#FFA726',
      error: '#EF5350',
      info: '#42A5F5',
    },
    fonts: {
      primary: 'Cormorant Garamond, serif',
      secondary: 'Montserrat, sans-serif',
      headingWeight: '600',
      bodyWeight: '400',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },
    shadows: {
      sm: '0 2px 8px rgba(233, 30, 99, 0.1)',
      md: '0 4px 16px rgba(233, 30, 99, 0.15)',
      lg: '0 8px 24px rgba(233, 30, 99, 0.2)',
      xl: '0 16px 40px rgba(233, 30, 99, 0.25)',
    },
    animations: {
      duration: '0.4s',
      easing: 'ease-in-out',
    },
  },
  {
    name: 'vintage',
    displayName: 'Vintage',
    description: 'Estilo retro nostálgico con tonos sepia y tipografía clásica.',
    slug: 'vintage',
    isActive: false,
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#F4A460',
      background: '#FFF8DC',
      backgroundAlt: '#FAEBD7',
      text: '#3E2723',
      textLight: '#6D4C41',
      border: '#D7CCC8',
      success: '#7CB342',
      warning: '#FB8C00',
      error: '#D84315',
      info: '#0277BD',
    },
    fonts: {
      primary: 'Merriweather, serif',
      secondary: 'Lora, serif',
      headingWeight: '700',
      bodyWeight: '400',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    borderRadius: {
      sm: '3px',
      md: '6px',
      lg: '10px',
      xl: '14px',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 4px rgba(139, 69, 19, 0.2)',
      md: '0 3px 8px rgba(139, 69, 19, 0.25)',
      lg: '0 6px 16px rgba(139, 69, 19, 0.3)',
      xl: '0 12px 32px rgba(139, 69, 19, 0.35)',
    },
    animations: {
      duration: '0.5s',
      easing: 'ease',
    },
  },
];

// Departamentos de bolsos
const departments = [
  {
    name: 'Bolsos de Mano',
    slug: 'bolsos-de-mano',
    description: 'Elegantes bolsos de mano para complementar tu look diario',
    displayOrder: 1,
    isActive: true,
    icon: 'handbag',
  },
  {
    name: 'Carteras',
    slug: 'carteras',
    description: 'Carteras prácticas y sofisticadas para llevar lo esencial',
    displayOrder: 2,
    isActive: true,
    icon: 'wallet',
  },
  {
    name: 'Mochilas',
    slug: 'mochilas',
    description: 'Mochilas versátiles que combinan estilo y funcionalidad',
    displayOrder: 3,
    isActive: true,
    icon: 'backpack',
  },
  {
    name: 'Clutches',
    slug: 'clutches',
    description: 'Clutches sofisticados para eventos especiales',
    displayOrder: 4,
    isActive: true,
    icon: 'clutch',
  },
  {
    name: 'Bandoleras',
    slug: 'bandoleras',
    description: 'Bandoleras prácticas de diseño contemporáneo',
    displayOrder: 5,
    isActive: true,
    icon: 'crossbody',
  },
];

// Productos de bolsos de lujo
const products = [
  // Bolsos de Mano
  {
    name: 'Bolso Adara Signature',
    sku: 'ADS-001',
    description: 'Bolso de mano en cuero italiano premium con acabados en dorado. Diseño exclusivo con el monograma Adara. Interior espacioso con múltiples compartimentos.',
    shortDescription: 'Elegancia atemporal en cuero italiano',
    price: 890000,
    salePrice: null,
    department: 'bolsos-de-mano',
    inStock: true,
    stockQuantity: 15,
    specifications: {
      material: 'Cuero italiano genuino',
      dimensions: '35cm x 28cm x 15cm',
      weight: '850g',
      color: 'Vinotinto con detalles dorados',
      brand: 'AdaraStyle',
      madeIn: 'Italia',
    },
    tags: ['nuevo', 'exclusivo', 'lujo', 'cuero-italiano'],
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 47,
  },
  {
    name: 'Bolso Valentina Classic',
    sku: 'VAL-002',
    description: 'Bolso clásico en piel suave con cierre magnético y correa ajustable. Perfecto para el día a día con un toque de sofisticación.',
    shortDescription: 'Sofisticación para cada día',
    price: 650000,
    salePrice: 585000,
    department: 'bolsos-de-mano',
    inStock: true,
    stockQuantity: 23,
    specifications: {
      material: 'Piel bovina premium',
      dimensions: '32cm x 25cm x 12cm',
      weight: '720g',
      color: 'Negro con herrajes dorados',
      brand: 'AdaraStyle',
      madeIn: 'Colombia',
    },
    tags: ['bestseller', 'clasico', 'versatil'],
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 128,
  },
  {
    name: 'Bolso Isabella Elite',
    sku: 'ISA-003',
    description: 'Diseño exclusivo en cuero de becerro con textura única. Incluye espejo y compartimento para laptop de 13 pulgadas.',
    shortDescription: 'Lujo y funcionalidad en perfecta armonía',
    price: 1250000,
    salePrice: null,
    department: 'bolsos-de-mano',
    inStock: true,
    stockQuantity: 8,
    specifications: {
      material: 'Cuero de becerro',
      dimensions: '38cm x 30cm x 16cm',
      weight: '950g',
      color: 'Cognac con detalles en oro rosa',
      brand: 'AdaraStyle Elite',
      madeIn: 'Francia',
    },
    tags: ['premium', 'ejecutivo', 'laptop'],
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 23,
  },

  // Carteras
  {
    name: 'Cartera Sophia Mini',
    sku: 'SOP-004',
    description: 'Cartera compacta en piel texturizada con múltiples ranuras para tarjetas y compartimento para billetes.',
    shortDescription: 'Elegancia en formato compacto',
    price: 280000,
    salePrice: null,
    department: 'carteras',
    inStock: true,
    stockQuantity: 45,
    specifications: {
      material: 'Piel texturizada',
      dimensions: '19cm x 10cm x 3cm',
      weight: '180g',
      color: 'Vinotinto',
      brand: 'AdaraStyle',
      madeIn: 'Colombia',
    },
    tags: ['practico', 'compacto', 'rfid'],
    isFeatured: false,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    name: 'Cartera Aurora Premium',
    sku: 'AUR-005',
    description: 'Cartera de lujo en cuero italiano con protección RFID. Costuras a mano y acabados impecables.',
    shortDescription: 'Protección y estilo premium',
    price: 420000,
    salePrice: 378000,
    department: 'carteras',
    inStock: true,
    stockQuantity: 32,
    specifications: {
      material: 'Cuero italiano Nappa',
      dimensions: '20cm x 11cm x 2.5cm',
      weight: '200g',
      color: 'Negro mate',
      brand: 'AdaraStyle',
      madeIn: 'Italia',
    },
    tags: ['premium', 'rfid', 'italiano'],
    isFeatured: true,
    isNewArrival: false,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 56,
  },

  // Mochilas
  {
    name: 'Mochila Diana Urban',
    sku: 'DIA-006',
    description: 'Mochila urbana en cuero suave con compartimento acolchado para laptop. Diseño ergonómico y elegante.',
    shortDescription: 'Estilo urbano con total comodidad',
    price: 780000,
    salePrice: null,
    department: 'mochilas',
    inStock: true,
    stockQuantity: 18,
    specifications: {
      material: 'Cuero suave y nylon premium',
      dimensions: '30cm x 40cm x 15cm',
      weight: '680g',
      color: 'Negro con detalles vinotinto',
      brand: 'AdaraStyle',
      madeIn: 'Colombia',
    },
    tags: ['urbano', 'laptop', 'ergonomico'],
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 34,
  },
  {
    name: 'Mochila Camila Luxury',
    sku: 'CAM-007',
    description: 'Mochila de lujo en cuero premium con múltiples bolsillos y sistema anti-robo. Perfecta para viajes.',
    shortDescription: 'Lujo y seguridad para tus viajes',
    price: 950000,
    salePrice: null,
    department: 'mochilas',
    inStock: true,
    stockQuantity: 12,
    specifications: {
      material: 'Cuero premium full-grain',
      dimensions: '32cm x 42cm x 18cm',
      weight: '820g',
      color: 'Café cognac',
      brand: 'AdaraStyle',
      madeIn: 'España',
    },
    tags: ['lujo', 'viajes', 'anti-robo'],
    isFeatured: false,
    isNewArrival: false,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 28,
  },

  // Clutches
  {
    name: 'Clutch Gabriela Evening',
    sku: 'GAB-008',
    description: 'Clutch sofisticado en satén con cristales Swarovski. Incluye cadena desmontable en tono dorado.',
    shortDescription: 'Brillo y elegancia para la noche',
    price: 480000,
    salePrice: null,
    department: 'clutches',
    inStock: true,
    stockQuantity: 25,
    specifications: {
      material: 'Satén premium con cristales Swarovski',
      dimensions: '25cm x 12cm x 5cm',
      weight: '280g',
      color: 'Vinotinto con cristales',
      brand: 'AdaraStyle Evening',
      madeIn: 'Italia',
    },
    tags: ['fiesta', 'swarovski', 'elegante'],
    isFeatured: true,
    isNewArrival: true,
    isBestseller: false,
    rating: 5.0,
    reviewCount: 19,
  },
  {
    name: 'Clutch Marina Gold',
    sku: 'MAR-009',
    description: 'Clutch minimalista en cuero metalizado con cierre joya. Diseño atemporal para cualquier ocasión especial.',
    shortDescription: 'Minimalismo dorado',
    price: 390000,
    salePrice: 351000,
    department: 'clutches',
    inStock: true,
    stockQuantity: 30,
    specifications: {
      material: 'Cuero metalizado',
      dimensions: '23cm x 13cm x 4cm',
      weight: '240g',
      color: 'Dorado',
      brand: 'AdaraStyle',
      madeIn: 'Colombia',
    },
    tags: ['minimalista', 'dorado', 'versatil'],
    isFeatured: false,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 67,
  },

  // Bandoleras
  {
    name: 'Bandolera Luna Crossbody',
    sku: 'LUN-010',
    description: 'Bandolera versátil en cuero suave con correa ajustable. Perfecta para llevar lo esencial con estilo.',
    shortDescription: 'Versatilidad y estilo en movimiento',
    price: 520000,
    salePrice: null,
    department: 'bandoleras',
    inStock: true,
    stockQuantity: 28,
    specifications: {
      material: 'Cuero suave premium',
      dimensions: '22cm x 18cm x 8cm',
      weight: '380g',
      color: 'Camel',
      brand: 'AdaraStyle',
      madeIn: 'Colombia',
    },
    tags: ['crossbody', 'versatil', 'practico'],
    isFeatured: true,
    isNewArrival: false,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 92,
  },
  {
    name: 'Bandolera Natalia Chic',
    sku: 'NAT-011',
    description: 'Diseño contemporáneo en cuero italiano con hebilla dorada. Ideal para el día a día con un toque chic.',
    shortDescription: 'Chic contemporáneo italiano',
    price: 680000,
    salePrice: null,
    department: 'bandoleras',
    inStock: true,
    stockQuantity: 20,
    specifications: {
      material: 'Cuero italiano',
      dimensions: '24cm x 20cm x 10cm',
      weight: '420g',
      color: 'Negro',
      brand: 'AdaraStyle',
      madeIn: 'Italia',
    },
    tags: ['chic', 'italiano', 'contemporaneo'],
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 41,
  },
  {
    name: 'Bandolera Victoria Mini',
    sku: 'VIC-012',
    description: 'Mini bandolera en piel de primera calidad. Tamaño compacto pero con espacio inteligente.',
    shortDescription: 'Compacta pero espaciosa',
    price: 450000,
    salePrice: 405000,
    department: 'bandoleras',
    inStock: true,
    stockQuantity: 35,
    specifications: {
      material: 'Piel de primera calidad',
      dimensions: '18cm x 15cm x 6cm',
      weight: '290g',
      color: 'Vinotinto',
      brand: 'AdaraStyle',
      madeIn: 'Colombia',
    },
    tags: ['mini', 'compacto', 'practico'],
    isFeatured: true,
    isNewArrival: false,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 73,
  },
];

async function seed() {
  console.log('🌱 Starting seed process...\n');

  try {
    // 1. Crear temas
    console.log('📐 Creating themes...');
    const createdThemes = {};

    for (const themeData of themes) {
      const theme = await strapi.db.query('api::theme.theme').create({
        data: themeData,
      });
      createdThemes[theme.slug] = theme;
      console.log(`✓ Created theme: ${theme.displayName}`);
    }

    // 2. Crear configuración de tienda
    console.log('\n🏪 Creating store configuration...');
    await strapi.db.query('api::store-config.store-config').create({
      data: {
        storeName: 'AdaraStyle',
        storeSlug: 'adarastyle',
        tagline: 'Bolsos de lujo para mujeres excepcionales',
        description: 'Descubre nuestra exclusiva colección de bolsos de diseñador crafted en los mejores materiales. Cada pieza es una obra maestra de elegancia y funcionalidad.',
        activeTheme: createdThemes.elegante.id,
        currency: 'COP',
        currencySymbol: '$',
        contactEmail: 'contacto@adarastyle.com',
        contactPhone: '+57 310 123 4567',
        address: 'Calle 82 #12-45, Bogotá, Colombia',
        socialMedia: {
          facebook: 'https://facebook.com/adarastyle',
          instagram: 'https://instagram.com/adarastyle',
          twitter: 'https://twitter.com/adarastyle',
          whatsapp: '+573101234567',
        },
        paymentMethods: {
          wompi: {
            enabled: true,
            publicKey: process.env.WOMPI_PUBLIC_KEY || '',
          },
          nequi: {
            enabled: true,
            phone: '+573101234567',
          },
        },
        metaTitle: 'AdaraStyle - Bolsos de Lujo | Diseñador Exclusivo',
        metaDescription: 'Tienda online de bolsos de lujo. Cuero italiano, diseños exclusivos, calidad premium. Envío gratis en compras superiores a $200.000',
        metaKeywords: 'bolsos de lujo, carteras de diseñador, bolsos de cuero, mochilas premium, clutches elegantes',
      },
    });
    console.log('✓ Store configuration created');

    // 3. Crear departamentos
    console.log('\n📂 Creating departments...');
    const createdDepartments = {};

    for (const deptData of departments) {
      const dept = await strapi.db.query('api::department.department').create({
        data: {
          ...deptData,
          publishedAt: new Date(),
        },
      });
      createdDepartments[dept.slug] = dept;
      console.log(`✓ Created department: ${dept.name}`);
    }

    // 4. Crear productos
    console.log('\n👜 Creating products...');

    for (const productData of products) {
      const dept = createdDepartments[productData.department];

      await strapi.db.query('api::product.product').create({
        data: {
          ...productData,
          department: dept.id,
          publishedAt: new Date(),
        },
      });
      console.log(`✓ Created product: ${productData.name}`);
    }

    // 5. Crear Hero Banners
    console.log('\n🎯 Creating hero banners...');
    for (const bannerData of heroBanners) {
      await strapi.db.query('api::hero-banner.hero-banner').create({
        data: {
          ...bannerData,
          publishedAt: new Date(),
        },
      });
      console.log(`✓ Created hero banner: ${bannerData.title}`);
    }

    // 6. Crear Featured Collections
    console.log('\n🎨 Creating featured collections...');
    for (const collectionData of featuredCollections) {
      await strapi.db.query('api::featured-collection.featured-collection').create({
        data: {
          ...collectionData,
          publishedAt: new Date(),
        },
      });
      console.log(`✓ Created collection: ${collectionData.title}`);
    }

    // 7. Crear Lookbooks
    console.log('\n📸 Creating lookbooks...');
    for (const lookbookData of lookbooks) {
      await strapi.db.query('api::lookbook.lookbook').create({
        data: {
          ...lookbookData,
          publishedAt: new Date(),
        },
      });
      console.log(`✓ Created lookbook: ${lookbookData.title}`);
    }

    // 8. Crear Brand Stories
    console.log('\n💫 Creating brand stories...');
    for (const storyData of brandStories) {
      await strapi.db.query('api::brand-story.brand-story').create({
        data: {
          ...storyData,
          publishedAt: new Date(),
        },
      });
      console.log(`✓ Created brand story: ${storyData.title}`);
    }

    // 9. Configurar permisos públicos para TODAS las APIs
    console.log('\n🔓 Setting up public permissions...');
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      // Incluir TODOS los content types
      const contentTypes = [
        'hero-banner',
        'featured-collection',
        'lookbook',
        'brand-story',
        'product',
        'department',
        'store-config',
        'theme'
      ];

      for (const contentType of contentTypes) {
        // Grant find and findOne permissions
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

        console.log(`✓ Public access enabled for ${contentType}`);
      }
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${themes.length} themes created`);
    console.log(`   - ${departments.length} departments created`);
    console.log(`   - ${products.length} products created`);
    console.log(`   - ${heroBanners.length} hero banners created`);
    console.log(`   - ${featuredCollections.length} featured collections created`);
    console.log(`   - ${lookbooks.length} lookbooks created`);
    console.log(`   - ${brandStories.length} brand stories created`);
    console.log(`   - 1 store configuration created`);
    console.log('\n🎉 Your store is ready with impactful CMS content!');
    console.log('\n🔐 Admin credentials:');
    console.log('   Email: admin@adarastyle.com');
    console.log('   Password: (set during first Strapi setup)');
    console.log('\n🌐 Access:');
    console.log('   - Admin Panel: http://localhost:1337/admin');
    console.log('   - API: http://localhost:1337/api');
    console.log('\n💡 Active theme: Elegante (Vinotinto, Dorado, Blanco)');
    console.log('✨ New CMS features: Hero Banners, Featured Collections, Lookbooks, Brand Stories');

  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  }
}

// Ejecutar seed si se llama directamente
if (require.main === module) {
  // Configurar Strapi
  const Strapi = require('@strapi/strapi');

  // Strapi 5 factory pattern
  Strapi.createStrapi({
    dir: require('path').resolve(__dirname, '..'),
  }).load().then(async (app) => {
    global.strapi = app;
    try {
      await seed();
      await app.destroy();
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during seed:', error);
      await app.destroy();
      process.exit(1);
    }
  }).catch((error) => {
    console.error('❌ Failed to load Strapi:', error);
    process.exit(1);
  });
}

module.exports = { seed };
