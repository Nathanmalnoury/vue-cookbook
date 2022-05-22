FROM node:14
COPY package*.json ./
RUN npm install

WORKDIR /app
ENTRYPOINT ["npm", "run", "serve"]
