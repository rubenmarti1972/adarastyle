/**
 * Seed data for CMS content (Hero Banners, Lookbooks, Collections, Brand Stories)
 * Datos de ejemplo impactantes inspirados en las mejores tiendas e-commerce
 */

const heroBanners = [
  {
    title: 'Nueva Colección Primavera',
    subtitle: 'Primavera 2025',
    description: 'Descubre las últimas tendencias en accesorios de lujo',
    ctaText: 'Explorar Colección',
    ctaLink: '/products',
    overlayOpacity: 0.3,
    textPosition: 'center',
    textColor: 'light',
    order: 0,
    isActive: true,
    animationType: 'fade',
  },
  {
    title: 'Elegancia Artesanal',
    subtitle: 'Hecho a Mano',
    description: 'Cada pieza cuenta una historia de dedicación y maestría',
    ctaText: 'Ver Más',
    ctaLink: '/products',
    overlayOpacity: 0.4,
    textPosition: 'left',
    textColor: 'light',
    order: 1,
    isActive: true,
    animationType: 'slide',
  },
  {
    title: 'Lujo Sostenible',
    subtitle: 'Diseño Consciente',
    description: 'Piel ética y procesos responsables',
    ctaText: 'Descubrir',
    ctaLink: '/products',
    overlayOpacity: 0.35,
    textPosition: 'right',
    textColor: 'light',
    order: 2,
    isActive: true,
    animationType: 'zoom',
  },
];

const featuredCollections = [
  {
    title: 'Bolsos Icónicos',
    slug: 'bolsos-iconicos',
    description: 'Los diseños que definen nuestro estilo',
    ctaText: 'Ver Colección',
    ctaLink: '/collections/bolsos-iconicos',
    backgroundColor: '#1a1a1a',
    textColor: '#FFFFFF',
    size: 'large',
    order: 0,
    isActive: true,
  },
  {
    title: 'Nuevas Llegadas',
    slug: 'nuevas-llegadas',
    description: 'Lo último en diseño y tendencias',
    ctaText: 'Descubrir',
    ctaLink: '/products?filter=new',
    backgroundColor: '#8B7355',
    textColor: '#FFFFFF',
    size: 'medium',
    order: 1,
    isActive: true,
  },
  {
    title: 'Carteras Elegantes',
    slug: 'carteras-elegantes',
    description: 'Sofisticación en cada detalle',
    ctaText: 'Explorar',
    ctaLink: '/departments/carteras',
    backgroundColor: '#FFFFFF',
    textColor: '#1a1a1a',
    size: 'medium',
    order: 2,
    isActive: true,
  },
  {
    title: 'Colección Atemporal',
    slug: 'coleccion-atemporal',
    description: 'Clásicos que trascienden temporadas',
    ctaText: 'Ver Más',
    ctaLink: '/collections/atemporal',
    backgroundColor: '#F8F7F5',
    textColor: '#1a1a1a',
    size: 'small',
    order: 3,
    isActive: true,
  },
  {
    title: 'Edición Limitada',
    slug: 'edicion-limitada',
    description: 'Piezas exclusivas numeradas',
    ctaText: 'Ver Edición',
    ctaLink: '/collections/limited',
    backgroundColor: '#C9A56A',
    textColor: '#FFFFFF',
    size: 'medium',
    order: 4,
    isActive: true,
  },
  {
    title: 'Bestsellers',
    slug: 'bestsellers',
    description: 'Los favoritos de nuestros clientes',
    ctaText: 'Ver Todo',
    ctaLink: '/products?filter=bestsellers',
    backgroundColor: '#2D1B1E',
    textColor: '#FFFFFF',
    size: 'small',
    order: 5,
    isActive: true,
  },
];

const lookbooks = [
  {
    title: 'Urban Elegance',
    slug: 'urban-elegance-2025',
    subtitle: 'La ciudad es tu pasarela',
    description: 'Una colección que fusiona la sofisticación urbana con la comodidad contemporánea',
    season: 'Primavera',
    year: 2025,
    layoutType: 'masonry',
    isActive: true,
    order: 0,
    publishDate: new Date(),
  },
  {
    title: 'Timeless Classics',
    slug: 'timeless-classics',
    subtitle: 'Elegancia que perdura',
    description: 'Descubre piezas que desafían las tendencias pasajeras',
    season: 'Todo el año',
    year: 2025,
    layoutType: 'grid',
    isActive: true,
    order: 1,
    publishDate: new Date(),
  },
];

const brandStories = [
  {
    title: 'Artesanía con Alma',
    headline: 'Nuestra Historia',
    content: `
      <p>Cada bolso AdaraStyle nace de la pasión por la artesanía excepcional.
      Trabajamos con maestros artesanos que han perfeccionado su técnica durante generaciones,
      asegurando que cada pieza sea única y duradera.</p>

      <p>Seleccionamos cuidadosamente las mejores pieles del mundo, priorizando
      proveedores éticos y sostenibles que comparten nuestros valores.</p>
    `,
    emoji: '✨',
    backgroundColor: '#FFF8F0',
    textColor: '#2D1B1E',
    accentColor: '#C9A56A',
    layout: 'image-right',
    ctaText: 'Conoce Más',
    ctaLink: '/about',
    order: 0,
    isActive: true,
    showOnHome: true,
  },
  {
    title: 'Diseño Sostenible',
    headline: 'Compromiso Verde',
    content: `
      <p>Creemos en el lujo responsable. Por eso, cada uno de nuestros procesos
      está diseñado para minimizar el impacto ambiental sin comprometer la calidad.</p>

      <p>Desde la selección de materiales hasta el empaque final, cada decisión
      refleja nuestro compromiso con un futuro más verde.</p>
    `,
    emoji: '🌿',
    backgroundColor: '#F5EFE6',
    textColor: '#3E2723',
    accentColor: '#2D5F3F',
    layout: 'image-left',
    ctaText: 'Nuestro Compromiso',
    ctaLink: '/sustainability',
    order: 1,
    isActive: true,
    showOnHome: true,
  },
];

module.exports = {
  heroBanners,
  featuredCollections,
  lookbooks,
  brandStories,
};
