FROM node:13-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . /app
RUN npm run build

FROM node:13-alpine
WORKDIR /app
COPY ./server/ ./
COPY --from=build /app/build ./build/
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "app.js"]