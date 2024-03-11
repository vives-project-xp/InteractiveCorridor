FROM node:21-alpine3.18

WORKDIR /usr/local/website

COPY . .

RUN npm install

EXPOSE 80

CMD ["npm", "run", "production"]