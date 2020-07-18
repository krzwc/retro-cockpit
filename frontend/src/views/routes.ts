import homeRoute from './home/route';
import testRoute from './test/route';

const home = [
  homeRoute
];
const test = [testRoute];

export const possibleRoutes = [
    home,
    test,
].flat();