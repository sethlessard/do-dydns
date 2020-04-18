FROM node:12

WORKDIR /do-dydns

COPY . .

RUN npm install
RUN npm install -D

CMD [ "node", "index.js" ]
