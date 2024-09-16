FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=$PORT

EXPOSE $PORT

CMD ["sh", "-c", "npm run start:prod"]
