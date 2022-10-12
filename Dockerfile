# FROM node:alpine
# COPY . /React-Project
# WORKDIR /React-Project/src
# CMD node App.js
FROM node:14.17.3
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install
RUN npm rebuild node-sass

CMD ["npm", "run", "start"]