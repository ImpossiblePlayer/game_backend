FROM node

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3300

CMD ["npm", "start"]