# 🚀 Guía de Despliegue - AdaraStyle

Esta guía cubre el despliegue de AdaraStyle en producción.

## 📋 Requisitos Previos

- Servidor con Node.js 20.19.5+
- PostgreSQL 12+ (recomendado para producción)
- Dominio configurado con DNS
- Certificado SSL (recomendado: Let's Encrypt con Certbot)

## 🎯 Opciones de Despliegue

### Opción 1: Despliegue Tradicional (VPS/Servidor Propio)

#### 1. Preparación del Servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar PM2 (Process Manager)
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx
```

#### 2. Configurar PostgreSQL

```bash
# Acceder a PostgreSQL
sudo -u postgres psql

# Crear base de datos y usuario
CREATE DATABASE adarastyle;
CREATE USER adarastyle_user WITH ENCRYPTED PASSWORD 'tu_password_segura';
GRANT ALL PRIVILEGES ON DATABASE adarastyle TO adarastyle_user;
\q
```

#### 3. Clonar y Configurar Proyecto

```bash
# Clonar repositorio
cd /var/www
sudo git clone <tu-repositorio> adarastyle
cd adarastyle

# Cambiar permisos
sudo chown -R $USER:$USER /var/www/adarastyle

# Instalar dependencias
npm run setup
```

#### 4. Configurar Variables de Entorno - Backend

```bash
cd backend
cp .env.example .env
nano .env
```

```env
# Producción
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Secrets (GENERAR NUEVOS!)
APP_KEYS=generate_new_key_1,generate_new_key_2,generate_new_key_3,generate_new_key_4
API_TOKEN_SALT=generate_new_salt
ADMIN_JWT_SECRET=generate_new_secret
TRANSFER_TOKEN_SALT=generate_new_salt
JWT_SECRET=generate_new_secret

# PostgreSQL
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=adarastyle
DATABASE_USERNAME=adarastyle_user
DATABASE_PASSWORD=tu_password_segura
DATABASE_SSL=false

# URLs
FRONTEND_URL=https://tudominio.com

# Payment Gateways
WOMPI_PUBLIC_KEY=pub_prod_tu_clave
WOMPI_PRIVATE_KEY=prv_prod_tu_clave
WOMPI_EVENTS_SECRET=tu_secret

NEQUI_CLIENT_ID=tu_client_id
NEQUI_CLIENT_SECRET=tu_client_secret
NEQUI_API_KEY=tu_api_key
```

**Generar Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 5. Configurar Frontend

```bash
cd ../frontend
nano src/environments/environment.prod.ts
```

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tudominio.com/api',
  strapiUrl: 'https://tudominio.com',
  wompiPublicKey: 'pub_prod_tu_clave',
};
```

#### 6. Build del Proyecto

```bash
# Build backend
cd /var/www/adarastyle/backend
npm run build

# Build frontend
cd /var/www/adarastyle/frontend
npm run build
```

#### 7. Configurar PM2 para Backend

```bash
cd /var/www/adarastyle/backend

# Iniciar con PM2
pm2 start npm --name "adarastyle-backend" -- start

# Guardar configuración
pm2 save

# Auto-inicio en boot
pm2 startup
```

#### 8. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/adarastyle
```

```nginx
# Backend API
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Frontend
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    root /var/www/adarastyle/frontend/dist/adarastyle-frontend/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/adarastyle /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### 9. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificados
sudo certbot --nginx -d tudominio.com -d www.tudominio.com -d api.tudominio.com

# Auto-renovación
sudo certbot renew --dry-run
```

#### 10. Seed de Datos (Primera Vez)

```bash
cd /var/www/adarastyle/backend
npm run seed
```

#### 11. Crear Usuario Admin

- Visita https://api.tudominio.com/admin
- Crea tu cuenta de administrador

### Opción 2: Despliegue en Heroku

#### Backend (Strapi)

```bash
# En el directorio backend
cd backend

# Inicializar Git (si no existe)
git init
git add .
git commit -m "Initial commit"

# Crear app en Heroku
heroku create tu-app-backend

# Agregar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set APP_KEYS=$(node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")
heroku config:set API_TOKEN_SALT=$(node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")
heroku config:set ADMIN_JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")

# Deploy
git push heroku main

# Seed data
heroku run npm run seed
```

#### Frontend (Netlify/Vercel)

**Con Netlify:**
```bash
cd frontend

# Instalar Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist/adarastyle-frontend/browser
```

**Con Vercel:**
```bash
npm install -g vercel
vercel --prod
```

### Opción 3: Docker

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
```

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/adarastyle-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: adarastyle
      POSTGRES_USER: adarastyle
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "1337:1337"
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: adarastyle
      DATABASE_USERNAME: adarastyle
      DATABASE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - postgres
    volumes:
      - ./backend/public/uploads:/app/public/uploads

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

```bash
# Deploy con Docker
docker-compose up -d
```

## 🔒 Seguridad

### Checklist de Seguridad

- [ ] Cambiar todos los secrets por valores únicos y seguros
- [ ] Usar HTTPS (SSL/TLS)
- [ ] Configurar CORS correctamente
- [ ] Habilitar rate limiting
- [ ] Mantener dependencias actualizadas
- [ ] Configurar backups automáticos
- [ ] Restringir acceso al panel de admin
- [ ] Usar variables de entorno para credenciales
- [ ] Configurar firewall (UFW)

### Configurar Firewall (Ubuntu)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 📊 Monitoreo

### PM2 Monitoring

```bash
# Ver logs
pm2 logs adarastyle-backend

# Monitoreo en tiempo real
pm2 monit

# Estadísticas
pm2 status
```

### Logs de Nginx

```bash
# Ver logs de acceso
sudo tail -f /var/log/nginx/access.log

# Ver logs de error
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Actualización del Proyecto

```bash
# Detener servicios
pm2 stop adarastyle-backend

# Actualizar código
cd /var/www/adarastyle
git pull origin main

# Actualizar dependencias
cd backend && npm install
cd ../frontend && npm install

# Rebuild
cd backend && npm run build
cd ../frontend && npm run build

# Reiniciar servicios
pm2 restart adarastyle-backend

# Recargar Nginx
sudo systemctl reload nginx
```

## 💾 Backups

### Script de Backup PostgreSQL

```bash
#!/bin/bash
# /var/scripts/backup-adarastyle.sh

BACKUP_DIR="/var/backups/adarastyle"
DATE=$(date +%Y%m%d_%H%M%S)

# Crear directorio si no existe
mkdir -p $BACKUP_DIR

# Backup de base de datos
pg_dump -U adarastyle_user adarastyle > $BACKUP_DIR/db_$DATE.sql

# Backup de uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/adarastyle/backend/public/uploads

# Eliminar backups antiguos (más de 30 días)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completado: $DATE"
```

```bash
# Hacer ejecutable
chmod +x /var/scripts/backup-adarastyle.sh

# Agregar a crontab (diario a las 2am)
crontab -e
# Agregar línea:
0 2 * * * /var/scripts/backup-adarastyle.sh
```

## 🆘 Troubleshooting

### Backend no inicia

```bash
# Verificar logs
pm2 logs adarastyle-backend

# Verificar puerto
sudo lsof -i :1337

# Verificar conexión a DB
psql -U adarastyle_user -d adarastyle -h localhost
```

### Frontend no carga

```bash
# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# Verificar permisos
ls -la /var/www/adarastyle/frontend/dist
```

### Error de base de datos

```bash
# Verificar PostgreSQL
sudo systemctl status postgresql

# Ver logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

## 📞 Soporte

Para problemas de despliegue, consulta:
- [Documentación de Strapi](https://docs.strapi.io/dev-docs/deployment)
- [Documentación de Angular](https://angular.io/guide/deployment)
- Abre un issue en el repositorio

---

**Última actualización**: 2025-01-17
