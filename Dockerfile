FROM node:12-slim

WORKDIR /www
RUN npm install -g pm2@latest typescript

ENV APP_PORT 80
ARG GITHUB_TOKEN
ARG GITHUB_OWNER

RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> $HOME/.npmrc && \
    npm config set @${GITHUB_OWNER}:registry https://npm.pkg.github.com/${GITHUB_OWNER}


COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .npmrc ./

RUN npm install

COPY . .
RUN npm run lint && npm run test && npm run build

#start comman
CMD ["pm2", "start", "-s", "/www/dist/bin/www/index.js", "--name", "app", "--no-daemon"]
