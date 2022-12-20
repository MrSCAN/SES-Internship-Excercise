# syntax=docker/dockerfile:1.4

FROM  node:16.14.2

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@15

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]