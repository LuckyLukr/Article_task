FROM node:alpine
WORKDIR '/Application'

COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]