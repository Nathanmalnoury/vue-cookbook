FROM node:14

RUN npm i -g npm@latest

COPY package*.json ./
RUN npm install
WORKDIR /app
CMD "npm run build"
ENTRYPOINT ["npm", "run", "serve"]
