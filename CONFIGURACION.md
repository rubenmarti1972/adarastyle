# Configuración de AdaraStyle

## 🎉 ¡El proyecto está listo y funcionando!

El backend y frontend están actualmente ejecutándose y la base de datos está poblada con datos de ejemplo.

## 📋 Información de Acceso

### Admin Panel (Strapi CMS)
- **URL**: http://localhost:1337/admin
- **Email**: admin@adarastyle.com
- **Password**: Admin123456!
- **Permisos**: Superadministrador

### Frontend (Tienda)
- **URL**: http://localhost:4200/
- **Descripción**: Tienda de bolsos de lujo AdaraStyle

### API REST
- **URL Base**: http://localhost:1337/api
- **Documentación**: http://localhost:1337/documentation (si está habilitada)

## 📦 Datos Creados

### Temas (6)
1. **Elegante** (Activo) - Vinotinto, Dorado, Blanco
2. Minimalista
3. Colorido
4. Moderno
5. Boutique
6. Vintage

### Departamentos (5)
1. Bolsos de Mano
2. Carteras
3. Mochilas
4. Clutches
5. Bandoleras

### Productos (12)
- Bolso Adara Signature
- Bolso Valentina Classic
- Bolso Isabella Elite
- Cartera Sophia Mini
- Cartera Aurora Premium
- Mochila Diana Urban
- Mochila Camila Luxury
- Clutch Gabriela Evening
- Clutch Marina Gold
- Bandolera Luna Crossbody
- Bandolera Natalia Chic
- Bandolera Victoria Mini

## ⚠️ Nota Importante: Imágenes de Productos

Los productos actualmente **NO tienen imágenes** porque el campo de imágenes se hizo opcional para facilitar la creación de datos de ejemplo.

### Para agregar imágenes a los productos:

1. Accede al Admin Panel en http://localhost:1337/admin
2. Inicia sesión con las credenciales proporcionadas arriba
3. Ve a "Content Manager" en el menú lateral
4. Selecciona "Product" en "Collection Types"
5. Haz clic en cada producto
6. En el campo "Images", haz clic en "Add new entry" o "Browse files"
7. Sube imágenes de bolsos (puedes usar imágenes de ejemplo de internet o tus propias imágenes)
8. Guarda los cambios haciendo clic en "Save"
9. Publica el producto haciendo clic en "Publish"

### Recomendaciones para las imágenes:
- Formato: JPG o PNG
- Tamaño recomendado: 800x800px o mayor
- Múltiples imágenes por producto (2-4 imágenes desde diferentes ángulos)
- Optimizar las imágenes antes de subirlas para mejor rendimiento

## 🚀 Comandos para Desarrollo

### Backend (Strapi)
```bash
# Desde la raíz del proyecto
pnpm run develop

# O desde el directorio backend
cd backend
pnpm run develop
```

### Frontend (Angular)
```bash
# Desde la raíz del proyecto
pnpm --filter adarastyle-frontend run start

# O desde el directorio frontend
cd frontend
pnpm run start
```

### Ejecutar seed nuevamente (opcional)
```bash
# Desde la raíz del proyecto
node backend/database/bootstrap.js
```

## 🔧 Configuración de Base de Datos

El proyecto está configurado para usar SQLite por defecto:
- **Archivo**: `backend/.tmp/data.db`
- **Client**: sqlite

Para producción, se recomienda cambiar a PostgreSQL editando `backend/.env`:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=adarastyle
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
```

## 🎨 Cambiar Tema Activo

1. Accede al Admin Panel
2. Ve a "Content Manager" > "Store Config" (Single Type)
3. En el campo "Active Theme", selecciona otro tema
4. Guarda los cambios
5. El frontend automáticamente reflejará el nuevo tema

## 📝 Próximos Pasos

1. **Agregar imágenes a los productos** (ver instrucciones arriba)
2. **Personalizar la configuración de la tienda**:
   - Nombre de la tienda
   - Descripción
   - Información de contacto
   - Redes sociales
   - Métodos de pago

3. **Agregar más productos** según tus necesidades

4. **Configurar métodos de pago**:
   - Wompi
   - Nequi

5. **Personalizar los temas** editando los colores, fuentes y estilos

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que el puerto 1337 no esté en uso
- Asegúrate de que las dependencias estén instaladas: `pnpm install`

### El frontend no inicia
- Verifica que el puerto 4200 no esté en uso
- Asegúrate de que las dependencias estén instaladas: `pnpm install`

### No se ven los productos
- Verifica que el backend esté corriendo
- Abre la consola del navegador (F12) para ver si hay errores
- Asegúrate de que los productos estén publicados en el Admin Panel

### Error de CORS
- Verifica que el `FRONTEND_URL` en `backend/.env` sea correcto
- Por defecto debe ser: `http://localhost:4200`

## 📞 Soporte

Si tienes problemas o preguntas, revisa:
- Los logs del backend (terminal donde está corriendo)
- Los logs del frontend (terminal donde está corriendo)
- La consola del navegador (F12)
