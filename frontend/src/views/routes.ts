import homeRoute from './home/route';
import testRoute from './test/route';
import commsRoute from './comms/route';
import metricsRoute from './metrics/route';

const home = [
  homeRoute
];
const test = [testRoute];
const comms = [commsRoute];
const metrics = [metricsRoute];

export const possibleRoutes = [
    home,
    test,
    comms,
    metrics
].flat();