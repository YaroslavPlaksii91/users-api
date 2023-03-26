FROM node:18-alpine as base
WORKDIR /src
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN yarn install
COPY --chown=node:node . ./
USER node
CMD ["yarn", "start"]