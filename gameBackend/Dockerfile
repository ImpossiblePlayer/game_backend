FROM node

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["npm", "start"]
