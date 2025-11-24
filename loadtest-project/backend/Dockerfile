# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

# Сначала копируем package.json и tsconfig.json
COPY package*.json tsconfig.json ./
RUN npm ci

# Потом копируем исходники
COPY ./src ./src

# Сборка
RUN npm run build

# -------- RUN STAGE --------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
