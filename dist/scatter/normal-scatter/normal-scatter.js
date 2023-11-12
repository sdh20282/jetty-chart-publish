"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalScatter = void 0;
var _react = require("react");
var _checkPointException = require("../../common/scatter-common/exception/check-point-exception");
var _labelValueCommon = require("../../components/label-value-common/label-value-common");
var _calculateScope = require("../../common/utils/scope/calculate-scope");
var _calculatePointPosition = require("../../common/scatter-common/utils/calculate-point-position");
var _jsxRuntime = require("react/jsx-runtime");
function CircleWithTooltip(_ref) {
  let {
    x,
    y,
    xPos,
    yPos,
    group,
    pointSize,
    groupColor,
    pointBorderWidth,
    tooltipOn,
    xName,
    yName,
    xLegend,
    yLegend,
    pointStyle
  } = _ref;
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const tooltipStyle = {
    fontSize: "10px",
    backgroundColor: "blue",
    color: "black",
    padding: "5px",
    borderRadius: "5px",
    position: "absolute",
    top: "".concat(yPos, "px"),
    left: "".concat(xPos, "px"),
    zIndex: "9999"
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    transform: "translate(".concat(xPos, ",").concat(yPos, ")"),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      style: pointStyle,
      cx: 0,
      cy: 0,
      r: pointSize,
      fill: groupColor,
      stroke: groupColor,
      strokeWidth: pointBorderWidth
    }), tooltipOn && showTooltip && /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
      style: tooltipStyle,
      children: "".concat(group.id, ", ").concat(xName ? xName : xLegend ? xLegend : "x", ": ").concat(x.toFixed(1), ", ").concat(yName ? yName : yLegend ? yLegend : "y", ": ").concat(y.toFixed(1))
    })]
  });
}
const NormalScatter = _ref2 => {
  let {
    data,
    xLegend,
    yLegend,
    normalSettings,
    scopeSettings,
    legendSettings,
    leftLegendSettings,
    rightLegendSettings,
    bottomLegendSettings,
    topLegendSettings,
    axisXGridLineSettings,
    axisYGridLineSettings,
    leftLabelSettings,
    rightLabelSettings,
    bottomLabelSettings,
    topLabelSettings,
    pointSettings,
    animationSettings
  } = _ref2;
  const result = (0, _checkPointException.checkNormalPoint)({
    normalSettings,
    scopeSettings,
    legendSettings,
    leftLegendSettings,
    rightLegendSettings,
    bottomLegendSettings,
    topLegendSettings,
    axisXGridLineSettings,
    axisYGridLineSettings,
    leftLabelSettings,
    rightLabelSettings,
    bottomLabelSettings,
    topLabelSettings,
    pointSettings,
    animationSettings
  });
  const {
    width,
    height,
    margin,
    padding,
    xReverse,
    yReverse,
    colorPalette
  } = result.normalSettings;
  const {
    xAutoScope,
    yAutoScope,
    xMaxScope,
    xMinScope,
    yMaxScope,
    yMinScope
  } = result.scopeSettings;
  const xScopeResult = xAutoScope ? (0, _calculateScope.getAutoScope)({
    data: data.flatMap(group => group.data.map(item => item.x))
  }) : (0, _calculateScope.getUserScope)({
    maxScope: xMaxScope,
    minScope: xMinScope
  });
  const yScopeResult = yAutoScope ? (0, _calculateScope.getAutoScope)({
    data: data.flatMap(group => group.data.map(item => item.y))
  }) : (0, _calculateScope.getUserScope)({
    maxScope: yMaxScope,
    minScope: yMinScope
  });
  const {
    pointSize,
    tooltipOn,
    xName,
    yName,
    pointRenderTime
  } = result.pointSettings;
  if (!xReverse) {
    xScopeResult.scope.reverse();
  }
  if (yReverse) {
    yScopeResult.scope.reverse();
  }
  const totalWidth = width - margin.left - margin.right;
  const totalHeight = height - margin.bottom - margin.top;
  const drawWidth = totalWidth - padding - padding;
  const lineHeight = totalHeight / (yScopeResult.scope.length - 1);
  const AreaWidth = drawWidth / (xScopeResult.scope.length - 1);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_labelValueCommon.LabelValueCommon, {
    data: data,
    keys: data.map(d => d.id),
    xAxis: xScopeResult.scope,
    yAxis: yScopeResult.scope,
    xLegend: xLegend,
    yLegend: yLegend,
    normalSettings: {
      ...result.normalSettings,
      // xScope: newGridX.scope,
      totalWidth,
      totalHeight,
      xAxisWidth: AreaWidth,
      yAxisHeight: lineHeight
    },
    axisXGridLineSettings: result.axisXGridLineSettings,
    axisYGridLineSettings: result.axisYGridLineSettings,
    leftLabelSettings: result.leftLabelSettings,
    rightLabelSettings: result.rightLabelSettings,
    bottomLabelSettings: result.bottomLabelSettings,
    topLabelSettings: result.topLabelSettings,
    legendSettings: result.legendSettings,
    leftLegendSettings: result.leftLegendSettings,
    rightLegendSettings: result.rightLegendSettings,
    bottomLegendSettings: result.bottomLegendSettings,
    topLegendSettings: result.topLegendSettings,
    animationSettings: result.animationSettings,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: "translate(".concat(padding, ")"),
      children: data.flatMap((group, groupIdx) => {
        // 그룹에 색상 할당
        const groupColor = colorPalette[groupIdx % colorPalette.length];
        const [opacity, setOpacity] = (0, _react.useState)(0);
        (0, _react.useEffect)(() => {
          const timeout = setTimeout(() => {
            setOpacity(1);
          }, groupIdx * 1000 * pointRenderTime);
          return () => {
            clearTimeout(timeout);
            setOpacity(0);
          };
        }, [data]);
        const pointStyle = {
          opacity
        };
        return group.data.map((item, idx) => {
          const xPos = (0, _calculatePointPosition.calculateXPosition)(item.x, xScopeResult, totalWidth, xReverse);
          const yPos = (0, _calculatePointPosition.calculateYPosition)(item.y, yScopeResult, totalHeight, yReverse);
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(CircleWithTooltip, {
            xPos: xPos // 점이 찍히는 X 위치
            ,
            yPos: yPos // 점이 찍히는 Y 위치
            ,
            x: item.x // X좌표
            ,
            y: item.y // Y좌표
            ,
            group: {
              id: group.id
            },
            pointSize: pointSize,
            groupColor: groupColor,
            tooltipOn: tooltipOn,
            xName: xName,
            yName: yName,
            xLegend: xLegend,
            yLegend: yLegend,
            groupIdx: groupIdx,
            pointStyle: pointStyle
          }, "data-" + groupIdx + idx);
        });
      })
    })
  });
};
exports.NormalScatter = NormalScatter;