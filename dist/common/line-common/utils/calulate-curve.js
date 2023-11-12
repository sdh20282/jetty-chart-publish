"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpposedLine = exports.getControlPoint = void 0;
const getOpposedLine = (pointA, pointB, angleDegree) => {
  const xLength = pointB[0] - pointA[0];
  const yLength = pointB[1] - pointA[1];
  const zLength = Math.sqrt(xLength ** 2 + yLength ** 2);
  const angle = Math.atan2(yLength, xLength) * angleDegree;
  return {
    length: zLength,
    angle
  };
};
exports.getOpposedLine = getOpposedLine;
const getControlPoint = (prev, curr, next, options) => {
  const p = prev || curr;
  const n = next || curr;
  const o = getOpposedLine(p, n, options.angleDegree);
  const angle = o.angle + (options.isEndControlPoint ? Math.PI : 0);
  const length = o.length * options.smoothDegree;
  const x = (curr[0] + Math.cos(angle) * length).toFixed(1);
  const y = (curr[1] + Math.sin(angle) * length).toFixed(1);
  return [x, y];
};
exports.getControlPoint = getControlPoint;