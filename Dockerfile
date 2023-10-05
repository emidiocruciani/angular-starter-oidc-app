FROM node:lts-alpine AS local

RUN npm install -g @angular/cli

WORKDIR /app
