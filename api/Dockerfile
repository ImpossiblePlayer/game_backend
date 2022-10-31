FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .
RUN yarn run build

ENV PORT=3000
EXPOSE ${PORT}

CMD ["yarn", "run", "start"]
