"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiLine = void 0;
var _checkLineException = require("../../common/line-common/exception/check-line-exception");
var _labelValueCommon = require("../../components/label-value-common/label-value-common");
var _calculateScope = require("../../common/utils/scope/calculate-scope");
var _calulateCurve = require("../../common/line-common/utils/calulate-curve");
var _lineModule = _interopRequireDefault(require("../common/line.module.css"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MultiLine = _ref => {
  var _dataSet$;
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
  const dataSet = data;
  if (!dataSet || dataSet.length === 0) {
    return;
  }
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
  const {
    width,
    height,
    margin,
    padding,
    reverse,
    horizontal
  } = result.normalSettings;
  const {
    autoScope,
    maxScope,
    minScope,
    showTopScope
  } = result.scopeSettings;
  const {
    lineOpacity,
    lineWidth,
    enablePoint,
    pointColor,
    pointColorFollowLineColor,
    pointSize,
    pointBorderColor,
    pointBorderColorFollowLineColor,
    pointBorderWidth,
    enablePointLabel,
    showLabelOnHover,
    pointLabelColor,
    pointLabelSize,
    pointLabelOffsetX,
    pointLabelOffsetY,
    pointLabelWeight,
    enableArea,
    areaOpacity,
    enableCurve,
    smoothDegree,
    angleDegree,
    strokeLinejoin,
    strokeLinecap
  } = result.lineSettings;
  let combinedData = [];
  const idArray = [];
  dataSet.forEach(element => {
    combinedData = combinedData.concat(element.data);
    idArray.push(element.id);
  });
  const scopeResult = autoScope ? (0, _calculateScope.getAutoScope)({
    data: combinedData.map(d => d.value)
  }) : (0, _calculateScope.getUserScope)({
    maxScope,
    minScope
  });
  if (reverse) {
    scopeResult.scope.reverse();
  }
  const dataLength = (_dataSet$ = dataSet[0]) === null || _dataSet$ === void 0 || (_dataSet$ = _dataSet$.data) === null || _dataSet$ === void 0 ? void 0 : _dataSet$.length;
  const dataSetLastIdx = dataSet.length - 1;
  const totalWidth = horizontal ? height - margin.bottom - margin.top : width - margin.left - margin.right;
  const totalHeight = horizontal ? width - margin.left - margin.right : height - margin.bottom - margin.top;
  const drawWidth = totalWidth - padding - padding;
  const lineHeight = totalHeight / (scopeResult.scope.length - 1);
  const areaWidth = drawWidth / dataLength;
  const pointGapWidth = drawWidth / (dataLength - 1);
  const halfAreaWidth = areaWidth / 2;
  const zeroHeight = scopeResult.scope.reduce((acc, cur) => {
    if (cur !== 0) {
      acc += 1;
    }
    if (cur === 0) {
      acc = 0;
    }
    return acc;
  }, 0) * lineHeight;
  const zeroHeightFromTop = totalHeight - zeroHeight;
  const dataSetCoords = [];
  dataSet.forEach(element => {
    const coords = element.data.map((element, idx) => {
      const nowData = {
        ...element
      };
      if (reverse) {
        nowData.value = -nowData.value;
      }
      const center = pointGapWidth * idx;
      const height = nowData.value / (scopeResult.maxScope - scopeResult.minScope) * totalHeight;
      if (horizontal) {
        return [zeroHeight + height, center];
      }
      return [center, totalHeight - height - zeroHeight];
    });
    dataSetCoords.push(coords);
  });
  let linePathArray = [];
  const lastPoints = [];
  const startZeroPoints = [];
  const endZeroPoints = [];
  dataSetCoords.forEach(coords => {
    let pathString = "";
    let lastPoint = "";
    if (enableCurve) {
      pathString = coords.reduce((acc, curr, idx, arr) => {
        const isFirstPoint = idx === 0;
        if (isFirstPoint) return acc + "".concat(curr[0], ",").concat(curr[1]);
        const [cpsX, cpsY] = (0, _calulateCurve.getControlPoint)(arr[idx - 2], arr[idx - 1], curr, {
          smoothDegree,
          angleDegree,
          isEndControlPoint: false
        });
        const [cpeX, cpeY] = (0, _calulateCurve.getControlPoint)(arr[idx - 1], curr, arr[idx + 1], {
          smoothDegree,
          angleDegree,
          isEndControlPoint: true
        });
        if (idx === arr.length - 1) {
          lastPoint = "C  ".concat(curr[0], " ").concat(curr[1], " ").concat(curr[0], " ").concat(curr[1], " ").concat(curr[0], " ").concat(curr[1]);
        }
        return "".concat(acc, " C ").concat(cpsX, ", ").concat(cpsY, ", ").concat(cpeX, ", ").concat(cpeY, " ").concat(curr[0], ", ").concat(curr[1]);
      }, "");
    } else {
      pathString = coords.reduce((acc, curr, idx) => {
        const isFirstPoint = idx === 0;
        let tempPath = "";
        if (idx === coords.length - 1) lastPoint = "L ".concat(curr[0], " ").concat(curr[1]);
        if (!isFirstPoint) tempPath += " L";
        tempPath += " ".concat(curr[0], " ").concat(curr[1]);
        return acc + tempPath;
      }, "");
    }
    startZeroPoints.push(horizontal ? "M ".concat(zeroHeight, " ", 0, " L") : "M ".concat(0, " ", zeroHeightFromTop, " L"));
    endZeroPoints.push(horizontal ? "L ".concat(zeroHeight, " ").concat(drawWidth) : "L ".concat(drawWidth, " ").concat(zeroHeightFromTop));
    linePathArray.push(pathString);
    lastPoints.push(lastPoint);
  });
  const {
    useAnimation,
    useGridAnimation,
    renderReverse,
    translateReverse
  } = result.animationSettings.generalSettings;
  const {
    useLineAnimation,
    lineRenderType,
    lineRenderDuration,
    lineRenderStartDelay,
    lineRenderItemDelay,
    lineRenderTimingFunction,
    translateLine,
    translateLineItemDelay,
    translateLineDuration,
    translateLineStartDelay,
    translateLineTimingFunction
  } = result.animationSettings.lineSettings;
  const {
    usePointAnimation,
    pointRenderType,
    pointRenderDuration,
    pointLineRenderDuration,
    pointRenderStartDelay,
    pointRenderItemDelay,
    pointRenderTimingFunction,
    translatePoint,
    translatePointItemDelay,
    translatePointDuration,
    translatePointStartDelay,
    translatePointTimingFunction
  } = result.animationSettings.pointSettings;
  const {
    useAreaAnimation,
    areaRenderType,
    areaRenderDuration,
    areaRenderStartDelay,
    areaRenderItemDelay,
    areaRenderTimingFunction,
    translateArea,
    translateAreaItemDelay,
    translateAreaDuration,
    translateAreaStartDelay,
    translateAreaTimingFunction
  } = result.animationSettings.areaSettings;
  if (!useGridAnimation) {
    result.animationSettings.axisYGridLineSettings = {
      ...result.animationSettings.axisYGridLineSettings,
      useAnimation: useGridAnimation
    };
    result.animationSettings.axisXGridLineSettings = {
      ...result.animationSettings.axisXGridLineSettings,
      useAnimation: useGridAnimation
    };
    result.animationSettings.axisYLabelSettings = {
      ...result.animationSettings.axisYLabelSettings,
      useAnimation: useGridAnimation
    };
    result.animationSettings.axisXLabelSettings = {
      ...result.animationSettings.axisXLabelSettings,
      useAnimation: useGridAnimation
    };
  }
  const prevPath = (0, _react.useRef)({});
  const nowPath = (0, _react.useRef)({});
  const pathRefs = (0, _react.useRef)([]);
  if (useAnimation) {
    prevPath.current = {
      ...nowPath.current
    };
    nowPath.current = [];
  }
  const isChanged = useAnimation && prevPath.current.dataLength != undefined;
  const useTranslateLine = translateLine && isChanged;
  const useTranslatePoint = translatePoint && isChanged;
  const useTranslateArea = translateArea && isChanged;
  nowPath.current = {
    dataLength,
    dataSetLength: dataSet.length,
    linePathArray,
    lastPoints,
    startZeroPoints,
    endZeroPoints
  };
  const pointPosition = [];
  const prevPoints = (0, _react.useRef)({});
  const prevPointTemp = (0, _react.useRef)([]);
  if (useAnimation) {
    prevPoints.current = {
      ...prevPointTemp.current
    };
  }
  dataSet.forEach((data, index) => {
    data.data.forEach((d, idx) => {
      const nowData = {
        ...d
      };
      if (reverse) {
        nowData.value = -nowData.value;
      }
      const positionX = pointGapWidth * idx;
      const height = nowData.value / (scopeResult.maxScope - scopeResult.minScope) * totalHeight;
      const pos = {
        x: positionX,
        y: totalHeight - height - zeroHeight,
        horizontalX: zeroHeight + height,
        horizontalY: positionX,
        animationDelay: pointRenderStartDelay + (renderReverse ? dataSetLastIdx - index : index) * pointRenderItemDelay + idx * pointLineRenderDuration / dataLength,
        value: d.value
      };
      pointPosition["".concat(idx, "-").concat(index)] = pos;
    });
  });
  prevPointTemp.current = {
    ...pointPosition
  };
  const lineColors = [...Array(dataSet.length).keys()].map(idx => [...result.normalSettings.colorPalette][idx % result.normalSettings.colorPalette.length]);
  const ms = new Date().valueOf();
  const diffLength = dataLength - prevPath.current.dataLength;
  if (diffLength > 0) {
    prevPath.current.linePathArray.forEach((pathString, idx) => {
      for (let i = 0; i < diffLength; i++) {
        prevPath.current.linePathArray[idx] += prevPath.current.lastPoints[idx];
      }
    });
  } else if (diffLength < 0) {
    linePathArray = linePathArray.map((pathString, idx) => {
      let temp = pathString;
      for (let i = 0; i < -diffLength; i++) {
        temp += lastPoints[idx];
      }
      return temp;
    });
  }
  let areaPathArray = linePathArray.map((pathString, idx) => {
    return startZeroPoints[idx] + pathString + endZeroPoints[idx];
  });
  nowPath.current.areaPathArray = areaPathArray;
  (0, _react.useEffect)(() => {
    var _pathRefs$current;
    (_pathRefs$current = pathRefs.current) === null || _pathRefs$current === void 0 || _pathRefs$current.forEach(pathElement => {
      const pathLength = pathElement === null || pathElement === void 0 ? void 0 : pathElement.getTotalLength();
      pathElement === null || pathElement === void 0 || pathElement.style.setProperty("--line-length", "".concat(pathLength, "px"));
      pathElement === null || pathElement === void 0 || pathElement.style.setProperty("--line-offset", "".concat(pathLength, "px"));
    });
    pathRefs.current = [];
  }, [pathRefs.current]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_labelValueCommon.LabelValueCommon, {
    keys: idArray,
    xAxis: dataSet[0].data.map(d => d.label),
    yAxis: scopeResult.scope,
    xLegend: xLegend,
    yLegend: yLegend,
    normalSettings: {
      ...result.normalSettings,
      totalWidth,
      totalHeight,
      xAxisInitialPosition: 0,
      xAxisWidth: pointGapWidth,
      yAxisHeight: lineHeight,
      showTopScope
    },
    axisXGridLineSettings: result.axisXGridLineSettings,
    axisYGridLineSettings: result.axisYGridLineSettings,
    leftLabelSettings: result.leftLabelSettings,
    rightLabelSettings: result.rightLabelSettings,
    bottomLabelSettings: result.bottomLabelSettings,
    topLabelSettings: result.topLabelSettings,
    leftLegendSettings: result.leftLegendSettings,
    rightLegendSettings: result.rightLegendSettings,
    bottomLegendSettings: result.bottomLegendSettings,
    topLegendSettings: result.topLegendSettings,
    legendSettings: result.legendSettings,
    animationSettings: result.animationSettings,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      transform: horizontal ? "translate(0,".concat(padding, ")") : "translate(".concat(padding, ")"),
      className: _lineModule.default.container,
      children: [enableArea && areaPathArray.map((d, idx) => {
        var _prevPath$current, _prevPath$current2, _prevPath$current3;
        const useMove = useTranslateArea && prevPath.current.dataSetLength > idx;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("mask", {
              id: "mask-multi-".concat(ms, "-").concat(idx),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
                className: useMove ? "".concat(_lineModule.default.moveLine) : "",
                d: d,
                fill: lineColors[idx],
                strokeLinejoin: strokeLinejoin,
                strokeLinecap: strokeLinecap,
                style: {
                  "--prev-path": "\"".concat(useMove ? ((_prevPath$current = prevPath.current) === null || _prevPath$current === void 0 ? void 0 : _prevPath$current.startZeroPoints[idx]) + ((_prevPath$current2 = prevPath.current) === null || _prevPath$current2 === void 0 ? void 0 : _prevPath$current2.linePathArray[idx]) + ((_prevPath$current3 = prevPath.current) === null || _prevPath$current3 === void 0 ? void 0 : _prevPath$current3.endZeroPoints[idx]) : "", "\""),
                  "--curr-path": "\"".concat(d, "\""),
                  "--animation-duration": "".concat(useMove ? translateAreaDuration : areaRenderDuration, "s"),
                  "--animation-timing-function": useMove ? translateAreaTimingFunction : areaRenderTimingFunction,
                  "--animation-delay": "".concat(useMove ? translateAreaStartDelay + (translateReverse ? dataSetLastIdx - idx : idx) * translateAreaItemDelay : areaRenderStartDelay + (renderReverse ? dataSetLastIdx - idx : idx) * areaRenderItemDelay, "s")
                }
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            mask: "url(#mask-multi-".concat(ms, "-").concat(idx, ")"),
            x: 0,
            y: 0,
            rx: 0,
            ry: 0,
            width: width,
            height: height,
            className: useMove ? _lineModule.default.moveArea : useAreaAnimation && useAnimation ? areaRenderType === "draw" ? horizontal ? _lineModule.default.drawAreaHoriziontal : _lineModule.default.drawArea : areaRenderType === "fade" ? _lineModule.default.fade : "" : "",
            fill: lineColors[idx],
            fillOpacity: enableArea ? areaOpacity : 0,
            style: {
              "--line-width": "".concat(totalWidth, "px"),
              "--line-heght": "".concat(totalHeight, "px"),
              "--animation-duration": "".concat(areaRenderDuration, "s"),
              "--animation-timing-function": areaRenderTimingFunction,
              "--animation-delay": "".concat(areaRenderStartDelay + (renderReverse ? dataSetLastIdx - idx : idx) * areaRenderItemDelay, "s")
            }
          })]
        }, "area-multi-".concat(ms, "-").concat(idx));
      }), linePathArray.map((pathString, idx) => {
        const useMove = useTranslateLine && prevPath.current.startZeroPoints.length > idx;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          ref: el => {
            pathRefs.current[idx] = el;
          },
          d: "M" + pathString,
          className: useMove ? "".concat(_lineModule.default.moveLine) : useLineAnimation && useAnimation ? lineRenderType === "draw" ? "".concat(_lineModule.default.drawLine) : lineRenderType === "fade" ? _lineModule.default.fade : "" : "",
          stroke: lineColors[idx],
          strokeWidth: lineWidth,
          strokeOpacity: lineOpacity,
          strokeLinejoin: strokeLinejoin,
          strokeLinecap: strokeLinecap,
          fillOpacity: 0,
          style: {
            "--prev-path": "\"".concat(useMove ? "M " + prevPath.current.linePathArray[idx] : " ", "\""),
            "--curr-path": "\"".concat("M " + pathString, "\""),
            "--animation-duration": "".concat(useMove ? translateLineDuration : lineRenderDuration, "s"),
            "--animation-timing-function": useMove ? translateLineTimingFunction : lineRenderTimingFunction,
            "--animation-delay": "".concat(useMove ? translateLineStartDelay + (translateReverse ? dataSetLastIdx - idx : idx) * translateLineItemDelay : lineRenderStartDelay + (renderReverse ? dataSetLastIdx - idx : idx) * lineRenderItemDelay, "s")
          }
        }, "line-multi-".concat(ms, "-").concat(idx));
      })]
    }), Object.keys(pointPosition).map(key => {
      var _prevPoints$current$k, _prevPoints$current$k2, _prevPoints$current$k3, _prevPoints$current$k4;
      const [idx, index] = key.split("-");
      const useMove = useTranslatePoint && prevPath.current.startZeroPoints.length > index && prevPath.current.dataLength > idx;
      const d = pointPosition[key];
      let startXoffset = useMove ? horizontal ? (_prevPoints$current$k = prevPoints.current[key]) === null || _prevPoints$current$k === void 0 ? void 0 : _prevPoints$current$k.horizontalX : (_prevPoints$current$k2 = prevPoints.current[key]) === null || _prevPoints$current$k2 === void 0 ? void 0 : _prevPoints$current$k2.x : horizontal ? d.horizontalX : d.x;
      let startYoffset = useMove ? horizontal ? (_prevPoints$current$k3 = prevPoints.current[key]) === null || _prevPoints$current$k3 === void 0 ? void 0 : _prevPoints$current$k3.horizontalY : (_prevPoints$current$k4 = prevPoints.current[key]) === null || _prevPoints$current$k4 === void 0 ? void 0 : _prevPoints$current$k4.y : horizontal ? d.horizontalY : d.y;
      if (useMove && prevPoints.current[key]) {
        var _startXoffset, _startYoffset;
        let lastPos = prevPoints.current[key];
        (_startXoffset = startXoffset) !== null && _startXoffset !== void 0 ? _startXoffset : startXoffset = horizontal ? lastPos.horizontalX : lastPos.x;
        (_startYoffset = startYoffset) !== null && _startYoffset !== void 0 ? _startYoffset : startYoffset = horizontal ? lastPos.horizontalY : lastPos.y;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        className: useMove ? _lineModule.default.movePoint : usePointAnimation && useAnimation ? pointRenderType === "draw" ? _lineModule.default.drawPoint : pointRenderType === "fade" ? _lineModule.default.fade : "" : "",
        transform: horizontal ? "translate(".concat(d.horizontalX, ",").concat(d.x + padding, ")") : "translate(".concat(d.horizontalY + padding, ",").concat(d.y, ")"),
        style: {
          "--pos-x": "".concat(horizontal ? d.horizontalX : d.x, "px"),
          "--pos-y": "".concat(horizontal ? d.horizontalY : d.y, "px"),
          "--start-x-offset": "".concat(useMove ? startXoffset : horizontal ? d.horizontalX : d.x, "px"),
          "--start-y-offset": "".concat(useMove ? startYoffset : horizontal ? d.horizontalY : d.y, "px"),
          "--animation-duration": "".concat(useMove ? translatePointDuration : pointRenderDuration, "s"),
          "--animation-timing-function": useMove ? translatePointTimingFunction : pointRenderTimingFunction,
          "--animation-delay": "".concat(useMove ? translatePointStartDelay + (translateReverse ? dataSetLastIdx - index : index) * translatePointItemDelay : d.animationDelay, "s")
        },
        children: enablePoint && /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          cx: 0,
          cy: 0,
          r: pointSize,
          fill: pointColorFollowLineColor ? lineColors[index] : pointColor,
          stroke: pointBorderColorFollowLineColor ? lineColors[index] : pointBorderColor,
          strokeWidth: pointBorderWidth
        })
      }, "point-".concat(ms, "-").concat(index, "-").concat(idx));
    }), enablePointLabel && Array.apply(null, Array(dataLength)).map((temp, idx) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        style: {
          opacity: showLabelOnHover ? 0 : 1,
          transition: "all 0.3s ease"
        },
        children: [Array.apply(null, Array(dataSet.length)).map((d, index) => {
          d = pointPosition["".concat(idx, "-").concat(index)];
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
            transform: horizontal ? "translate(".concat(pointLabelOffsetX + d.horizontalX, ",").concat(halfAreaWidth + pointLabelOffsetY + d.horizontalY, ")") : "translate(".concat(pointLabelOffsetX + d.x, ",").concat(pointLabelOffsetY + d.y, ")"),
            opacity: 1,
            dominantBaseline: "alphabetic",
            textAnchor: "middle",
            style: {
              position: "relative",
              transform: horizontal ? "translate(".concat(pointLabelOffsetX + d.horizontalX, ",").concat(halfAreaWidth + pointLabelOffsetY + d.horizontalY, ")") : "translate(".concat(pointLabelOffsetX + d.x, ",").concat(pointLabelOffsetY + d.y, ")")
            },
            fontSize: pointLabelSize,
            fontWeight: pointLabelWeight,
            fill: pointLabelColor ? pointLabelColor : lineColors[index],
            children: d.value
          }, "text-".concat(d.value, "-").concat(idx));
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: 0,
          y: 0,
          width: horizontal ? totalHeight : pointGapWidth,
          height: horizontal ? pointGapWidth : totalHeight,
          strokeWidth: 0,
          opacity: 0,
          transform: horizontal ? "translate(".concat(0, ",", pointGapWidth * idx - pointGapWidth / 2 + padding, ")") : "translate(".concat(pointGapWidth * idx - pointGapWidth / 2 + padding, ",", 0, ")"),
          onMouseEnter: showLabelOnHover ? event => {
            event.currentTarget.parentElement.style.opacity = 1;
          } : null,
          onMouseLeave: showLabelOnHover ? event => {
            event.currentTarget.parentElement.style.opacity = 0;
          } : null
        })]
      }, "debug-".concat(idx));
    })]
  });
};
exports.MultiLine = MultiLine;