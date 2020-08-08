import homeRoute from './home/route';
import testRoute from './test/route';
import commsRoute from './comms/route';
import metricsRoute from './metrics/route';
import alarmsRoute from './alarms/route';

const home = [
  homeRoute
];
const test = [testRoute];
const comms = [commsRoute];
const metrics = [metricsRoute];
const alarms = [alarmsRoute];

export const possibleRoutes = [
    home,
    test,
    comms,
    metrics,
    alarms
].flat();