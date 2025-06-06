FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3003

CMD ["npm", "start"]
