FROM golang:1.14-alpine as build
RUN mkdir /build
COPY ./backend/ /build/
WORKDIR /build
RUN go build -o main .

FROM alpine
COPY --from=build /build/main /app/
WORKDIR /app
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
EXPOSE 8000
CMD dockerize -wait tcp://timescaledb:5432 -timeout 100s ./main