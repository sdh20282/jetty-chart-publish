"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleLine = void 0;
var _multiLine = require("../multi-line/multi-line");
var _jsxRuntime = require("react/jsx-runtime");
/* eslint-disable complexity */

const SingleLine = _ref => {
  let {
    data,
    title,
    xLegend,
    yLegend,
    normalSettings,
    scopeSettings,
    axisXGridLineSettings,
    axisYGridLineSettings,
    leftLabelSettings,
    rightLabelSettings,
    bottomLabelSettings,
    topLabelSettings,
    leftLegendSettings,
    rightLegendSettings,
    legendSettings,
    lineSettings,
    animationSettings
  } = _ref;
  if (!data || data.length === 0) {
    return;
  }
  const dataSet = [{
    id: title,
    data: data
  }];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_multiLine.MultiLine, {
    dataSet: dataSet,
    xLegend: xLegend,
    yLegend: yLegend,
    normalSettings: normalSettings,
    scopeSettings: scopeSettings,
    axisXGridLineSettings: axisXGridLineSettings,
    axisYGridLineSettings: axisYGridLineSettings,
    leftLabelSettings: leftLabelSettings,
    rightLabelSettings: rightLabelSettings,
    bottomLabelSettings: bottomLabelSettings,
    topLabelSettings: topLabelSettings,
    leftLegendSettings: leftLegendSettings,
    rightLegendSettings: rightLegendSettings,
    legendSettings: legendSettings,
    lineSettings: lineSettings,
    animationSettings: animationSettings
  });
};
exports.SingleLine = SingleLine;