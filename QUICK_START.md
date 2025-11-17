# 🚀 Inicio Rápido - AdaraStyle

Guía express para poner en marcha tu tienda en 5 minutos.

## ⚡ Instalación Rápida

```bash
# 1. Instalar backend
cd backend
npm install

# 2. Configurar backend
cp .env.example .env

# Editar .env y cambiar:
# - APP_KEYS (generar 4 keys aleatorias)
# - ADMIN_JWT_SECRET, JWT_SECRET, API_TOKEN_SALT, TRANSFER_TOKEN_SALT
```

**Generar secrets automáticamente:**
```bash
node -e "console.log('APP_KEYS=' + Array(4).fill(0).map(() => require('crypto').randomBytes(16).toString('base64')).join(','))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
```

```bash
# 3. Iniciar backend
npm run develop

# 4. En otra terminal, crear admin
# Visita: http://localhost:1337/admin
# Crea tu usuario administrador

# 5. Cargar datos de prueba
npm run seed

# 6. En otra terminal, iniciar frontend
cd ../frontend
npm start

# 7. Abrir en navegador
# Frontend: http://localhost:4200
# Admin: http://localhost:1337/admin
```

## 🎨 Cambiar Tema

1. Ve a http://localhost:1337/admin
2. Content Manager > Store Configuration
3. Selecciona **Active Theme** > Elige un tema (Elegante, Minimalista, etc.)
4. Click **Save**
5. Refresca http://localhost:4200

## 🛍️ Agregar Productos

1. Admin > Content Manager > Products
2. Click **Create new entry**
3. Completa: Nombre, Precio, Descripción, Imágenes
4. Selecciona **Department**
5. Click **Save and Publish**

## 💳 Configurar Pagos

### Wompi (Modo Prueba)
```env
# backend/.env
WOMPI_PUBLIC_KEY=pub_test_clave_de_prueba
WOMPI_PRIVATE_KEY=prv_test_clave_de_prueba
```

### Nequi
```env
# backend/.env (requiere credenciales reales)
NEQUI_CLIENT_ID=tu_client_id
NEQUI_CLIENT_SECRET=tu_client_secret
NEQUI_API_KEY=tu_api_key
```

## 📊 Estructura de Datos

**6 Temas** incluidos:
- Elegante (vinotinto/dorado) ← ACTIVO
- Minimalista
- Colorido
- Moderno
- Boutique
- Vintage

**5 Departamentos**:
- Bolsos de Mano
- Carteras
- Mochilas
- Clutches
- Bandoleras

**12 Productos** de ejemplo con precios, imágenes placeholder y especificaciones

## 🔧 Comandos Útiles

```bash
# Desarrollo completo (backend + frontend)
npm run dev

# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend

# Construir para producción
npm run build

# Recargar datos de prueba
cd backend && npm run seed
```

## 📖 Próximos Pasos

1. **Personalizar Tienda**: [docs/CONFIGURATION.md](./docs/CONFIGURATION.md)
2. **Desplegar a Producción**: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
3. **Leer Documentación Completa**: [README.md](./README.md)

## 🆘 Problemas Comunes

**Error: Puerto 1337 en uso**
```bash
# Encontrar proceso
lsof -i :1337
# Matar proceso
kill -9 <PID>
```

**Error: No se pueden instalar dependencias**
```bash
# Limpiar caché
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Frontend no conecta con backend**
- Verifica que backend esté corriendo en :1337
- Revisa `frontend/src/environments/environment.ts`:
  - `apiUrl: 'http://localhost:1337/api'`
  - `strapiUrl: 'http://localhost:1337'`

## 📞 Ayuda

- **Configuración**: Ver [docs/CONFIGURATION.md](./docs/CONFIGURATION.md)
- **Deployment**: Ver [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
- **Issues**: Abrir issue en GitHub

---

**¡Listo!** Tu tienda está funcionando 🎉
