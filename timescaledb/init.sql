CREATE TABLE IF NOT EXISTS alarms (
    timestamp TIMESTAMPTZ NOT NULL,
    severity CHAR(10),
    resolved BOOLEAN,
);

CREATE TABLE IF NOT EXISTS pb_metrics (
    timestamp TIMESTAMPTZ NOT NULL,
    pb CHAR(3),
    value SMALLINT,
);

CREATE TABLE IF NOT EXISTS bc_metrics (
    timestamp TIMESTAMPTZ NOT NULL,
    core CHAR(5),
    freq0 SMALLINT,
    freq1 SMALLINT,
);

SELECT create_hypertable('alarms', 'timestamp');
SELECT create_hypertable('pb_metrics', 'timestamp');
SELECT create_hypertable('bc_metrics', 'timestamp');