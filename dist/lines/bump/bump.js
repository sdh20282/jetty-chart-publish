"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BumpChart = void 0;
var _DrawBump = require("../common/DrawBump");
var _jsxRuntime = require("react/jsx-runtime");
const BumpChart = _ref => {
  let {
    data,
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DrawBump.DrawBump, {
    data: data,
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
exports.BumpChart = BumpChart;