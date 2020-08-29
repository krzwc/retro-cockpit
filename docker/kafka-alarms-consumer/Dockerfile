FROM golang:1.14-alpine as build
RUN mkdir /build
COPY ./kafka-alarms-consumer/ /build/
WORKDIR /build
RUN go build -o main .

FROM alpine
RUN adduser -S -D -H -h /app appuser
USER appuser
COPY --from=build /build/main /app/
WORKDIR /app
EXPOSE 8080
CMD ["./main"]
