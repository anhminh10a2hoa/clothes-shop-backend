FROM node:16

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build
COPY ormconfig.json ./dist/
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 8080
CMD [ "node", "index.js" ]