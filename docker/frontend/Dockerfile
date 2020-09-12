FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm ci -qy
COPY ./frontend .
EXPOSE 3000
CMD [ "npm", "run", "start" ]