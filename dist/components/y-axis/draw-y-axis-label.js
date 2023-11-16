"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawYAxisLabel = void 0;
var _react = require("react");
var _yAxisLabelModule = _interopRequireDefault(require("./y-axis-label.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */
const DrawYAxisLabel = _ref => {
  let {
    normalSettings: {
      horizontal,
      yAxis,
      width,
      yAxisHeight,
      showTopScope
    },
    labelSettings: {
      useLabel,
      labelOnLeft,
      labelMargin,
      labelSize,
      labelWeight,
      labelOpacity,
      labelColor,
      labelRotate,
      labelMove,
      sideLineSize,
      sideLineVisible,
      sideLineOpacity,
      sideLineColor,
      sideLineWidth
    },
    animationSettings: {
      useAnimation,
      renderType,
      renderDuration,
      renderStartDelay,
      renderItemDelay,
      renderTimingFunction,
      renderStartFrom,
      translateLabel,
      translateDuration,
      translateStartDelay,
      translateItemDelay,
      translateTimingFunction
    }
  } = _ref;
  const prevYAxis = (0, _react.useRef)({});
  const prevYAxisTemp = (0, _react.useRef)({});
  if (!useLabel) {
    return;
  }
  const totalLabelMargin = labelMargin + sideLineSize;
  const labelLocation = width + totalLabelMargin;
  const ms = new Date().valueOf();
  if (translateLabel) {
    prevYAxis.current = {
      ...prevYAxisTemp.current
    };
    prevYAxisTemp.current = [];
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    transform: horizontal ? "translate(0,".concat(labelOnLeft ? -totalLabelMargin : labelLocation, ")") : "translate(".concat(labelOnLeft ? -totalLabelMargin : labelLocation, ")"),
    className: _yAxisLabelModule.default.container,
    children: yAxis.map((c, idx) => {
      if (!showTopScope && (idx === 0 || idx === yAxis.length - 1) && c !== 0) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {}, "level-" + ms + "-" + idx + "-" + c);
      }
      const location = yAxisHeight * idx;
      const nowKey = "y-axis-label-".concat(c);

      // 현재 위치 정보 저장
      prevYAxisTemp.current[nowKey] = location;

      // 라인 리렌더링을 안할 경우
      let useTranslate = false;
      let translate = 0;
      if (translateLabel) {
        // 이전 위치에 현재 위치가 포함되는지 확인
        if (Object.keys(prevYAxis.current).includes(nowKey)) {
          translate = location - prevYAxis.current[nowKey];
          useTranslate = true;
        }
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: horizontal ? "translate(".concat(location - translate, ")") : "translate(0,".concat(location - translate, ")"),
        className: useAnimation ? useTranslate ? _yAxisLabelModule.default.translateLabel : renderType === "fade" ? _yAxisLabelModule.default.fadeLabel : "" : "",
        style: {
          "--animation-duration": "".concat(useTranslate ? translateDuration : renderDuration, "s"),
          "--animation-timing-function": useTranslate ? translateTimingFunction : renderType === "typing" ? "steps(3, end)" : renderTimingFunction,
          "--animation-delay": "".concat((useTranslate ? translateStartDelay : renderStartDelay) + (useTranslate ? translateItemDelay : renderItemDelay) * (!horizontal && renderStartFrom === "bottom" || horizontal && renderStartFrom !== "bottom" ? yAxis.length - 1 - idx : idx), "s"),
          "--translate-from": horizontal ? "".concat(location - translate, "px") : "0px,".concat(location - translate, "px"),
          "--translate-to": horizontal ? "".concat(location, "px") : "0px,".concat(location, "px")
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          transform: "translate(".concat(horizontal ? labelMove : 0, ",").concat(horizontal ? 0 : -labelMove, ") rotate(").concat(labelRotate, ")"),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
            dominantBaseline: horizontal ? labelOnLeft ? "ideographic" : "hanging" : "hanging",
            textAnchor: horizontal ? labelRotate === 0 ? "middle" : labelRotate < 0 ? labelOnLeft ? "start" : "end" : labelOnLeft ? "end" : "start" : labelOnLeft ? "end" : "start",
            height: labelSize,
            fontSize: labelSize,
            fontWeight: labelWeight,
            fill: labelColor,
            opacity: labelOpacity,
            transform: "translate(0,".concat(horizontal ? 0 : -labelSize / 2, ")"),
            children: c
          })
        }), sideLineVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
          x1: horizontal ? "0" : labelOnLeft ? totalLabelMargin - sideLineSize : -totalLabelMargin + sideLineSize,
          x2: horizontal ? "0" : labelOnLeft ? totalLabelMargin : -totalLabelMargin,
          y1: horizontal ? labelOnLeft ? totalLabelMargin - sideLineSize : -totalLabelMargin + sideLineSize : "0",
          y2: horizontal ? labelOnLeft ? totalLabelMargin : -totalLabelMargin : "0",
          stroke: sideLineColor,
          strokeOpacity: sideLineOpacity,
          strokeWidth: sideLineWidth
        })]
      }, "level-" + ms + "-" + idx + "-" + c);
    })
  });
};
/* eslint-enable complexity */
exports.DrawYAxisLabel = DrawYAxisLabel;