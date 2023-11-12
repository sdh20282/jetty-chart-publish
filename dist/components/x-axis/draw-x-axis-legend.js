"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawXAxisLegend = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const DrawXAxisLegend = _ref => {
  let {
    xLegend,
    normalSettings: {
      totalWidth,
      totalHeight,
      horizontal
    },
    legendSettings: {
      useLegend,
      legendOnBottom,
      legendMargin,
      legendSize,
      legendWeight,
      legendOpacity,
      legendColor,
      legendReverse,
      legendMove
    }
  } = _ref;
  if (!xLegend || !useLegend) {
    return;
  }
  const width = totalWidth / 2 + (horizontal ? -legendMove : legendMove);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    transform: horizontal ? "translate(".concat(legendOnBottom ? -legendMargin : totalHeight + legendMargin, ",").concat(width, ")") : "translate(".concat(width, ",").concat(legendOnBottom ? totalHeight + legendMargin : -legendMargin, ")"),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
      fontSize: legendSize,
      fontWeight: legendWeight,
      fill: legendColor,
      opacity: legendOpacity,
      dominantBaseline: "middle",
      textAnchor: "middle",
      transform: horizontal ? "rotate(".concat(legendReverse ? 90 : -90, ")") : "rotate(".concat(legendReverse ? 180 : 0, ")"),
      children: xLegend
    })
  });
};
exports.DrawXAxisLegend = DrawXAxisLegend;