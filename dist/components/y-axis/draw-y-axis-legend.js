"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawYAxisLegend = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const DrawYAxisLegend = _ref => {
  let {
    yLegend,
    normalSettings: {
      totalWidth,
      totalHeight,
      horizontal
    },
    legendSettings: {
      useLegend,
      legendOnLeft,
      legendMargin,
      legendSize,
      legendWeight,
      legendOpacity,
      legendColor,
      legendReverse,
      legendMove
    }
  } = _ref;
  if (!yLegend || !useLegend) {
    return;
  }
  const height = totalHeight / 2 + (horizontal ? legendMove : -legendMove);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    transform: horizontal ? "translate(".concat(height, ",").concat(legendOnLeft ? -legendMargin : totalWidth + legendMargin, ")") : "translate(".concat(legendOnLeft ? -legendMargin : totalWidth + legendMargin, ", ").concat(height, ")"),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
      fontSize: legendSize,
      fontWeight: legendWeight,
      fill: legendColor,
      opacity: legendOpacity,
      dominantBaseline: "middle",
      textAnchor: "middle",
      transform: horizontal ? "rotate(".concat(legendReverse ? 180 : 0, ")") : "rotate(".concat(legendReverse ? 90 : -90, ")"),
      children: yLegend
    })
  });
};
exports.DrawYAxisLegend = DrawYAxisLegend;