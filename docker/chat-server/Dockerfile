FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY ./chat-server/package*.json ./
RUN npm ci -qy
COPY ./chat-server .
CMD [ "npm", "run", "start" ]