FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG VITE_BACKEND_URL

COPY . .

RUN npm run build

FROM httpd:latest

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

CMD ["httpd-foreground"]