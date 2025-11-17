# 📋 Guía de Configuración Sin Código

Esta guía te ayudará a personalizar tu tienda AdaraStyle sin necesidad de modificar código.

## 🏪 Configuración General de la Tienda

### Acceder al Panel de Administración

1. Inicia el backend: `cd backend && npm run develop`
2. Abre tu navegador en: http://localhost:1337/admin
3. Inicia sesión con tus credenciales de administrador

### Modificar Información Básica

**Ubicación**: Content Manager > Store Configuration (Single Type)

#### Campos Disponibles:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Store Name** | Nombre de tu tienda | "AdaraStyle" |
| **Store Slug** | URL amigable | "adarastyle" |
| **Tagline** | Frase descriptiva corta | "Bolsos de lujo para mujeres excepcionales" |
| **Description** | Descripción larga | "Descubre nuestra exclusiva colección..." |
| **Logo** | Imagen del logo | Upload PNG/SVG |
| **Favicon** | Icono del navegador | Upload ICO/PNG 32x32 |
| **Currency** | Moneda | COP, USD, EUR |
| **Currency Symbol** | Símbolo de moneda | "$" |
| **Contact Email** | Email de contacto | contacto@tutienda.com |
| **Contact Phone** | Teléfono | +57 310 123 4567 |
| **Address** | Dirección física | "Calle 82 #12-45, Bogotá" |

#### Redes Sociales:

```json
{
  "facebook": "https://facebook.com/tutienda",
  "instagram": "https://instagram.com/tutienda",
  "twitter": "https://twitter.com/tutienda",
  "whatsapp": "+573101234567"
}
```

#### Métodos de Pago:

```json
{
  "wompi": {
    "enabled": true,
    "publicKey": "pub_prod_..."
  },
  "nequi": {
    "enabled": true,
    "phone": "+573101234567"
  }
}
```

#### SEO:

| Campo | Descripción |
|-------|-------------|
| **Meta Title** | Título para SEO (60 caracteres max) |
| **Meta Description** | Descripción para buscadores (160 caracteres max) |
| **Meta Keywords** | Palabras clave separadas por comas |

### Guardar Cambios

1. Completa todos los campos
2. Click en **Save** (esquina superior derecha)
3. Los cambios se aplicarán inmediatamente en el frontend

---

## 🎨 Gestión de Temas Visuales

### Temas Predefinidos

La tienda incluye 6 temas listos para usar:

| Tema | Colores Principales | Mejor Para |
|------|-------------------|------------|
| **Elegante** | Vinotinto, Dorado, Blanco | Productos de lujo |
| **Minimalista** | Negro, Gris, Blanco | Diseño moderno |
| **Colorido** | Rojo, Turquesa, Amarillo | Público joven |
| **Moderno** | Morado, Degradados | Tech-savvy |
| **Boutique** | Rosa, Pasteles | Femenino delicado |
| **Vintage** | Sepia, Marrón | Estilo retro |

### Activar un Tema

**Opción 1: Desde Store Configuration**
1. Ve a Content Manager > Store Configuration
2. En el campo **Active Theme**, selecciona el tema deseado
3. Click en **Save**

**Opción 2: Desde Themes**
1. Ve a Content Manager > Themes
2. Encuentra el tema que quieres activar
3. Edita el tema y marca **Is Active** = true
4. Desmarca los demás temas
5. Actualiza Store Configuration para referenciar el nuevo tema

### Personalizar un Tema Existente

1. Ve a Content Manager > Themes
2. Click en el tema que deseas personalizar
3. Edita los campos JSON:

#### Colores (JSON):
```json
{
  "primary": "#8B1538",      // Color principal (botones, enlaces)
  "secondary": "#D4AF37",    // Color secundario (acentos)
  "accent": "#FFFFFF",       // Color de acento
  "background": "#FFFFFF",   // Fondo principal
  "backgroundAlt": "#FFF8F0", // Fondo alternativo
  "text": "#2D1B1E",        // Color de texto principal
  "textLight": "#6B4C4F",   // Color de texto secundario
  "border": "#E8D5C4",      // Color de bordes
  "success": "#2D5F3F",     // Color de éxito
  "warning": "#C07F00",     // Color de advertencia
  "error": "#8B1538",       // Color de error
  "info": "#4A5D7C"         // Color informativo
}
```

#### Tipografías (JSON):
```json
{
  "primary": "Playfair Display, serif",   // Fuente para títulos
  "secondary": "Lato, sans-serif",         // Fuente para texto
  "headingWeight": "700",                  // Peso de títulos
  "bodyWeight": "400"                      // Peso de texto
}
```

