# 1. Этап сборки
FROM node:20-alpine AS build

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код фронта
COPY . .

# Проверяем, что index.html есть
RUN ls -la

# Собираем проект
RUN npm run build

# 2. Этап запуска через Nginx
FROM nginx:stable-alpine

# Копируем сборку
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
