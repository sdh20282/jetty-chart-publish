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
const NormalScatter = _ref => {
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
  } = _ref;
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
  const [pointC, setPointC] = (0, _react.useState)({});
  const [showTooltip, setShowTooltip] = (0, _react.useState)(false);
  const [tooltipPosition, setTooltipPosition] = (0, _react.useState)({
    left: 0,
    top: 0
  });
  const handleMouseEnter = (groupName, x, y, xNow, yNow) => {
    setShowTooltip(true);
    setPointC({
      groupName: groupName,
      x: x,
      y: y
    });
    setTooltipPosition({
      left: xNow,
      top: yNow
    });
  };
  const tooltipStyle = {
    fontSize: "10px",
    backgroundColor: "blue",
    color: "black",
    padding: "5px",
    borderRadius: "5px",
    position: "absolute"
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const [opacities, setOpacities] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const timeouts = data.flatMap((group, groupIdx) => {
      return group.data.map(d => {
        return setTimeout(() => {
          setOpacities(prevOpacities => {
            const newOpacities = [...prevOpacities];
            newOpacities[groupIdx] = 1;
            return newOpacities;
          });
        }, groupIdx * pointRenderTime * 1000);
      });
    });
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      setOpacities([]);
    };
  }, [data, pointRenderTime]);
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      transform: "translate(".concat(padding, ")"),
      children: [data.flatMap((group, groupIdx) => {
        // 그룹에 색상 할당
        const groupColor = colorPalette[groupIdx % colorPalette.length];
        const opacity = opacities[groupIdx] || 0;
        const pointStyle = {
          opacity
        };
        return group.data.map((item, idx) => {
          const xPos = (0, _calculatePointPosition.calculateXPosition)(item.x, xScopeResult, totalWidth, xReverse);
          const yPos = (0, _calculatePointPosition.calculateYPosition)(item.y, yScopeResult, totalHeight, yReverse);
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
            transform: "translate(".concat(xPos, ",").concat(yPos, ")"),
            onMouseEnter: () => handleMouseEnter(group.id, item.x, item.y, xPos, yPos),
            onMouseLeave: handleMouseLeave,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
              style: pointStyle,
              cx: 0,
              cy: 0,
              r: pointSize,
              fill: groupColor,
              stroke: groupColor
            })
          }, "data-" + groupIdx + idx);
        });
      }), tooltipOn && showTooltip && /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
        style: {
          ...tooltipStyle,
          transform: "translate(".concat(tooltipPosition.left, "px, ").concat(tooltipPosition.top, "px)")
        },
        children: "".concat(pointC.groupName, ", ").concat(xName ? xName : xLegend ? xLegend : "x", ": ").concat(pointC.x.toFixed(1), ", ").concat(yName ? yName : yLegend ? yLegend : "y", ": ").concat(pointC.y.toFixed(1))
      })]
    })
  });
};
exports.NormalScatter = NormalScatter;