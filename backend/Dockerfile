FROM node:20-alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production

COPY index.js ./
EXPOSE 3000

CMD ["node", "index.js"]