#### Espaciado (JSON):
```json
{
  "xs": "0.25rem",   // Extra pequeño
  "sm": "0.5rem",    // Pequeño
  "md": "1rem",      // Mediano
  "lg": "1.5rem",    // Grande
  "xl": "2.5rem",    // Extra grande
  "xxl": "4rem"      // Extra extra grande
}
```

#### Bordes Redondeados (JSON):
```json
{
  "sm": "2px",
  "md": "4px",
  "lg": "8px",
  "xl": "12px",
  "full": "9999px"   // Completamente redondo
}
```

#### Sombras (JSON):
```json
{
  "sm": "0 2px 4px rgba(139, 21, 56, 0.08)",
  "md": "0 4px 12px rgba(139, 21, 56, 0.12)",
  "lg": "0 8px 24px rgba(139, 21, 56, 0.16)",
  "xl": "0 16px 48px rgba(139, 21, 56, 0.2)"
}
```

#### Animaciones (JSON):
```json
{
  "duration": "0.4s",                          // Duración de animaciones
  "easing": "cubic-bezier(0.4, 0, 0.2, 1)"    // Curva de animación
}
```

#### CSS Personalizado (Texto):

Puedes agregar CSS custom en el campo **Custom CSS**:

```css
/* Ejemplo: Agregar efecto hover personalizado */
.product-card:hover {
  transform: scale(1.05) rotate(2deg);
}

/* Cambiar estilo de botones */
.btn-primary {
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

### Crear un Tema Nuevo

1. Ve a Content Manager > Themes
2. Click en **Create new entry**
3. Completa todos los campos:
   - **Name**: Nombre interno (ej: "mi-tema-personalizado")
   - **Display Name**: Nombre visible (ej: "Mi Tema Personalizado")
   - **Description**: Descripción del tema
   - **Slug**: Se genera automáticamente
   - **Colors**, **Fonts**, **Spacing**, etc.: JSON con configuraciones
4. Upload una imagen de **Preview** (opcional)
5. Click en **Save**
6. Activa el tema desde Store Configuration

---

## 📂 Gestión de Departamentos (Categorías)

### Ver Departamentos Existentes

1. Ve a Content Manager > Departments
2. Verás lista de todas las categorías

### Crear un Nuevo Departamento

1. Click en **Create new entry**
2. Completa los campos:

| Campo | Descripción | Requerido |
|-------|-------------|-----------|
| **Name** | Nombre del departamento | Sí |
| **Slug** | URL amigable (auto-generado) | Sí |
| **Description** | Descripción corta | No |
| **Image** | Imagen de la categoría | No |
| **Icon** | Nombre del icono | No |
| **Display Order** | Orden de visualización (número) | No |
| **Is Active** | Activar/desactivar | Sí |

3. Click en **Save and Publish**

### Editar un Departamento

1. Click en el departamento en la lista
2. Modifica los campos deseados
3. Click en **Save**

### Organizar Orden de Departamentos

1. Edita cada departamento
2. Cambia el valor de **Display Order**:
   - 1 = Primero
   - 2 = Segundo
   - etc.
3. Los departamentos se mostrarán en orden ascendente

### Desactivar un Departamento

1. Edita el departamento
2. Desmarca **Is Active**
3. Click en **Save**
4. El departamento no se mostrará en el frontend

---

## 👜 Gestión de Productos

### Ver Productos

1. Ve a Content Manager > Products
2. Verás lista de todos los productos

### Crear un Producto

1. Click en **Create new entry**
2. Completa los campos principales:

#### Información Básica

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Name** | Nombre del producto | "Bolso Adara Signature" |
| **Slug** | URL amigable | Se genera automáticamente |
| **SKU** | Código único | "ADS-001" |
| **Description** | Descripción completa (Rich Text) | Detalles del producto |
| **Short Description** | Descripción breve | "Elegancia atemporal..." |

#### Precios e Inventario

| Campo | Descripción |
|-------|-------------|
| **Price** | Precio regular |
| **Sale Price** | Precio en oferta (opcional) |
| **Cost** | Costo del producto (opcional) |
| **In Stock** | ¿Disponible para venta? |
| **Stock Quantity** | Cantidad disponible |
| **Track Inventory** | ¿Controlar inventario? |

#### Imágenes

1. Click en **Add new media**
2. Arrastra y suelta imágenes o click para buscar
3. Puedes agregar múltiples imágenes
4. La primera imagen será la principal

#### Categorización

- **Department**: Selecciona el departamento
- **Tags**: Lista de etiquetas separadas por comas

#### Especificaciones (JSON)

```json
{
  "material": "Cuero italiano genuino",
  "dimensions": "35cm x 28cm x 15cm",
  "weight": "850g",
  "color": "Vinotinto con detalles dorados",
  "brand": "AdaraStyle",
  "madeIn": "Italia"
}
```

#### Destacados

- **Is Featured**: Mostrar en "Destacados"
- **Is New Arrival**: Mostrar en "Nuevos Ingresos"
- **Is Bestseller**: Mostrar en "Más Vendidos"

#### SEO (Opcional)

- **Meta Title**: Título para buscadores
- **Meta Description**: Descripción para SEO

3. Click en **Save and Publish**

### Editar un Producto

1. Click en el producto en la lista
2. Modifica los campos necesarios
3. Click en **Save**

### Duplicar un Producto

1. Abre el producto
2. Click en los tres puntos (...)
3. Selecciona **Duplicate**
4. Modifica el producto duplicado
5. Click en **Save**

### Despublicar un Producto

1. Abre el producto
2. Click en **Unpublish** (esquina superior derecha)
3. El producto no se mostrará en el frontend

### Eliminar un Producto

1. Abre el producto
2. Click en los tres puntos (...)
3. Selecciona **Delete**
4. Confirma la eliminación

---

## 🛍️ Gestión de Órdenes

### Ver Órdenes

1. Ve a Content Manager > Orders
2. Verás lista de todas las órdenes

### Filtrar Órdenes

Usa los filtros en la parte superior:
- Por estado (pending, processing, confirmed, etc.)
- Por método de pago
- Por fecha

### Ver Detalle de una Orden

1. Click en la orden
2. Verás:
   - Información del cliente
   - Productos ordenados
   - Dirección de envío
   - Método de pago
   - Estado de la orden
   - Factura asociada

### Actualizar Estado de Orden

1. Abre la orden
2. Cambia el campo **Status**:
   - **pending**: Pendiente
   - **processing**: En proceso
   - **confirmed**: Confirmada
   - **shipped**: Enviada
   - **delivered**: Entregada
   - **cancelled**: Cancelada
   - **refunded**: Reembolsada

3. Cambia **Payment Status** si es necesario:
   - **pending**: Pago pendiente
   - **authorized**: Pago autorizado
   - **paid**: Pagado
   - **failed**: Pago fallido
   - **refunded**: Reembolsado

4. Agrega **Tracking Number** si la orden fue enviada
5. Click en **Save**

### Agregar Notas a una Orden

1. Abre la orden
2. En el campo **Notes**, escribe tus comentarios
3. Click en **Save**

---

## 📊 Consejos y Mejores Prácticas

### Imágenes

✅ **Recomendaciones**:
- Formato: JPG o PNG
- Tamaño mínimo: 1000x1000 px
- Peso máximo: 2 MB por imagen
- Usa imágenes de alta calidad
- Muestra el producto desde varios ángulos

### Precios

✅ **Buenas Prácticas**:
- Usa precios redondos (ej: $100.000 en vez de $99.876)
- Si usas **Sale Price**, asegúrate que sea menor que **Price**
- Actualiza precios regularmente

### Descripciones

✅ **Tips**:
- Sé descriptivo pero conciso
- Usa bullet points para especificaciones
- Incluye beneficios, no solo características
- Optimiza para SEO con palabras clave relevantes

### Categorías

✅ **Organización**:
- Mantén entre 3-8 departamentos principales
- Usa nombres claros y descriptivos
- Ordena por popularidad o lógica de compra

### Inventario

✅ **Gestión**:
- Activa **Track Inventory** para productos limitados
- Actualiza **Stock Quantity** regularmente
- Desmarca **In Stock** cuando se agote

---

## 🆘 Solución de Problemas

### Los cambios no se reflejan en el frontend

1. Verifica que guardaste los cambios (**Save**)
2. Publicaste el contenido (**Publish**)
3. Refresca el navegador (Ctrl + F5)
4. Limpia caché del navegador

### No puedo subir imágenes

1. Verifica el tamaño del archivo (< 5 MB)
2. Usa formatos soportados (JPG, PNG, GIF, SVG)
3. Revisa permisos de la carpeta `backend/public/uploads`

### El tema no cambia

1. Verifica que el tema está marcado como **Is Active**
2. Actualiza **Active Theme** en **Store Configuration**
3. Guarda ambos cambios
4. Refresca el frontend

### Productos no aparecen

1. Verifica que el producto está **Published**
2. Verifica que **In Stock** esté marcado
3. Revisa que el departamento esté **Active**

---

## 📞 Soporte

¿Necesitas ayuda adicional?
- Consulta la [Documentación Técnica](./API.md)
- Revisa la [Guía de Despliegue](./DEPLOYMENT.md)
- Abre un issue en GitHub

---

**Última actualización**: 2025-01-17
