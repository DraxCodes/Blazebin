FROM node:latest AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000

FROM node:latest AS deploy

WORKDIR /app
COPY --from=build /app/build .
COPY ./package.json .
RUN npm install --save @vscode/vscode-languagedetection
ENTRYPOINT ["node", "index.js"]