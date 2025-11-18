> **IMPORTANTE**: Este proyecto usa pnpm. Ver [INSTALL_PNPM.md](./INSTALL_PNPM.md) para instalación completa.

# AdaraStyle - Tienda de Bolsos E-commerce

> Solución completa de e-commerce parametrizable con Strapi 5 y Angular 20

Una tienda de bolsos de lujo completamente configurable, escalable y lista para producción. Incluye sistema de temas dinámicos, carrito de compras, pasarelas de pago (Wompi y Nequi), y generación de facturas.

## 🎨 Características Principales

### ✨ Sistema de Temas Dinámico
- **6 Temas Preconfigurados**: Elegante (vinotinto/dorado), Minimalista, Colorido, Moderno, Boutique, Vintage
- **Cambio en Tiempo Real**: Los temas se aplican sin recargar la página
- **Totalmente Personalizable**: Colores, tipografías, espaciado, sombras, animaciones
- **CSS Custom**: Soporte para CSS personalizado por tema

### 🛒 E-commerce Completo
- **Carrito de Compras**: Persistencia con sessionStorage
- **Gestión de Productos**: Categorías, inventario, precios, imágenes
- **Sistema de Órdenes**: Tracking completo de pedidos
- **Pasarelas de Pago**: Wompi y Nequi integradas
- **Generación de Facturas**: Facturación automática con PDF

### 🎯 Parametrizable Sin Código
- **Configuración de Tienda**: Nombre, logo, colores, favicon desde el admin
- **Departamentos Dinámicos**: Crear/editar categorías sin tocar código
- **Productos Flexibles**: Gestión completa desde Strapi Admin
- **Temas Visuales**: Cambiar apariencia desde la interfaz administrativa

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20.19.5+ y npm 10+
- Git

### Instalación en 7 Pasos

1. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env y configurar APP_KEYS, JWT_SECRET, etc.
# Ver QUICK_START.md para generar secrets automáticamente
```

3. **Iniciar el backend**
```bash
npm run develop
```

4. **Crear usuario admin** (primera vez)
- Visita http://localhost:1337/admin
- Crea tu cuenta de administrador

5. **Cargar datos de prueba**
```bash
npm run seed
```

6. **Instalar e iniciar el frontend** (en otra terminal)
```bash
cd ../frontend
npm install
npm start
```

7. **Visitar la aplicación**
- Frontend: http://localhost:4200
- Admin Panel: http://localhost:1337/admin

## 📖 Documentación Completa

- **[Guía de Configuración Sin Código](./docs/CONFIGURATION.md)** - Personaliza tu tienda sin programar
- **[Guía de Despliegue](./docs/DEPLOYMENT.md)** - Deploy a producción
- **[Documentación de Temas](./docs/THEMES.md)** - Personaliza colores y estilos

## 🎨 Temas Disponibles

La tienda incluye 6 temas profesionales listos para usar:

1. **Elegante** (Activo) - Vinotinto, Dorado, Blanco - Ideal para productos de lujo
2. **Minimalista** - Negro, Gris - Diseño limpio y moderno
3. **Colorido** - Paleta vibrante - Para público joven
4. **Moderno** - Degradados y animaciones - Tech-savvy
5. **Boutique** - Rosa y pasteles - Estilo femenino
6. **Vintage** - Tonos sepia - Nostálgico y retro

Cambiar tema: Admin Panel > Store Configuration > Active Theme

## 💳 Configurar Pasarelas de Pago

### Wompi (Colombia)
```bash
# backend/.env
WOMPI_PUBLIC_KEY=pub_prod_tu_clave
WOMPI_PRIVATE_KEY=prv_prod_tu_clave
```

### Nequi
```bash
# backend/.env
NEQUI_CLIENT_ID=tu_client_id
NEQUI_CLIENT_SECRET=tu_secret
NEQUI_API_KEY=tu_api_key
```

Ver [Guía de Configuración](./docs/CONFIGURATION.md) para más detalles.

## 📊 Datos de Prueba Incluidos

- 6 Temas visuales completos
- 5 Departamentos (categorías)
- 12 Productos de bolsos de lujo con:
  - Precios realistas en COP
  - Especificaciones detalladas
  - Ratings y reviews

## 🛠️ Stack Tecnológico

**Backend**: Strapi 5, Node.js 18+, SQLite/PostgreSQL
**Frontend**: Angular 20, TypeScript, SCSS
**Pagos**: Wompi, Nequi

## 📁 Estructura del Proyecto

```
adarastyle/
├── backend/          # Strapi 5
│   ├── config/       # Configuración
│   ├── database/     # Seed data
│   └── src/api/      # Modelos y API
├── frontend/         # Angular 20
│   └── src/app/
│       ├── components/
│       ├── services/
│       └── models/
└── docs/            # Documentación
```

## 🎯 Casos de Uso

- ✅ Tiendas de moda y accesorios
- ✅ E-commerce de productos premium
- ✅ Boutiques online
- ✅ Marketplace parametrizable

## 🔧 Comandos Útiles

```bash
# Desarrollo (requiere instalar concurrently: npm install)
npm run dev              # Ejecuta backend + frontend simultáneamente
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend

# Producción
npm run build            # Build producción (backend + frontend)

# Datos
npm run seed             # Cargar datos de prueba
```

## 📝 Adaptación a Otros Productos

Esta solución es reutilizable para cualquier tipo de producto:
1. Modifica el schema de productos en Strapi
2. Actualiza el seed con tus productos
3. Ajusta componentes del frontend según necesidades

Ver documentación técnica para más detalles.

## 📄 Licencia

MIT License

## 👥 Autor

**AdaraStyle Team**

---

**¿Necesitas ayuda?** Consulta la [documentación completa](./docs/) o abre un issue.
