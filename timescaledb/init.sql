CREATE TABLE IF NOT EXISTS alarms (
    id SERIAL,
    time TIMESTAMPTZ NOT NULL,
    severity CHAR(10),
    PRIMARY KEY (id)
);

SELECT create_hypertable('alarms', 'time');

CREATE TABLE IF NOT EXISTS pb_metrics (
    pb CHAR(3),
    value SMALLINT,
    PRIMARY KEY (pb)
);

CREATE TABLE IF NOT EXISTS bc_metrics (
    core CHAR(5),
    freq0 SMALLINT,
    freq1 SMALLINT,
    PRIMARY KEY (core)
);