# 📖 Manual del CMS - Adara Style

## Índice
1. [Acceso al CMS](#acceso-al-cms)
2. [Configuración de la Tienda](#configuración-de-la-tienda)
3. [Gestión de Departamentos](#gestión-de-departamentos)
4. [Gestión de Categorías](#gestión-de-categorías)
5. [Gestión de Productos](#gestión-de-productos)
6. [Banners del Hero](#banners-del-hero)
7. [Carga de Imágenes](#carga-de-imágenes)
8. [Temas Visuales](#temas-visuales)

---

## 🔐 Acceso al CMS

### Iniciar Strapi
```bash
cd backend
npm run develop
```

El CMS estará disponible en: **http://localhost:1337/admin**

### Credenciales Iniciales
- Al primer inicio, deberás crear un usuario administrador
- Guarda bien estas credenciales, las necesitarás para futuros accesos

---

## ⚙️ Configuración de la Tienda

**Ubicación:** Content Manager → Store Config → Store Config

Esta colección configura la información general de tu tienda.

### Campos Principales

#### Información Básica
- **Store Name** (Nombre de la tienda)
  - Ejemplo: `Adara Style`
  - Aparece en el header y footer

- **Tagline** (Eslogan)
  - Ejemplo: `Elegancia en cada detalle`
  - Texto breve que describe tu tienda

- **Logo URL** (Opcional)
  - URL de tu logo si lo tienes en un servidor externo

#### Información de Contacto
- **Contact Email**
  - Email principal de contacto
  - Ejemplo: `contacto@adarastyle.com`

- **Contact Phone**
  - Teléfono de contacto con código de país
  - Ejemplo: `+57 320 261 4823`

- **Address** (Dirección)
  - Dirección física de tu tienda

#### Redes Sociales
- **Instagram URL**
  - Ejemplo: `https://instagram.com/adarastyle`

- **Facebook URL**
  - Ejemplo: `https://facebook.com/adarastyle`

- **WhatsApp Number**
  - Solo el número, sin símbolos
  - Ejemplo: `573202614823`

#### Tema Visual
- **Active Theme**
  - Opciones: `elegante`, `vibrant`, `minimalist`, `warm-luxury`, `luxury`
  - **Recomendado:** `luxury` (Vinotinto + Oro)

---

## 🏢 Gestión de Departamentos

**Ubicación:** Content Manager → Departments

Los departamentos son las categorías principales de tu tienda.

### Cómo Crear un Departamento

1. Click en **"Create new entry"**
2. Completa los campos:

#### Campos Requeridos (*)
- **Name*** (Nombre)
  - Nombre del departamento
  - Ejemplo: `Bolsos de Mano`

- **Slug*** (URL amigable)
  - Se genera automáticamente del nombre
  - Ejemplo: `bolsos-de-mano`
  - Usado en las URLs del sitio

#### Campos Opcionales
- **Description** (Descripción)
  - Descripción breve del departamento
  - Ejemplo: `Exclusiva colección de bolsos elegantes`

- **Image** (Imagen)
  - Click en "Browse files" para subir una imagen
  - Tamaño recomendado: 800x800px mínimo
  - Formatos: JPG, PNG, WebP

- **Order** (Orden de visualización)
  - Número que define el orden en el menú
  - Menor número = aparece primero
  - Ejemplo: `1`, `2`, `3`...

- **Is Active** (Activo)
  - ✅ Activado: Se muestra en el sitio
  - ❌ Desactivado: Oculto temporalmente

3. Click en **"Save"** (esquina superior derecha)
4. Click en **"Publish"** para hacerlo visible

### Ejemplo de Departamento
```
Name: Bolsos de Mano
Slug: bolsos-de-mano
Description: Colección exclusiva de bolsos de lujo hechos a mano
Image: [Subir imagen de bolso]
Order: 1
Is Active: ✅
```

---

## 📁 Gestión de Categorías

**Ubicación:** Content Manager → Categories

Las categorías son subdivisiones dentro de los departamentos.

### Cómo Crear una Categoría

1. Click en **"Create new entry"**
2. Completa los campos:

#### Campos Requeridos (*)
- **Name*** (Nombre)
  - Nombre de la categoría
  - Ejemplo: `Bolsos Clásicos`

- **Slug*** (URL amigable)
  - Se genera automáticamente
  - Ejemplo: `bolsos-clasicos`

#### Campos Opcionales
- **Description** (Descripción)
  - Ejemplo: `Bolsos de diseño atemporal y elegante`

- **Image** (Imagen de categoría)
  - Click en "Browse files"
  - Tamaño recomendado: 600x600px
  - Esta imagen se muestra en la página de categorías

- **Department** (Departamento padre)
  - Selecciona el departamento al que pertenece
  - Ejemplo: Seleccionar "Bolsos de Mano"
  - **IMPORTANTE:** Siempre asigna una categoría a un departamento

3. Click en **"Save"**
4. Click en **"Publish"**

### Ejemplo de Categoría
```
Name: Clutches Elegantes
Slug: clutches-elegantes
Description: Clutches perfectos para eventos especiales
Image: [Subir imagen de clutch]
Department: Clutches
```

---

## 🛍️ Gestión de Productos

**Ubicación:** Content Manager → Products

### Cómo Crear un Producto

1. Click en **"Create new entry"**
2. Completa los siguientes campos:

#### Información Básica (Requerida)

**Name*** (Nombre del producto)
- Ejemplo: `Bolso Cartera Isabella Luxury`

**SKU*** (Código del producto)
- Identificador único
- Ejemplo: `ISA-001`
- Formato sugerido: `XXX-###`

**Slug*** (URL amigable)
- Se genera automáticamente del nombre
- Ejemplo: `bolso-cartera-isabella-luxury`

**Price*** (Precio)
- Precio en pesos colombianos
- Ejemplo: `420000` (sin puntos ni comas)
- El sistema lo formateará como $420.000

**Sale Price** (Precio en oferta)
- **Solo si el producto está en oferta**
- Debe ser menor que el precio normal
- Ejemplo: `378000`
- Si NO está en oferta, dejar vacío

**Department*** (Departamento)
- Selecciona el departamento
- Ejemplo: `Bolsos de Mano`

**Category** (Categoría)
- Selecciona la categoría dentro del departamento
- Ejemplo: `Carteras de Lujo`

#### Descripciones

**Description** (Descripción completa)
- Texto completo del producto
- Incluye características, materiales, beneficios
- Ejemplo:
```
Cartera de lujo confeccionada en cuero italiano de primera calidad.
Diseño elegante con compartimentos inteligentes y protección RFID.
Perfecta para el día a día con un toque sofisticado.
```

**Short Description** (Descripción corta)
- Frase breve y atractiva
- Ejemplo: `Sofisticación italiana en tu bolsillo`
- Aparece en las tarjetas de producto

#### Inventario

**In Stock** (En stock)
- ✅ Disponible para compra
- ❌ Agotado

**Stock Quantity** (Cantidad en inventario)
- Número de unidades disponibles
- Ejemplo: `25`

#### Especificaciones (Opcional pero recomendado)

Click en "Add component" → "Specifications"

Formato JSON con detalles técnicos:
```json
{
  "material": "Cuero italiano Nappa",
  "dimensions": "20cm x 11cm x 2.5cm",
  "weight": "200g",
  "color": "Negro mate",
  "brand": "AdaraStyle",
  "madeIn": "Italia"
}
```

#### Clasificación

**Is Featured** (Producto destacado)
- ✅ Aparece en la sección "Productos Destacados" de la home

**Is New Arrival** (Nuevo ingreso)
- ✅ Aparece en la sección "Recién Llegados"

**Is Bestseller** (Más vendido)
- ✅ Aparece en la sección de bestsellers

**Tags** (Etiquetas)
- Palabras clave separadas por comas
- Ejemplo: `premium, rfid, italiano, cuero`
- Ayuda en las búsquedas

#### Calificación

**Rating** (Calificación promedio)
- Número del 1 al 5
- Ejemplo: `4.8`
- Usa decimales: 4.5, 4.8, etc.

**Review Count** (Número de reseñas)
- Cantidad de reseñas recibidas
- Ejemplo: `56`

#### Imágenes (MUY IMPORTANTE)

**Images** (Imágenes del producto)
1. Click en "Browse files"
2. Selecciona una o varias imágenes
3. **Orden importante:** La primera imagen es la principal
4. Tamaño recomendado: 1200x1200px
5. Formatos: JPG, PNG, WebP

**Mejores prácticas:**
- Sube al menos 2-3 imágenes por producto
- Primera imagen: Foto frontal limpia con fondo blanco
- Segunda imagen: Vista alternativa o en uso
- Tercera imagen+: Detalles, texturas, etc.

3. Click en **"Save"**
4. Click en **"Publish"**

### Ejemplo Completo de Producto
```
Name: Cartera Isabella Luxury
SKU: ISA-001
Slug: cartera-isabella-luxury (generado automáticamente)
Price: 420000
Sale Price: 378000 (10% de descuento)
Department: Bolsos de Mano → Seleccionar
Category: Carteras de Lujo → Seleccionar

Description:
Cartera de lujo confeccionada en cuero italiano de primera calidad.
Diseño elegante con compartimentos inteligentes y protección RFID.
Perfecta para el día a día con un toque sofisticado.

Short Description: Sofisticación italiana en tu bolsillo

In Stock: ✅
Stock Quantity: 25

Specifications:
{
  "material": "Cuero italiano Nappa",
  "dimensions": "20cm x 11cm x 2.5cm",
  "weight": "200g",
  "color": "Negro mate",
  "brand": "AdaraStyle",
  "madeIn": "Italia"
}

Is Featured: ✅
Is New Arrival: ❌
Is Bestseller: ❌

Tags: premium, rfid, italiano, cuero, elegante

Rating: 4.8
Review Count: 56

Images: [Subir 3 imágenes del producto]
```

---

## 🎨 Banners del Hero

**Ubicación:** Content Manager → Hero Banners

Los banners son las imágenes grandes que aparecen al inicio de la página.

### Cómo Crear un Banner

1. Click en **"Create new entry"**
2. Completa los campos:

#### Información Básica

**Title*** (Título)
- Texto principal del banner
- Ejemplo: `Nueva Colección Luxury`

**Subtitle** (Subtítulo)
- Texto secundario arriba del título
- Ejemplo: `Exclusivo 2025`

**Description** (Descripción)
- Texto debajo del título
- Ejemplo: `Descubre elegancia atemporal`

#### Imagen Principal

**Image*** (Imagen del banner)
- Tamaño recomendado: **1920x800px** para desktop
- Formatos: JPG, PNG, WebP
- Peso máximo recomendado: 500KB (optimiza tus imágenes)

**Mobile Image** (Imagen para móvil - Opcional)
- Tamaño: **800x600px**
- Si no la subes, se usa la imagen principal

#### Diseño y Posicionamiento

**Text Position** (Posición del texto)
- `left`: Texto a la izquierda
- `center`: Texto centrado
- `right`: Texto a la derecha

**Text Color** (Color del texto)
- `light`: Texto blanco (para fondos oscuros)
- `dark`: Texto oscuro (para fondos claros)

**Overlay Opacity** (Opacidad de la capa oscura)
- Valor de 0 a 1
- Ejemplo: `0.3` = 30% oscuro
- Ayuda a que el texto sea legible

#### Call to Action (Botón)

**CTA Text** (Texto del botón)
- Ejemplo: `Ver Colección`

**CTA Link** (Enlace del botón)
- Ruta interna del sitio
- Ejemplo: `/products` o `/departments/bolsos-de-mano`

#### Configuración

**Order** (Orden)
- Número de orden en el carrusel
- Ejemplo: `1`, `2`, `3`

**Is Active** (Activo)
- ✅ Se muestra en el carrusel
- ❌ Oculto

3. Click en **"Save"**
4. Click en **"Publish"**

### Ejemplo de Banner
```
Title: Nueva Colección Luxury 2025
Subtitle: Exclusivo
Description: Descubre la elegancia atemporal
Image: [Banner 1920x800px]
Mobile Image: [Banner móvil 800x600px]
Text Position: left
Text Color: light
Overlay Opacity: 0.4
CTA Text: Ver Colección
CTA Link: /products
Order: 1
Is Active: ✅
```

---

## 📸 Carga de Imágenes

### Mejores Prácticas

#### Tamaños Recomendados

| Tipo | Dimensiones | Peso máximo |
|------|-------------|-------------|
| Producto | 1200x1200px | 300KB |
| Banner Hero (Desktop) | 1920x800px | 500KB |
| Banner Hero (Móvil) | 800x600px | 200KB |
| Departamento | 800x800px | 250KB |
| Categoría | 600x600px | 200KB |

#### Formatos
- **Preferido:** WebP (mejor compresión)
- **Aceptables:** JPG, PNG
- **Evitar:** GIF para productos

#### Optimización
1. Usa herramientas como [TinyPNG](https://tinypng.com) o [Squoosh](https://squoosh.app)
2. Comprime las imágenes antes de subirlas
3. Imágenes más ligeras = sitio más rápido

#### Nombres de Archivo
- Usa nombres descriptivos
- Ejemplo: `bolso-isabella-frontal.jpg`
- Evita: `IMG_1234.jpg`

### Cómo Subir Imágenes

1. En cualquier campo de imagen, click en **"Browse files"**
2. Selecciona archivo(s) de tu computadora
3. Espera a que se cargue (verás barra de progreso)
4. La imagen aparecerá como miniatura
5. Puedes agregar más con "Add more files"
6. Para eliminar, click en el ícono de papelera

---

## 🎨 Temas Visuales

**Ubicación:** Store Config → Active Theme

### Temas Disponibles

#### 1. Luxury (Recomendado) ⭐
```
Colores: Vinotinto (#8B1538) + Oro (#D4AF37)
Estilo: Premium, impactante, elegante
Ideal para: Productos de lujo, alta gama
```

#### 2. Elegante
```
Colores: Negro + Café claro
Estilo: Moderno, sofisticado
Ideal para: Tiendas minimalistas elegantes
```

#### 3. Warm Luxury
```
Colores: Dorado cálido + Café
Estilo: Acogedor, premium
Ideal para: Productos artesanales de lujo
```

#### 4. Minimalist
```
Colores: Negro + Gris
Estilo: Limpio, simple
Ideal para: Enfoque en productos
```

#### 5. Vibrant
```
Colores: Rosa + Amarillo
Estilo: Alegre, juvenil
Ideal para: Público joven, productos coloridos
```

### Cambiar de Tema

1. Ve a **Content Manager → Store Config**
2. Click en **Store Config**
3. En "Active Theme", selecciona el tema deseado
4. Click en **"Save"**
5. Recarga el frontend para ver los cambios

---

## 📋 Lista de Verificación: Lanzamiento

Antes de lanzar tu tienda, verifica:

### Configuración General
- [ ] Store Config completo con toda la información
- [ ] Email de contacto correcto
- [ ] Número de WhatsApp configurado
- [ ] Redes sociales enlazadas
- [ ] Tema visual seleccionado

### Contenido
- [ ] Al menos 3 departamentos creados y publicados
- [ ] Categorías asignadas a cada departamento
- [ ] Mínimo 10 productos publicados
- [ ] Cada producto tiene al menos 2 imágenes
- [ ] Precios correctos en todos los productos
- [ ] Descripciones completas y sin errores
- [ ] Stock actualizado

### Imágenes
- [ ] Todas las imágenes optimizadas
- [ ] Banners hero creados (mínimo 1)
- [ ] Imágenes de departamentos subidas
- [ ] Imágenes de categorías subidas

### Permisos
- [ ] Permisos públicos configurados (ya están por defecto)
- [ ] Puedes ver los productos en el frontend

---

## 🆘 Solución de Problemas

### "No veo mis productos en el sitio"
1. Verifica que el producto esté **Publicado** (no solo guardado)
2. Confirma que "In Stock" esté activado
3. Revisa los permisos públicos en Settings → Roles → Public

### "Las imágenes no se cargan"
1. Verifica que el backend esté corriendo: `http://localhost:1337`
2. Revisa que las imágenes se hayan subido correctamente
3. Comprueba el tamaño del archivo (máximo ~5MB)

### "Los cambios no se ven"
1. Haz "hard refresh" en el navegador: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
2. Borra la caché del navegador
3. Verifica que publicaste los cambios (botón "Publish")

### "Error al guardar"
1. Verifica que todos los campos requeridos (*) estén completos
2. Revisa que el slug no esté duplicado
3. Asegúrate de que el precio sea un número válido

---

## 📞 Soporte

Si tienes problemas no cubiertos en este manual:

1. Revisa la [documentación oficial de Strapi](https://docs.strapi.io)
2. Verifica los logs de la consola del backend
3. Contacta al desarrollador del proyecto

---

## 🚀 Consejos para el Éxito

1. **Actualiza regularmente**
   - Agrega nuevos productos semanalmente
   - Mantén el inventario actualizado
   - Cambia los banners según temporada

2. **Optimiza para ventas**
   - Usa descripciones persuasivas
   - Muestra especificaciones claras
   - Agrega productos a "Featured" estratégicamente

3. **Calidad de imágenes**
   - Invierte en buenas fotos de producto
   - Usa fondos limpios y consistentes
   - Muestra el producto desde varios ángulos

4. **Organización**
   - Mantén una estructura clara de categorías
   - Usa tags consistentes
   - Actualiza el stock regularmente

5. **Ofertas estratégicas**
   - Usa "Sale Price" para promociones
   - Los productos con descuento aparecen automáticamente en la sección de ofertas
   - Marca productos destacados según estrategia de ventas

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0
**Sistema:** Strapi 5 + Angular 20
