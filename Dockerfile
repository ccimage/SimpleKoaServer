# 构建基础镜像
FROM node:16.20.2-alpine3.18  AS base

# 安装第三方软件 zip
RUN apk update
RUN apk add yarn

WORKDIR $APP_PATH

# 构建生产依赖镜像
FROM base AS base-prod

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

# 生成runtime
FROM base AS runtime

COPY client ./client
COPY .env.sample ./.env
COPY src ./src
COPY tsconfig.json .
COPY webpack.config.js .
COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN npm run package

# 构建最终镜像
FROM base-prod

COPY --from=runtime $APP_PATH/dist ./dist
COPY --from=runtime $APP_PATH/client ./client
COPY --from=runtime $APP_PATH/.env .

CMD node dist/server.bundle.js
