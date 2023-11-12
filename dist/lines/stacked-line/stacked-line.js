"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackedLine = void 0;
var _checkLineException = require("../../common/utils/exception/check-line-exception");
var _multiLine = require("../multi-line/multi-line");
var _jsxRuntime = require("react/jsx-runtime");
const StackedLine = _ref => {
  let {
    dataSet,
    keys,
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
  if (!dataSet || dataSet.length === 0) {
    return;
  }
  const stackedData = [];
  dataSet.forEach((element, idx) => {
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
  dataSet = [...stackedData].reverse();
  const result = (0, _checkLineException.checkNormalLine)({
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
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_multiLine.MultiLine, {
    dataSet: dataSet,
    keys: keys,
    xLegend: xLegend,
    yLegend: yLegend,
    normalSettings: result.normalSettings,
    scopeSettings: result.scopeSettings,
    axisXGridLineSettings: result.axisXGridLineSettings,
    axisYGridLineSettings: result.axisYGridLineSettings,
    leftLabelSettings: result.leftLabelSettings,
    rightLabelSettings: result.rightLabelSettings,
    bottomLabelSettings: result.bottomLabelSettings,
    topLabelSettings: result.topLabelSettings,
    leftLegendSettings: result.leftLegendSettings,
    rightLegendSettings: result.rightLegendSettings,
    legendSettings: result.legendSettings,
    lineSettings: result.lineSettings,
    animationSettings: result.animationSettings
  });
};
exports.StackedLine = StackedLine;