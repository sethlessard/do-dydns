FROM node:12

WORKDIR /do-dydns

COPY . .

# remove the .env file if it exists.
RUN rm .env

RUN npm install -g mocha chai
RUN npm install

CMD [ "node", "index.js" ]
