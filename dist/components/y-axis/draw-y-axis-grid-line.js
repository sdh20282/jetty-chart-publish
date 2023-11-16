"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawYAxisGridLine = void 0;
var _react = require("react");
var _yAxisGridLineModule = _interopRequireDefault(require("./y-axis-grid-line.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */
const DrawYAxisGridLine = _ref => {
  let {
    normalSettings: {
      horizontal,
      yAxis,
      width,
      yAxisHeight,
      showTopScope
    },
    lineSettings: {
      lineVisible,
      lineOpacity,
      lineColor,
      lineWidth,
      lineDash,
      lineDashWidth,
      lineDashGap,
      lineRound
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
  const prevYAxis = (0, _react.useRef)({});
  const prevYAxisTemp = (0, _react.useRef)({});
  if (!lineVisible) {
    return;
  }
  const animationXAxisStart = renderStartFrom.split("-")[0];
  const animationYAxisStart = renderStartFrom.split("-")[1];
  const ms = new Date().valueOf();
  if (translateLine) {
    prevYAxis.current = {
      ...prevYAxisTemp.current
    };
    prevYAxisTemp.current = [];
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _yAxisGridLineModule.default.container,
    children: yAxis.map((c, idx) => {
      if (!showTopScope && (idx === 0 || idx === yAxis.length - 1) && c !== 0) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {}, "background-line-y-" + ms + "-" + idx);
      }

      // 현재 위치 계산
      const location = yAxisHeight * idx;
      const nowKey = "y-axis-grid-line-".concat(c);

      // 현재 위치 정보 저장
      prevYAxisTemp.current[nowKey] = location;

      // 라인 리렌더링을 안할 경우
      let useTranslate = false;
      let translate = 0;
      if (translateLine) {
        // 이전 위치에 현재 위치가 포함되는지 확인
        if (Object.keys(prevYAxis.current).includes(nowKey)) {
          translate = location - prevYAxis.current[nowKey];
          useTranslate = true;
        }
      }
      let linePath = "";
      if (lineDash) {
        let path = horizontal ? "M ".concat(location - (useAnimation ? translate : 0), ",0 ") : "M 0,".concat(location - (useAnimation ? translate : 0), " ");
        let pathLength = 0;
        while (pathLength < width) {
          if (pathLength + lineDashWidth + lineDashGap <= width) {
            path += horizontal ? "v ".concat(lineDashWidth, " m 0 ").concat(lineDashGap, " ") : "h ".concat(lineDashWidth, " m ").concat(lineDashGap, " 0 ");
          } else if (pathLength + lineDashWidth <= width) {
            path += horizontal ? "v ".concat(lineDashWidth) : "h ".concat(lineDashWidth);
          } else {
            path += horizontal ? "v ".concat(width - pathLength) : "h ".concat(width - pathLength);
          }
          pathLength += lineDashWidth + lineDashGap;
        }
        linePath = path;
      } else {
        linePath = horizontal ? "\n            M ".concat(location - (useAnimation ? translate : 0), ",0\n            v ").concat(width, "\n          ") : "\n            M 0,".concat(location - (useAnimation ? translate : 0), "\n            h ").concat(width, "\n          ");
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: linePath,
        stroke: lineColor,
        strokeOpacity: lineOpacity,
        strokeWidth: lineWidth,
        strokeLinecap: lineRound ? "round" : "",
        className: useAnimation ? useTranslate ? _yAxisGridLineModule.default.translateLine : renderType === "draw" ? _yAxisGridLineModule.default.drawLine : renderType === "fade" ? _yAxisGridLineModule.default.fadeLine : "" : "",
        style: {
          "--line-width": "".concat(width, "px"),
          "--line-offset": "".concat(lineDash ? -lineDashWidth : animationXAxisStart === "left" ? width : -width, "px"),
          "--animation-duration": "".concat(useTranslate ? translateDuration : renderDuration, "s"),
          "--animation-timing-function": useTranslate ? translateTimingFunction : renderTimingFunction,
          "--animation-delay": "".concat((useTranslate ? translateStartDelay : renderStartDelay) + (useTranslate ? translateItemDelay : renderItemDelay) * (!horizontal && animationYAxisStart === "bottom" || horizontal && animationYAxisStart !== "bottom" ? yAxis.length - 1 - idx : idx), "s"),
          "--height-offset": horizontal ? "".concat(translate, "px") : "0px,".concat(translate, "px")
        }
      }, "background-line-y-" + ms + "-" + idx);
    })
  });
};
/* eslint-enable complexity */
exports.DrawYAxisGridLine = DrawYAxisGridLine;