FROM node:lts-alpine3.19 AS build
RUN mkdir /app
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install --force
RUN npm run build

FROM nginx:latest AS ngi
COPY --from=build /app/dist/fe /usr/share/nginx/html/fe

EXPOSE 80

