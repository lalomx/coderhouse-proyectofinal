FROM node:18-slim
WORKDIR /opt/app

COPY . .

RUN npm ci
RUN npm prune --omit=dev

ENTRYPOINT [ "node", "src/app.js" ]