"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackedLine = void 0;
var _DrawLine = require("../common/DrawLine");
var _jsxRuntime = require("react/jsx-runtime");
const StackedLine = _ref => {
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
  const stackedData = [];
  data.forEach((element, idx) => {
    if (idx === 0) {
      stackedData.push({
        ...element
      });
      return;
    }
    const newData = element.data.map((d, i) => {
      return {
        ...d,
        value: d.value + stackedData[idx - 1].data[i].value
      };
    });
    stackedData.push({
      ...element,
      data: newData
    });
  });
  data = [...stackedData].reverse();
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
exports.StackedLine = StackedLine;