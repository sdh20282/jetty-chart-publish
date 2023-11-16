"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLine = void 0;
var _DrawLine = require("../common/DrawLine");
var _jsxRuntime = require("react/jsx-runtime");
const MultiLine = _ref => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DrawLine.DrawLine, {
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
exports.MultiLine = MultiLine;