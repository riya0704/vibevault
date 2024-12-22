FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .next .

RUN npm install

COPY . .


EXPOSE 3000

CMD [ "npm","run", "start"]