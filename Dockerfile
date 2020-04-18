FROM node:12

WORKDIR /do-dydns

COPY . .

RUN npm install --only=production

CMD [ "node", "index.js" ]
