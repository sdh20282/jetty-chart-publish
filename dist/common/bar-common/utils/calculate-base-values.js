"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateStackedLabelLocation = exports.calculateStackedBarBase = exports.calculateLabelLocation = exports.calculateBase = exports.calculateBarBase = void 0;
var _checkCommonException = require("../../utils/exception/check-common-exception");
const calculateBase = _ref => {
  let {
    horizontal,
    height,
    margin,
    width,
    scopeResult,
    autoScope,
    innerMargin,
    padding,
    length,
    barGap
  } = _ref;
  const totalWidth = horizontal ? height - margin.bottom - margin.top : width - margin.left - margin.right;
  const totalHeight = horizontal ? width - margin.left - margin.right : height - margin.bottom - margin.top;
  const totalScope = scopeResult.maxScope - scopeResult.minScope;
  if (!autoScope && scopeResult.display) {
    innerMargin.top = scopeResult.topMarginRatio * totalHeight;
    innerMargin.bottom = scopeResult.bottomMarginRatio * totalHeight;
  }
  const drawWidth = totalWidth - padding - padding;
  const drawHeight = totalHeight - innerMargin.top - innerMargin.bottom;
  const lineHeight = drawHeight / (scopeResult.scope.length - 1);
  const barWidth = drawWidth / length;
  const halfBarWidth = barWidth / 2;
  const halfBarRealWidth = halfBarWidth - barGap * halfBarWidth;
  const zeroHeight = scopeResult.scope.reduce((acc, cur) => {
    if (cur !== 0) {
      acc += 1;
    }
    if (cur === 0) {
      acc = 0;
    }
    return acc;
  }, 0) * lineHeight;
  return {
    totalWidth,
    totalHeight,
    totalScope,
    innerMargin,
    drawWidth,
    drawHeight,
    lineHeight,
    barWidth,
    halfBarWidth,
    halfBarRealWidth,
    zeroHeight
  };
};
exports.calculateBase = calculateBase;
const calculateBarBase = _ref2 => {
  let {
    horizontal,
    reverse,
    value,
    length,
    idx,
    drawWidth,
    drawHeight,
    useMinHeight,
    minHeight,
    totalScope,
    barBorderRadius,
    barOnlyUpperRadius,
    halfBarRealWidth
  } = _ref2;
  const center = drawWidth / length * idx + drawWidth / length / 2;
  const valueRatio = Math.abs(value) / totalScope;
  let barHeight = valueRatio * drawHeight;
  if (useMinHeight && barHeight < minHeight) {
    barHeight = minHeight;
  }
  let barHeightWithoutRadius = barHeight > barBorderRadius ? barHeight - barBorderRadius : barHeight;
  if (useMinHeight && barHeightWithoutRadius < minHeight) {
    barHeightWithoutRadius = minHeight;
  }
  const borderRadius = (0, _checkCommonException.checkBarBorderRadius)({
    halfWidth: halfBarRealWidth,
    height: barHeightWithoutRadius,
    borderRadius: barBorderRadius
  });
  const barTotalWidth = halfBarRealWidth + halfBarRealWidth;
  const realHeight = barHeightWithoutRadius + borderRadius;
  const rectWidth = horizontal ? barHeight + (barOnlyUpperRadius ? borderRadius : 0) : barTotalWidth;
  const rectHeight = horizontal ? barTotalWidth : barHeight + (barOnlyUpperRadius ? borderRadius : 0);
  const checkPositive = value > 0 || !reverse && value === 0;
  return {
    center,
    valueRatio,
    barHeight,
    barHeightWithoutRadius,
    borderRadius,
    barTotalWidth,
    realHeight,
    rectWidth,
    rectHeight,
    checkPositive
  };
};
exports.calculateBarBase = calculateBarBase;
const calculateLabelLocation = _ref3 => {
  let {
    barHeight,
    realHeight,
    checkPositive,
    labelPosition,
    labelMargin
  } = _ref3;
  const horizontalLabelLocation = labelPosition === "over" ? (checkPositive ? realHeight : 0) + labelMargin : labelPosition === "under" ? (checkPositive ? 0 : -realHeight) - labelMargin : checkPositive ? realHeight / 2 : -realHeight / 2;
  const verticalLabelLocation = labelPosition === "over" ? barHeight - (checkPositive ? realHeight : 0) - labelMargin : labelPosition === "under" ? barHeight + (checkPositive ? 0 : realHeight) + labelMargin : barHeight + (checkPositive ? -realHeight / 2 : realHeight / 2);
  return {
    horizontalLabelLocation,
    verticalLabelLocation
  };
};
exports.calculateLabelLocation = calculateLabelLocation;
const calculateStackedBarBase = _ref4 => {
  let {
    rectHeight,
    values,
    idx,
    totalValue,
    reverseOrder
  } = _ref4;
  const nowHeight = values[idx] / totalValue * rectHeight;
  let nowPosition = 0;
  if (reverseOrder) {
    for (let index = values.length - 1; index > idx; index--) {
      nowPosition += values[index] / totalValue * rectHeight;
    }
  } else {
    for (let index = 0; index < idx; index++) {
      nowPosition += values[index] / totalValue * rectHeight;
    }
  }
  return {
    nowHeight,
    nowPosition
  };
};
exports.calculateStackedBarBase = calculateStackedBarBase;
const calculateStackedLabelLocation = _ref5 => {
  let {
    barHeight,
    realHeight,
    checkPositive,
    labelPosition,
    labelMargin,
    rectWidth,
    rectHeight,
    nowPosition
  } = _ref5;
  const horizontalLabelLocation = labelPosition === "over" ? (checkPositive ? nowPosition : -(barHeight + nowPosition)) + rectWidth + labelMargin :
  // : labelPosition === "under"
  // ? (checkPositive ? 0 : -realHeight) - labelMargin
  (checkPositive ? nowPosition : -(barHeight + nowPosition)) + rectWidth / 2;
  const verticalLabelLocation = labelPosition === "over" ? (checkPositive ? nowPosition : barHeight - nowPosition) - labelMargin : labelPosition === "under" ? barHeight + (checkPositive ? 0 : realHeight) + labelMargin : (checkPositive ? nowPosition : barHeight - nowPosition) + rectHeight / 2;
  return {
    horizontalLabelLocation,
    verticalLabelLocation
  };
};
exports.calculateStackedLabelLocation = calculateStackedLabelLocation;