FROM node:18

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json .
RUN yarn

COPY . .
RUN yarn build

RUN yarn remove bcrypt
RUN yarn add bcrypt

EXPOSE ${PORT}

CMD ["yarn", "start"]
