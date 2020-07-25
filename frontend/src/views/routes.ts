import homeRoute from './home/route';
import testRoute from './test/route';
import commsRoute from './comms/route';

const home = [
  homeRoute
];
const test = [testRoute];
const comms = [commsRoute];

export const possibleRoutes = [
    home,
    test,
    comms
].flat();