# --- STAGE 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# --- STAGE 2: Production ---
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Only copy the dist folder
COPY --from=builder /app/dist .

EXPOSE ${PORT}
CMD ["node", "index.js"]
