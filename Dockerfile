FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json .
RUN npm install 

COPY . .

EXPOSE 8000

ENV PORT=8000

CMD [ "npm","start" ]

