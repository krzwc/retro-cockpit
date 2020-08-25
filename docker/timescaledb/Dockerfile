FROM timescale/timescaledb:1.7.1-pg11
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB retro_cockpit
ADD ./timescaledb/init.sql /docker-entrypoint-initdb.d/