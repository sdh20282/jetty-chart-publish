"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawLegends = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const DrawLegends = _ref => {
  let {
    keys,
    normalSettings: {
      width,
      height,
      margin,
      colorPalette
    },
    legendSettings: {
      useLegend,
      position,
      xLocation,
      yLocation,
      directionColumn,
      itemWidth,
      itemMargin,
      symbolSize,
      symbolRadius,
      symbolMargin,
      symbolOpacity,
      legendSize,
      legendWeight,
      legendOpacity,
      legendColor,
      legendOnStart
    }
  } = _ref;
  if (!keys || keys.length === 0) {
    return;
  }
  const yAxis = position.split("-")[0];
  const xAxis = position.split("-")[1];
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const legendHeight = symbolSize * keys.length + itemMargin * (keys.length - 1);
  return useLegend && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    transform: "translate(".concat((xAxis === "left" ? 0 : xAxis === "center" ? margin.left + chartWidth / 2 - itemWidth / 2 : chartWidth + margin.left) + xLocation, ",").concat((yAxis === "top" ? margin.top : yAxis === "center" ? margin.top + chartHeight / 2 - legendHeight / 2 : chartHeight + margin.top - legendHeight) + yLocation, ")"),
    children: keys.map((k, idx) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: directionColumn ? "translate(0,".concat((symbolSize + itemMargin) * idx, ")") : "translate(".concat((itemWidth + itemMargin) * idx, ")"),
        width: itemWidth - symbolSize - symbolMargin,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          width: symbolSize,
          height: symbolSize,
          opacity: symbolOpacity,
          fill: colorPalette[idx % colorPalette.length],
          rx: symbolRadius,
          ry: symbolRadius,
          transform: "translate(0,0)"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          fontSize: legendSize,
          fontWeight: legendWeight,
          fill: legendColor,
          opacity: legendOpacity,
          dominantBaseline: "middle",
          textAnchor: legendOnStart ? "start" : "end",
          transform: "translate(".concat(legendOnStart ? symbolSize + symbolMargin : itemWidth, ",").concat(symbolSize / 2, ")"),
          children: k
        })]
      }, k + String(idx));
    })
  });
};
exports.DrawLegends = DrawLegends;