FROM node:20-alpine 

WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
COPY . .
RUN npm install 
RUN npm run build
EXPOSE 8000

ENV PORT=8000

CMD [ "npm","start" ]

