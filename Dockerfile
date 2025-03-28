FROM node:20-alpine

WORKDIR /app

# Instalar dependencias y reconstruir sqlite3
COPY package*.json ./
RUN npm ci && npm rebuild sqlite3

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Limpiar dependencias de desarrollo
RUN rm -rf node_modules

# Copiar archivos necesarios a dist
COPY package*.json ./dist/

# Cambiar al directorio dist
WORKDIR /app/dist

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Crear directorio para la base de datos
RUN mkdir -p /app/dist/data

EXPOSE ${PORT}

CMD ["node", "index.js"] 