# Используем официальный образ Node.js в качестве базы
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies, так как они нужны для сборки
RUN npm install

# Копируем остальную часть приложения
COPY . .

# Сборка проекта
RUN npm run build

# Указываем переменную окружения для порта
ENV PORT=$PORT

# Открываем порт
EXPOSE $PORT

# Запускаем приложение
CMD ["sh", "-c", "npm run migrate && npm run start:prod"]
