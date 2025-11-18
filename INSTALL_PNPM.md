# 🚀 Instalación con pnpm

## ¿Por qué pnpm?

- **Más rápido** que npm y yarn
- **Ahorra espacio** en disco (store global)
- **Seguro** por defecto (strict peer dependencies)
- **Compatible** con workspaces nativos

## 📋 Prerrequisitos

- Node.js **20.19.5+**
- pnpm **9.0.0+**

## 🔧 Instalar pnpm

```bash
# Con npm (si no tienes pnpm)
npm install -g pnpm@9.15.0

# Verificar instalación
pnpm --version  # Debe mostrar 9.15.0 o superior
node --version  # Debe mostrar v20.19.5 o superior
```

## ⚡ Instalación Rápida

### Opción 1: Instalación Completa (Recomendada)

```bash
# Desde la raíz del proyecto
pnpm install
```

Esto instalará automáticamente:
- Backend (Strapi 5.3.0)
- Frontend (Angular 20)
- Todas las dependencias de desarrollo

### Opción 2: Instalación Selectiva

```bash
# Solo backend
pnpm --filter adarastyle-backend install

# Solo frontend
pnpm --filter adarastyle-frontend install
```

## 🎯 Configuración del Backend

```bash
# 1. Ir a backend
cd backend

# 2. Copiar .env
cp .env.example .env

# 3. Generar secrets
node -e "console.log('APP_KEYS=' + Array(4).fill(0).map(() => require('crypto').randomBytes(16).toString('base64')).join(','))"
node -e "console.log('ADMIN_JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('API_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log('TRANSFER_TOKEN_SALT=' + require('crypto').randomBytes(16).toString('base64'))"

# 4. Pegar cada valor en .env
nano .env  # o code .env
```

## 🚀 Comandos de Desarrollo

### Desde la raíz del proyecto:

```bash
# Iniciar ambos (backend + frontend)
pnpm run dev

# Solo backend
pnpm run dev:backend

# Solo frontend
pnpm run dev:frontend

# Cargar datos de prueba
pnpm run seed
```

### Comandos directos en cada carpeta:

```bash
# Backend
cd backend
pnpm run develop      # Desarrollo
pnpm run start        # Producción
pnpm run build        # Build
pnpm run seed         # Datos de prueba

# Frontend
cd frontend
pnpm start            # Desarrollo (http://localhost:4200)
pnpm run build        # Build producción
```

## 📦 Agregar Dependencias

```bash
# En el workspace raíz
pnpm add -D <paquete>

# En backend
pnpm --filter adarastyle-backend add <paquete>

# En frontend
pnpm --filter adarastyle-frontend add <paquete>
```

## 🔄 Workflow Completo

```bash
# 1. Instalar todo
pnpm install

# 2. Configurar backend
cd backend
cp .env.example .env
# Editar .env con secrets generados
cd ..

# 3. Iniciar backend
pnpm run dev:backend
# Esperar a que inicie

# 4. Crear usuario admin
# Visitar http://localhost:1337/admin
# Crear cuenta de administrador

# 5. Cargar datos de prueba (en otra terminal)
pnpm run seed

# 6. Iniciar frontend (en otra terminal)
pnpm run dev:frontend

# 7. Abrir aplicación
# Frontend: http://localhost:4200
# Admin: http://localhost:1337/admin
```

## 🎨 Estructura con pnpm workspace

```
adarastyle/
├── pnpm-workspace.yaml    # Configuración de workspace
├── .npmrc                 # Configuración de pnpm
├── package.json           # Scripts del monorepo
├── backend/
│   ├── package.json       # Strapi 5.3.0
│   └── ...
└── frontend/
    ├── package.json       # Angular 20
    └── ...
```

## 📊 Versiones

- **Strapi**: 5.3.0 (última estable de Strapi 5)
- **Angular**: 20.0.0 (con Signals)
- **Node.js**: 20.19.5+
- **pnpm**: 9.15.0
- **TypeScript**: 5.7.2

## 🆘 Troubleshooting

### Error: "No matching version found for @strapi/strapi@^5.7.0"

✅ **Solucionado**: Ahora usamos Strapi 5.3.0 (última versión estable)

### Error: peer dependencies warnings

```bash
# En .npmrc ya está configurado:
auto-install-peers=true
strict-peer-dependencies=false
```

### Limpiar caché de pnpm

```bash
pnpm store prune
pnpm install --force
```

### Reinstalar todo

```bash
# Limpiar
rm -rf node_modules
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm pnpm-lock.yaml

# Reinstalar
pnpm install
```

## 💡 Tips de pnpm

### Ver dependencias

```bash
pnpm list                    # Todas
pnpm list --depth 0          # Solo directas
pnpm list --filter backend   # Solo backend
```

### Actualizar dependencias

```bash
pnpm update                  # Todas
pnpm update --latest         # A últimas versiones
```

### Ver scripts disponibles

```bash
pnpm run                     # En raíz
cd backend && pnpm run       # En backend
cd frontend && pnpm run      # En frontend
```

## 🔐 Ventajas del Store de pnpm

pnpm usa un **store global** que ahorra espacio:

```bash
# Ver ubicación del store
pnpm store path

# Ver estadísticas
pnpm store status

# Limpiar paquetes no usados
pnpm store prune
```

## 📚 Documentación

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [pnpm CLI](https://pnpm.io/cli/add)
- [Strapi 5 Docs](https://docs.strapi.io)
- [Angular 20](https://angular.dev)

---

**¿Problemas?** Consulta [QUICK_START.md](./QUICK_START.md) o abre un issue.
