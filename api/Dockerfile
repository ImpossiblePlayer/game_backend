FROM node

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

ENV PORT=3000

EXPOSE ${PORT}

CMD ["yarn", "start"]
