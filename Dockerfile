# FROM nginx:latest
# COPY ./index.html /usr/share/nginx/html/index.html

FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]