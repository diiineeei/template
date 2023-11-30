# The instructions for the first stage
FROM node:18-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]
