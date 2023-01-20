FROM node:18.10-alpine

WORKDIR /app

# copy package.json and yarn.lock to install dependencies (for caching)
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn

# copy the rest of the files
COPY . .

# copy production env to .env
COPY .env.production .env

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD yarn start

USER node