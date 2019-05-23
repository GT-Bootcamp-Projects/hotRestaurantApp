FROM node:lts-alpine

RUN apk add --no-cache ca-certificates

WORKDIR /opt/hotrestaurant-api

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

COPY . .

# build app for production with minification
RUN npm run build

EXPOSE ${PORT:-5000}

CMD [ "npm", "start" ]

