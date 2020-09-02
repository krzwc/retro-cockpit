CREATE TABLE IF NOT EXISTS alarms (
    id SERIAL,
    timestamp TIMESTAMPTZ NOT NULL,
    severity CHAR(10),
    resolved BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pb_metrics (
    id SERIAL,
    pb CHAR(3),
    value SMALLINT,
    timestamp TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS bc_metrics (
    id SERIAL,
    core CHAR(5),
    freq0 SMALLINT,
    freq1 SMALLINT,
    timestamp TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id)
);

SELECT create_hypertable('alarms', 'timestamp');
SELECT create_hypertable('pb_metrics', 'timestamp');
SELECT create_hypertable('bc_metrics', 'timestamp');