FROM node:12

WORKDIR /do-dydns

COPY . .

RUN npm install -g mocha
RUN npm install

CMD [ "node", "index.js" ]
