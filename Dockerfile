FROM node:14.15.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server/index.js"]