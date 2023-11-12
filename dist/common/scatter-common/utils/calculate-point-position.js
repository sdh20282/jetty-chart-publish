"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateYPosition = exports.calculateXPosition = void 0;
// X 좌표 위치 계산
const calculateXPosition = (value, scopeResult, totalWidth, xReverse) => {
  const {
    minScope,
    maxScope
  } = scopeResult;
  if (xReverse) {
    return totalWidth - (value - minScope) / (maxScope - minScope) * totalWidth;
  }
  return (value - minScope) / (maxScope - minScope) * totalWidth;
};

// Y 좌표 위치 계산
exports.calculateXPosition = calculateXPosition;
const calculateYPosition = (value, scopeResult, totalHeight, yReverse) => {
  const {
    minScope,
    maxScope
  } = scopeResult;
  if (yReverse) {
    return (value - minScope) / (maxScope - minScope) * totalHeight;
  }
  return totalHeight - (value - minScope) / (maxScope - minScope) * totalHeight;
};
exports.calculateYPosition = calculateYPosition;