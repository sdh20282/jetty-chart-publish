"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawXAxisGridLine = void 0;
var _react = require("react");
var _xAxisGridLineModule = _interopRequireDefault(require("./x-axis-grid-line.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */
const DrawXAxisGridLine = _ref => {
  var _padding, _xAxisInitialPosition;
  let {
    normalSettings: {
      xAxis,
      horizontal,
      width,
      height,
      padding,
      xAxisInitialPosition,
      xAxisWidth
    },
    lineSettings: {
      lineVisible,
      lineOpacity,
      lineColor,
      lineWidth,
      lineDash,
      lineDashWidth,
      lineDashGap,
      lineRound,
      showEndLine
    },
    animationSettings: {
      useAnimation,
      renderType,
      renderDuration,
      renderStartDelay,
      renderItemDelay,
      renderTimingFunction,
      renderStartFrom,
      translateLine,
      translateDuration,
      translateStartDelay,
      translateItemDelay,
      translateTimingFunction
    }
  } = _ref;
  const prevXAxis = (0, _react.useRef)({});
  const prevXAxisTemp = (0, _react.useRef)({});
  const getPath = (0, _react.useCallback)(_ref2 => {
    let {
      location,
      translate
    } = _ref2;
    let linePath = "";
    if (lineDash) {
      let path = horizontal ? "M 0,".concat(location - (useAnimation ? translate : 0), " ") : "M ".concat(location - (useAnimation ? translate : 0), ",0 ");
      let pathLength = 0;
      while (pathLength < height) {
        if (pathLength + lineDashWidth + lineDashGap <= height) {
          path += horizontal ? "h ".concat(lineDashWidth, " m ").concat(lineDashGap, " 0 ") : "v ".concat(lineDashWidth, " m 0 ").concat(lineDashGap, " ");
        } else if (pathLength + lineDashWidth <= height) {
          path += horizontal ? "h ".concat(lineDashWidth) : "v ".concat(lineDashWidth);
        } else {
          path += horizontal ? "h ".concat(height - pathLength) : "v ".concat(height - pathLength);
        }
        pathLength += lineDashWidth + lineDashGap;
      }
      linePath = path;
    } else {
      linePath = horizontal ? "\n        M 0,".concat(location - (useAnimation ? translate : 0), "\n        h ").concat(height, "\n      ") : "\n        M ".concat(location - (useAnimation ? translate : 0), ",0\n        v ").concat(height, "\n      ");
    }
    return linePath;
  }, [horizontal, height, lineDashWidth, lineDashGap]);
  if (!lineVisible) {
    return;
  }
  const animationXAxisStart = renderStartFrom.split("-")[0];
  const animationYAxisStart = renderStartFrom.split("-")[1];
  const ms = new Date().valueOf();
  (_padding = padding) !== null && _padding !== void 0 ? _padding : padding = 0;
  (_xAxisInitialPosition = xAxisInitialPosition) !== null && _xAxisInitialPosition !== void 0 ? _xAxisInitialPosition : xAxisInitialPosition = 0;
  if (translateLine) {
    prevXAxis.current = {
      ...prevXAxisTemp.current
    };
    prevXAxisTemp.current = [];
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: _xAxisGridLineModule.default.container,
    children: [showEndLine && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: horizontal ? "translate(0,0)" : "translate(0,0)",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: getPath({
          location: 0,
          translate: 0
        }),
        stroke: lineColor,
        strokeOpacity: lineOpacity,
        strokeWidth: lineWidth,
        strokeDasharray: lineDash ? "".concat(lineDashWidth, ",").concat(lineDashGap) : 0,
        strokeLinecap: lineRound ? "round" : "",
        className: useAnimation ? renderType === "draw" ? _xAxisGridLineModule.default.drawLine : renderType === "fade" ? _xAxisGridLineModule.default.fadeLine : "" : "",
        style: {
          "--line-width": "".concat(height, "px"),
          "--line-offset": "".concat(lineDash ? -lineDashWidth : !horizontal && animationYAxisStart === "bottom" || horizontal && animationYAxisStart !== "bottom" ? -height : height, "px"),
          "--animation-duration": "".concat(renderDuration, "s"),
          "--animation-timing-function": "ease",
          "--animation-delay": "".concat(renderStartDelay + renderItemDelay * (animationXAxisStart === "left" ? 0 : xAxis.length + 1), "s")
        }
      }, "background-line-x-" + 0 + "-" + 0)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: horizontal ? "translate(0,".concat(padding, ")") : "translate(".concat(padding, ",0)"),
      children: xAxis.map((d, idx) => {
        const x = xAxisWidth * idx + xAxisInitialPosition;
        const nowKey = "x-axis-grid-line-".concat(idx);

        // 현재 위치 정보 저장
        prevXAxisTemp.current[nowKey] = x;

        // 라인 리렌더링을 안할 경우
        let useTranslate = false;
        let translate = 0;
        if (translateLine) {
          // 이전 위치에 현재 위치가 포함되는지 확인
          if (Object.keys(prevXAxis.current).includes(nowKey)) {
            translate = x - prevXAxis.current[nowKey];
            useTranslate = true;
          }
        }
        const linePath = getPath({
          location: x,
          translate
        });
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: linePath,
          stroke: lineColor,
          strokeOpacity: lineOpacity,
          strokeWidth: lineWidth,
          strokeLinecap: lineRound ? "round" : "",
          className: useAnimation ? useTranslate ? _xAxisGridLineModule.default.translateLine : renderType === "draw" ? _xAxisGridLineModule.default.drawLine : renderType === "fade" ? _xAxisGridLineModule.default.fadeLine : "" : "",
          style: {
            "--line-width": "".concat(height, "px"),
            "--line-offset": "".concat(lineDash ? -lineDashWidth : !horizontal && animationYAxisStart === "bottom" || horizontal && animationYAxisStart !== "bottom" ? -height : height, "px"),
            "--animation-duration": "".concat(useTranslate ? translateDuration : renderDuration, "s"),
            "--animation-timing-function": useTranslate ? translateTimingFunction : renderTimingFunction,
            "--animation-delay": "".concat((useTranslate ? translateStartDelay : renderStartDelay) + (useTranslate ? translateItemDelay : renderItemDelay) * (animationXAxisStart === "left" ? idx : xAxis.length - 1 - idx) + (showEndLine && !useTranslate ? renderItemDelay : 0), "s"),
            "--width-offset": horizontal ? "0px,".concat(translate, "px") : "".concat(translate, "px")
          }
        }, "x-axis-grid-line-x-" + ms + "-" + idx);
      })
    }), showEndLine && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: horizontal ? "translate(0,".concat(width, ")") : "translate(".concat(width, ",0)"),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: getPath({
          location: 0,
          translate: 0
        }),
        stroke: lineColor,
        strokeOpacity: lineOpacity,
        strokeWidth: lineWidth,
        strokeDasharray: lineDash ? "".concat(lineDashWidth, ",").concat(lineDashGap) : 0,
        strokeLinecap: lineRound ? "round" : "",
        className: useAnimation ? renderType === "draw" ? _xAxisGridLineModule.default.drawLine : renderType === "fade" ? _xAxisGridLineModule.default.fadeLine : "" : "",
        style: {
          "--line-width": "".concat(height, "px"),
          "--line-offset": "".concat(lineDash ? -lineDashWidth : !horizontal && animationYAxisStart === "bottom" || horizontal && animationYAxisStart !== "bottom" ? -height : height, "px"),
          "--animation-duration": "".concat(renderDuration, "s"),
          "--animation-timing-function": "ease",
          "--animation-delay": "".concat(renderStartDelay + renderItemDelay * (animationXAxisStart === "left" ? xAxis.length + 1 : 0), "s")
        }
      }, "background-line-x-" + 0 + "-" + 0)
    })]
  });
};
/* eslint-enable complexity */
exports.DrawXAxisGridLine = DrawXAxisGridLine;