"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelValueCommon = void 0;
var _drawYAxisGridLine = require("../y-axis/draw-y-axis-grid-line");
var _drawXAxisGridLine = require("../x-axis/draw-x-axis-grid-line");
var _drawYAxisLabel = require("../y-axis/draw-y-axis-label");
var _drawXAxisLabel = require("../x-axis/draw-x-axis-label");
var _drawYAxisLegend = require("../y-axis/draw-y-axis-legend");
var _drawXAxisLegend = require("../x-axis/draw-x-axis-legend");
var _drawLegends = require("../legend/draw-legends");
var _jsxRuntime = require("react/jsx-runtime");
const LabelValueCommon = _ref => {
  var _innerMargin;
  let {
    keys,
    xAxis,
    yAxis,
    xLegend,
    yLegend,
    normalSettings: {
      width,
      height,
      backgroundColor,
      margin,
      innerMargin,
      padding,
      reverse,
      horizontal,
      totalWidth,
      totalHeight,
      xAxisInitialPosition,
      xAxisWidth,
      yAxisHeight,
      showTopScope,
      colorPalette
    },
    axisXGridLineSettings,
    axisYGridLineSettings,
    leftLabelSettings,
    rightLabelSettings,
    bottomLabelSettings,
    topLabelSettings,
    leftLegendSettings,
    rightLegendSettings,
    bottomLegendSettings,
    topLegendSettings,
    legendSettings,
    animationSettings,
    children
  } = _ref;
  if (horizontal) {
    yAxis.reverse();
  }
  (_innerMargin = innerMargin) !== null && _innerMargin !== void 0 ? _innerMargin : innerMargin = {
    top: 0,
    bottom: 0
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      width: "".concat(width, "px"),
      height: "".concat(height, "px"),
      border: "1px solid #ccc"
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      width: width,
      height: height,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        width: "100%",
        height: "100%",
        fill: backgroundColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: "translate(".concat(margin.left, ",").concat(margin.top, ")"),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_drawYAxisLegend.DrawYAxisLegend, {
          yLegend: yLegend,
          normalSettings: {
            totalWidth,
            totalHeight,
            horizontal
          },
          legendSettings: leftLegendSettings
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawYAxisLegend.DrawYAxisLegend, {
          yLegend: yLegend,
          normalSettings: {
            totalWidth,
            totalHeight,
            horizontal
          },
          legendSettings: rightLegendSettings
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawXAxisLegend.DrawXAxisLegend, {
          xLegend: xLegend,
          normalSettings: {
            totalWidth,
            totalHeight,
            horizontal
          },
          legendSettings: bottomLegendSettings
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawXAxisLegend.DrawXAxisLegend, {
          xLegend: xLegend,
          normalSettings: {
            totalWidth,
            totalHeight,
            horizontal
          },
          legendSettings: topLegendSettings
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
          transform: horizontal ? "translate(".concat(reverse ? innerMargin.top : innerMargin.bottom, ",0)") : "translate(0,".concat(reverse ? innerMargin.bottom : innerMargin.top, ")"),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_drawYAxisGridLine.DrawYAxisGridLine, {
            normalSettings: {
              horizontal,
              yAxis,
              width: totalWidth,
              yAxisHeight,
              showTopScope
            },
            lineSettings: axisYGridLineSettings,
            animationSettings: animationSettings.axisYGridLineSettings
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawYAxisLabel.DrawYAxisLabel, {
            normalSettings: {
              horizontal,
              yAxis,
              width: totalWidth,
              yAxisHeight,
              showTopScope
            },
            labelSettings: leftLabelSettings,
            animationSettings: animationSettings.axisYLabelSettings
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawYAxisLabel.DrawYAxisLabel, {
            normalSettings: {
              horizontal,
              yAxis,
              width: totalWidth,
              yAxisHeight,
              showTopScope
            },
            labelSettings: rightLabelSettings,
            animationSettings: animationSettings.axisYLabelSettings
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_drawXAxisGridLine.DrawXAxisGridLine, {
            normalSettings: {
              xAxis,
              horizontal,
              width: totalWidth,
              height: totalHeight,
              padding,
              xAxisInitialPosition,
              xAxisWidth
            },
            lineSettings: axisXGridLineSettings,
            animationSettings: animationSettings.axisXGridLineSettings
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawXAxisLabel.DrawXAxisLabel, {
            normalSettings: {
              xAxis,
              horizontal,
              height: totalHeight,
              padding,
              xAxisInitialPosition,
              xAxisWidth
            },
            labelSettings: bottomLabelSettings,
            animationSettings: animationSettings.axisXLabelSettings
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawXAxisLabel.DrawXAxisLabel, {
            normalSettings: {
              xAxis,
              horizontal,
              height: totalHeight,
              padding,
              xAxisInitialPosition,
              xAxisWidth
            },
            labelSettings: topLabelSettings,
            animationSettings: animationSettings.axisXLabelSettings
          })]
        }), children]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_drawLegends.DrawLegends, {
        keys: keys,
        normalSettings: {
          width,
          height,
          margin,
          colorPalette
        },
        legendSettings: legendSettings
      })]
    })
  });
};
exports.LabelValueCommon = LabelValueCommon;