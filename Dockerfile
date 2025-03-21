FROM node:22.14.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
