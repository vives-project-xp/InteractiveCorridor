FROM node:21-alpine3.18

RUN npm install -g http-server

WORKDIR /usr/local/website

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "http-server", "dist" ]