FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY prod-package.json /app/package.json

RUN npm install

COPY server.js /app/server.js
COPY --from=builder /app/build /app/build

EXPOSE 3000

CMD ["npm", "start"]