FROM node:18

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json .
RUN yarn

RUN yarn remove bcrypt
RUN yarn add bcrypt

COPY . .
RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]
