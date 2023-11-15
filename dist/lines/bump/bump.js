"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BumpChart = void 0;
var _checkBumpException = require("../../common/line-common/exception/check-bump-exception");
var _labelValueCommon = require("../../components/label-value-common/label-value-common");
var _bumpModule = _interopRequireDefault(require("./bump.module.css"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BumpChart = _ref => {
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
  // 데이터 셋으로 랭킹 재정의
  // 왼쪽에 랭킹 숫자 전부 표시
  // 라벨 붙이지 말고 선 연장해서 선 끝에 표시

  // console.log(dataSet);

  const result = (0, _checkBumpException.checkNormalBump)({
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
  result.normalSettings.padding += result.lineSettings.xOuterPadding;
  const {
    width,
    height,
    margin,
    padding,
    reverse,
    horizontal
  } = result.normalSettings;
  const {
    showTopScope
  } = result.scopeSettings;
  const {
    lineOpacity,
    lineWidth,
    enablePoint,
    pointSize,
    pointColor,
    pointColorFollowLineColor,
    pointBorderColorFollowLineColor,
    pointBorderColor,
    pointBorderWidth,
    // enablePointLabel,
    // showLabelOnHover,
    // pointLabelColor,
    // pointLabelSize,
    // pointLabelOffsetX,
    // pointLabelOffsetY,
    // pointLabelWeight,
    enableArea,
    areaOpacity,
    enableCurve,
    strokeLinejoin,
    strokeLinecap,
    // xPadding,
    xOuterPadding
    // yOuterPadding,
    // activeLineWidth,
    // inactiveLineWidth,
    // activeOpacity,
    // inactiveOpacity,
    // startLabel,
  } = result.lineSettings;
  const colorPalette = [...result.normalSettings.colorPalette];

  // console.log(xPadding, xOuterPadding, yOuterPadding, activeLineWidth, inactiveLineWidth, activeOpacity, inactiveOpacity, startLabel);

  let combinedData = [];
  const idArray = [];
  dataSet.forEach(element => {
    combinedData = combinedData.concat(Object.keys(element.data).map(el => el.value));
    idArray.push(element.id);
  });
  const scopeResult = {
    scope: [...new Array(dataSet.length)].map((_, i) => i + 1),
    maxScope: dataSet.length,
    minScope: 1
  };
  if (reverse) {
    scopeResult.scope.reverse();
  }
  const dataLength = (_dataSet$ = dataSet[0]) === null || _dataSet$ === void 0 || (_dataSet$ = _dataSet$.data) === null || _dataSet$ === void 0 ? void 0 : _dataSet$.length;
  const totalWidth = horizontal ? height - margin.bottom - margin.top : width - margin.left - margin.right;
  const totalHeight = horizontal ? width - margin.left - margin.right : height - margin.bottom - margin.top;
  const drawWidth = totalWidth - padding - padding;
  const lineHeight = totalHeight / (scopeResult.scope.length - 1);
  const pointGapWidth = drawWidth / (dataLength - 1);
  const zeroHeight = 0;
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
      const height = (dataSet.length - nowData.value) / (scopeResult.maxScope - scopeResult.minScope) * totalHeight;
      if (horizontal) {
        return [height, center];
      }
      return [center, totalHeight - height];
    });
    dataSetCoords.push(coords);
  });
  const linePathArray = [];
  const areaPathArray = [];
  dataSetCoords.forEach(coords => {
    let pathString = "";
    let areaPathString = "";
    if (enableCurve) {
      pathString = coords.reduce((acc, curr, idx, arr) => {
        const isFirstPoint = idx === 0;
        if (isFirstPoint) return acc + "".concat(curr[0] - xOuterPadding, ",").concat(curr[1], " L ").concat(curr[0], ",").concat(curr[1]);
        // console.log(getControlPoint.length, smoothDegree, angleDegree);

        // const [cpsX, cpsY] = getControlPoint(arr[idx - 2], arr[idx - 1], curr, { smoothDegree, angleDegree, isEndControlPoint: false });
        // const [cpeX, cpeY] = getControlPoint(arr[idx - 1], curr, arr[idx + 1], { smoothDegree, angleDegree, isEndControlPoint: true });

        const midX = (arr[idx - 1][0] + curr[0]) / 2;
        const [cpsX, cpsY] = [midX, arr[idx - 1][1]];
        const [cpeX, cpeY] = [midX, curr[1]];
        return "".concat(acc, " C ").concat(cpsX, ", ").concat(cpsY, ", ").concat(cpeX, ", ").concat(cpeY, " ").concat(curr[0], ", ").concat(curr[1]);
      }, "");
    } else {
      pathString = coords.reduce((acc, curr, idx) => {
        const isFirstPoint = idx === 0;
        if (isFirstPoint) return " ".concat(curr[0] - xOuterPadding, " ").concat(curr[1], " L ").concat(curr[0], " ").concat(curr[1]);
        return acc + " L ".concat(curr[0], " ").concat(curr[1]);
      }, "");
    }
    if (enableArea) {
      areaPathString = horizontal ? "M ".concat(zeroHeight, " ", 0, " L") + pathString + "L ".concat(zeroHeight, " ").concat(drawWidth) : "M ".concat(0, " ", zeroHeightFromTop, " L") + pathString + "L ".concat(drawWidth, " ").concat(zeroHeightFromTop);
    }
    pathString = "M " + pathString + "L ".concat(coords[coords.length - 1][0] + xOuterPadding, ",").concat(coords[coords.length - 1][1]);
    linePathArray.push(pathString);
    areaPathArray.push(areaPathString);
  });
  const {
    useAnimation,
    appearType,
    appearDuration,
    appearStartDelay,
    appearItemDelay,
    appearTimingFunction
  } = result.animationSettings.lineSettings;
  const pathRefs = (0, _react.useRef)([]);
  const pointPosition = Array.from({
    length: dataLength
  }, () => []);
  dataSet.forEach((data, index) => {
    data.data.forEach((d, idx) => {
      const nowData = {
        ...d
      };
      if (reverse) {
        nowData.value = -nowData.value;
      }
      const positionX = pointGapWidth * idx;
      const height = (dataSet.length - nowData.value) / (scopeResult.maxScope - scopeResult.minScope) * totalHeight;
      pointPosition[idx].push({
        x: positionX,
        y: totalHeight - height - zeroHeight,
        horizontalX: zeroHeight + height,
        horizontalY: positionX,
        animationDelay: appearStartDelay + index * appearItemDelay + idx * appearDuration / dataLength,
        value: d.value
      });
    });
  });
  (0, _react.useEffect)(() => {
    var _pathRefs$current;
    (_pathRefs$current = pathRefs.current) === null || _pathRefs$current === void 0 || _pathRefs$current.forEach(pathElement => {
      const pathLength = pathElement === null || pathElement === void 0 ? void 0 : pathElement.getTotalLength();
      pathElement === null || pathElement === void 0 || pathElement.style.setProperty("--line-length", "".concat(pathLength, "px"));
      pathElement === null || pathElement === void 0 || pathElement.style.setProperty("--line-offset", "".concat(pathLength, "px"));
    });
    pathRefs.current = [];
  }, [pathRefs.current]);
  const lineColors = [...Array(dataSet.length).keys()].map(idx => colorPalette[idx % colorPalette.length]);
  const ms = new Date().valueOf();
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
      className: _bumpModule.default.container,
      children: [enableArea && areaPathArray.map((d, idx) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("mask", {
              id: "mask-multi-".concat(idArray[idx], "-").concat(idx),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
                d: d,
                fill: lineColors[idx]
              })
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            mask: "url(#mask-multi-".concat(idArray[idx], "-").concat(idx, ")"),
            x: 0,
            y: 0,
            rx: 0,
            ry: 0,
            width: horizontal ? totalHeight : 0,
            height: horizontal ? 0 : totalHeight,
            className: useAnimation ? appearType === "draw" ? horizontal ? _bumpModule.default.drawAreaHoriziontal : _bumpModule.default.drawArea : appearType === "fade" ? _bumpModule.default.fadeArea : "" : "",
            fill: lineColors[idx % colorPalette.length],
            fillOpacity: enableArea ? areaOpacity : 0,
            style: {
              "--line-width": "".concat(drawWidth, "px"),
              "--line-heght": "".concat(totalHeight, "px"),
              "--animation-duration": "".concat(appearDuration, "s"),
              "--animation-timing-function": appearTimingFunction,
              "--animation-delay": "".concat(appearStartDelay + idx * appearItemDelay, "s")
            }
          })]
        }, "area-multi-".concat(idArray[idx], "-").concat(idx));
      }), linePathArray.map((d, idx) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          ref: el => {
            pathRefs.current[idx] = el;
          },
          d: d,
          className: useAnimation ? appearType === "draw" ? _bumpModule.default.drawLine : appearType === "fade" ? _bumpModule.default.fadeLine : "" : "",
          stroke: lineColors[idx],
          strokeWidth: lineWidth,
          strokeOpacity: lineOpacity,
          strokeLinejoin: strokeLinejoin,
          strokeLinecap: strokeLinecap,
          fillOpacity: 0,
          style: {
            "--animation-duration": "".concat(appearDuration, "s"),
            "--animation-timing-function": appearTimingFunction,
            "--animation-delay": "".concat(appearStartDelay + idx * appearItemDelay, "s")
          }
        }, "line-multi-".concat(ms, "-").concat(idx));
      })]
    }), enablePoint && pointPosition.map((data, index) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
        transform: horizontal ? "translate(0,".concat(padding, ")") : "translate(".concat(padding, ")"),
        children: data.map((d, idx) => {
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
            className: useAnimation ? appearType === "draw" ? _bumpModule.default.drawPoint : appearType === "fade" ? _bumpModule.default.fadeLine : "" : "",
            transform: horizontal ? "translate(".concat(d.horizontalX, ",").concat(d.x, ")") : "translate(".concat(d.horizontalY, ",").concat(d.y, ")"),
            style: {
              "--pos-x": "".concat(horizontal ? d.horizontalX : d.x, "px"),
              "--pos-y": "".concat(horizontal ? d.horizontalY : d.y, "px"),
              "--start-x-offset": "".concat(horizontal ? d.horizontalX : d.x, "px"),
              "--start-y-offset": "".concat(horizontal ? d.horizontalY : d.y, "px"),
              "--animation-duration": "".concat(appearDuration / dataLength, "s"),
              "--animation-timing-function": appearTimingFunction,
              "--animation-delay": "".concat(d.animationDelay, "s")
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
              cx: 0,
              cy: 0,
              r: pointSize,
              fill: pointColorFollowLineColor ? lineColors[idx] : pointColor,
              stroke: pointBorderColorFollowLineColor ? lineColors[idx] : pointBorderColor,
              strokeWidth: pointBorderWidth
            })
          }, "point-multi-" + idx);
        })
      }, "g-".concat(ms, "-").concat(index));
    })]
  });
};
exports.BumpChart = BumpChart;