FROM node:20-alpine AS base


WORKDIR /app
COPY package*.json .
RUN npm install 
RUN npm install pm2 -g
RUN npm install -g ts-node


COPY . .

EXPOSE 8000

ENV PORT=8000

RUN ls -al -R

CMD [ "pm2-runtime","src/server.ts" ]

