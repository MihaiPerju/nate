
FROM node:14

WORKDIR /opt/backend

# Installing dependencies
COPY package.json .
COPY yarn.lock .
COPY .npmrc .npmrc

RUN yarn 

ENV NODE_PATH=.

CMD ["yarn", "dev" ]