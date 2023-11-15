"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawXAxisLabel = void 0;
var _react = require("react");
var _xAxisLabelModule = _interopRequireDefault(require("./x-axis-label.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */
const DrawXAxisLabel = _ref => {
  var _padding, _xAxisInitialPosition;
  let {
    normalSettings: {
      xAxis,
      horizontal,
      height,
      padding,
      xAxisInitialPosition,
      xAxisWidth
    },
    labelSettings: {
      useLabel,
      labelOnBottom,
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
  const prevXAxis = (0, _react.useRef)({});
  const prevXAxisTemp = (0, _react.useRef)({});
  if (!useLabel) {
    return;
  }
  const totalLabelMargin = labelMargin + sideLineSize;
  const labelLocation = height + totalLabelMargin;
  const ms = new Date().valueOf();
  (_padding = padding) !== null && _padding !== void 0 ? _padding : padding = 0;
  (_xAxisInitialPosition = xAxisInitialPosition) !== null && _xAxisInitialPosition !== void 0 ? _xAxisInitialPosition : xAxisInitialPosition = 0;
  if (translateLabel) {
    prevXAxis.current = {
      ...prevXAxisTemp.current
    };
    prevXAxisTemp.current = [];
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    transform: horizontal ? "translate(".concat(labelOnBottom ? -totalLabelMargin : labelLocation, ",").concat(padding, ")") : "translate(".concat(padding, ",").concat(labelOnBottom ? labelLocation : -totalLabelMargin, ")"),
    className: _xAxisLabelModule.default.container,
    children: xAxis.map((d, idx) => {
      const x = xAxisWidth * idx + xAxisInitialPosition;
      const nowKey = "x-axis-label-".concat(idx);

      // 현재 위치 정보 저장
      prevXAxisTemp.current[nowKey] = x;

      // 라인 리렌더링을 안할 경우
      let useTranlate = false;
      let translate = 0;
      if (translateLabel) {
        // 이전 위치에 현재 위치가 포함되는지 확인
        if (Object.keys(prevXAxis.current).includes(nowKey)) {
          translate = x - prevXAxis.current[nowKey];
          useTranlate = true;
        }
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: horizontal ? "translate(0, ".concat(x, ")") : "translate(".concat(x, ")"),
        className: useAnimation ? useTranlate ? _xAxisLabelModule.default.translateLabel : renderType === "fade" ? _xAxisLabelModule.default.fadeLabel : "" : "",
        style: {
          "--animation-duration": "".concat(useTranlate ? translateDuration : renderDuration, "s"),
          "--animation-timing-function": useTranlate ? translateTimingFunction : renderType === "typing" ? "steps(3, end)" : renderTimingFunction,
          "--animation-delay": "".concat((useTranlate ? translateStartDelay : renderStartDelay) + (useTranlate ? translateItemDelay : renderItemDelay) * (renderStartFrom === "left" ? idx : xAxis.length - 1 - idx), "s"),
          "--translate-from": horizontal ? "0px,".concat(x - translate, "px") : "".concat(x - translate, "px"),
          "--translate-to": horizontal ? "0px,".concat(x, "px") : "".concat(x, "px")
        },
        children: [sideLineVisible && /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
          x1: horizontal ? labelOnBottom ? totalLabelMargin - sideLineSize : -totalLabelMargin + sideLineSize : "0",
          x2: horizontal ? labelOnBottom ? totalLabelMargin : -totalLabelMargin : "0",
          y1: horizontal ? "0" : labelOnBottom ? -totalLabelMargin + sideLineSize : totalLabelMargin - sideLineSize,
          y2: horizontal ? "0" : labelOnBottom ? -totalLabelMargin : totalLabelMargin,
          stroke: sideLineColor,
          strokeOpacity: sideLineOpacity,
          strokeWidth: sideLineWidth
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          transform: "translate(".concat(horizontal ? 0 : labelMove, ",").concat(horizontal ? -labelMove : 0, ") rotate(").concat(labelRotate, ")"),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
            dominantBaseline: horizontal ? "hanging" : labelOnBottom ? "hanging" : "ideographic",
            textAnchor: horizontal ? labelOnBottom ? "end" : "start" : labelRotate === 0 ? "middle" : labelRotate < 0 ? labelOnBottom ? "end" : "start" : labelOnBottom ? "start" : "end",
            fontSize: labelSize,
            fontWeight: labelWeight,
            fill: labelColor,
            opacity: labelOpacity,
            transform: "translate(0,-".concat(horizontal ? labelSize / 2 : 0, ")"),
            children: d
          })
        })]
      }, "category-" + ms + "-" + idx);
    })
  });
};
/* eslint-enable complexity */
exports.DrawXAxisLabel = DrawXAxisLabel;