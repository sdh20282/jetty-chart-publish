"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackedBar = void 0;
var _react = require("react");
var _labelValueCommon = require("../../components/label-value-common/label-value-common");
var _checkStackedBarException = require("../../common/bar-common/exception/check-stacked-bar-exception");
var _calculateScope = require("../../common/utils/scope/calculate-scope");
var _calculateBaseValues = require("../../common/bar-common/utils/calculate-base-values");
var _calculateBarPositions = require("../../common/bar-common/utils/calculate-bar-positions");
var _stackedBarModule = _interopRequireDefault(require("./stacked-bar.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */const StackedBar = _ref => {
  let {
    data,
    keys,
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
    bottomLegendSettings,
    topLegendSettings,
    legendSettings,
    barSettings,
    animationSettings
  } = _ref;
  const prevBars = (0, _react.useRef)({});
  const prevBarsTemp = (0, _react.useRef)({});
  const pervBarItem = (0, _react.useRef)({});
  const prevBarItemTemp = (0, _react.useRef)({});
  if (!data || data.length === 0) {
    return;
  }
  const result = (0, _checkStackedBarException.checkStackedBar)({
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
    bottomLegendSettings,
    topLegendSettings,
    legendSettings,
    barSettings,
    animationSettings
  });
  const {
    width,
    height,
    margin,
    innerMargin,
    padding,
    reverse,
    horizontal,
    colorPalette,
    reverseOrder
  } = result.normalSettings;
  const {
    autoScope,
    maxScope,
    minScope
  } = result.scopeSettings;
  let {
    showTopScope
  } = result.scopeSettings;
  const {
    barOpacity,
    barGap,
    barOnlyUpperRadius,
    barBorderRadius,
    useBarBorder,
    barBorderWidth,
    barBorderColor,
    barBorderOpacity,
    minHeight,
    useLabel,
    labelPosition,
    labelMargin,
    labelSize,
    labelWeight,
    labelOpacity,
    labelColor,
    labelInvisibleHeight
  } = result.barSettings;
  const {
    useAnimation,
    renderType,
    renderDuration,
    renderStartDelay,
    renderItemDelay,
    renderTimingFunction,
    renderStartFrom,
    textRender,
    textRenderType,
    textRenderDuration,
    textRenderStartDelay,
    textRenderItemDelay,
    textRenderTimingFunction,
    textRenderStartFrom,
    translateBar,
    translateDuration,
    translateStartDelay,
    translateItemDelay,
    translateTimingFunction
  } = result.animationSettings.barSettings;
  const scopeResult = autoScope ? (0, _calculateScope.getAutoScope)({
    data: data.map(d => d.value.reduce((acc, cur) => {
      return acc + cur;
    }, 0))
  }) : (0, _calculateScope.getUserScope)({
    maxScope,
    minScope
  });
  let display = true;
  if (reverse) {
    scopeResult.scope.reverse();
  }
  if (!autoScope && !scopeResult.display) {
    display = false;
    showTopScope = false;
  }
  const {
    totalWidth,
    totalHeight,
    totalScope,
    drawWidth,
    drawHeight,
    lineHeight,
    barWidth,
    halfBarWidth,
    halfBarRealWidth,
    zeroHeight
  } = (0, _calculateBaseValues.calculateBase)({
    horizontal,
    height,
    margin,
    width,
    scopeResult,
    autoScope,
    innerMargin,
    padding,
    length: data.length,
    barGap
  });
  const ms = new Date().valueOf();
  if (translateBar) {
    prevBars.current = {
      ...prevBarsTemp.current
    };
    prevBarsTemp.current = [];
    pervBarItem.current = {
      ...prevBarItemTemp.current
    };
    prevBarItemTemp.current = [];
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_labelValueCommon.LabelValueCommon, {
    keys: keys,
    xAxis: data.map(d => d.label),
    yAxis: scopeResult.scope,
    xLegend: xLegend,
    yLegend: yLegend,
    normalSettings: {
      ...result.normalSettings,
      totalWidth,
      totalHeight,
      xAxisInitialPosition: halfBarWidth,
      xAxisWidth: barWidth,
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: (0, _calculateBarPositions.calculateWarpperTransform)({
        horizontal,
        reverse,
        innerMargin,
        padding
      }),
      children: data.map((d, index) => {
        const nowData = {
          ...d
        };
        let nowTotalValue = nowData.value.reduce((acc, cur) => {
          return acc + cur;
        }, 0);
        if (reverse) {
          nowTotalValue = -nowTotalValue;
        }
        const {
          center,
          valueRatio,
          barHeight,
          borderRadius,
          realHeight,
          rectWidth,
          rectHeight,
          checkPositive
        } = (0, _calculateBaseValues.calculateBarBase)({
          horizontal,
          reverse,
          value: nowTotalValue,
          length: data.length,
          idx: index,
          drawWidth,
          drawHeight,
          useMinHeight: false,
          minHeight,
          totalScope,
          barBorderRadius: 0,
          barOnlyUpperRadius,
          halfBarRealWidth
        });
        const nowGroupKey = "group-".concat(index);
        prevBarsTemp.current[nowGroupKey] = {
          center,
          width: rectWidth,
          height: rectHeight,
          zeroHeight
        };
        let useTranslate = false;
        let translate = {
          center: 0,
          width: 0,
          height: 0,
          zeroHeight: 0
        };
        if (translateBar && useAnimation) {
          if (Object.keys(prevBars.current).includes(String(nowGroupKey))) {
            translate = {
              center: center - prevBars.current[nowGroupKey].center,
              width: rectWidth - prevBars.current[nowGroupKey].width,
              height: rectHeight - prevBars.current[nowGroupKey].height,
              zeroHeight: zeroHeight - prevBars.current[nowGroupKey].zeroHeight
            };
            useTranslate = true;
          }
        }
        return display && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          transform: (0, _calculateBarPositions.calculateBarWrapperTransform)({
            useAnimation,
            useTranslate,
            renderType,
            horizontal,
            zeroHeight,
            center,
            halfBarRealWidth,
            drawHeight,
            barHeight
          }),
          className: useAnimation && useTranslate ? _stackedBarModule.default.translateGroup : "",
          style: {
            "--group-from": (0, _calculateBarPositions.calculateBarWrapperFrom)({
              horizontal,
              zeroHeight,
              translate,
              borderRadius,
              center,
              rectHeight,
              rectWidth,
              drawHeight,
              barHeight
            }),
            "--group-to": (0, _calculateBarPositions.calculateBarWrapperTo)({
              horizontal,
              zeroHeight,
              translate,
              center,
              drawHeight,
              barHeight,
              halfBarRealWidth
            }),
            "--animation-duration": "".concat(translateDuration, "s"),
            "--animation-timing-function": translateTimingFunction,
            "--animation-delay": "".concat(translateStartDelay + translateItemDelay * (renderStartFrom === "left" ? index : data.length - 1 - index), "s")
          },
          children: nowData.value.map((d, idx) => {
            let {
              nowHeight,
              nowPosition
            } = (0, _calculateBaseValues.calculateStackedBarBase)({
              rectHeight: horizontal ? rectWidth : rectHeight,
              values: nowData.value,
              idx: horizontal ? nowData.value.length - 1 - idx : idx,
              totalValue: nowTotalValue,
              reverseOrder
            });
            if (nowTotalValue < 0) {
              nowPosition = -nowPosition;
            }
            if (reverse) {
              nowPosition = -nowPosition;
            }
            const nowRectWidth = Math.abs(horizontal ? nowHeight : rectWidth);
            const nowRectHeight = Math.abs(horizontal ? rectHeight : nowHeight);
            const {
              horizontalLabelLocation,
              verticalLabelLocation
            } = (0, _calculateBaseValues.calculateStackedLabelLocation)({
              barHeight,
              realHeight,
              checkPositive,
              labelPosition,
              labelMargin,
              rectWidth: nowRectWidth,
              rectHeight: nowRectHeight,
              nowPosition
            });
            const nowBarKey = "bar-".concat(index, "-").concat(idx);
            prevBarItemTemp.current[nowBarKey] = {
              center,
              width: nowRectWidth,
              height: nowRectHeight,
              zeroHeight,
              position: nowPosition,
              totalHeight: barHeight
            };
            let useTranslate = false;
            let translate = {
              center: 0,
              width: 0,
              height: 0,
              zeroHeight: 0,
              position: 0,
              totalHeight: 0
            };
            if (translateBar && useAnimation) {
              if (Object.keys(pervBarItem.current).includes(nowBarKey)) {
                translate = {
                  center: center - pervBarItem.current[nowBarKey].center,
                  width: nowRectWidth - pervBarItem.current[nowBarKey].width,
                  height: nowRectHeight - pervBarItem.current[nowBarKey].height,
                  zeroHeight: zeroHeight - pervBarItem.current[nowBarKey].zeroHeight,
                  position: nowPosition - pervBarItem.current[nowBarKey].position,
                  totalHeight: barHeight - pervBarItem.current[nowBarKey].totalHeight
                };
                useTranslate = true;
              }
            }
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
                width: nowRectWidth,
                height: nowRectHeight,
                transform: (0, _calculateBarPositions.calculateBarTransform)({
                  useAnimation,
                  renderType,
                  useTranslate,
                  horizontal,
                  checkPositive,
                  barOnlyUpperRadius,
                  borderRadius,
                  barHeight,
                  nowPosition
                }),
                fill: colorPalette[idx % colorPalette.length],
                fillOpacity: barOpacity,
                rx: barBorderRadius,
                ry: barBorderRadius,
                stroke: useBarBorder ? barBorderColor : "",
                strokeOpacity: barBorderOpacity,
                strokeWidth: useBarBorder ? barBorderWidth : "0",
                className: useAnimation ? useTranslate ? _stackedBarModule.default.translateBar : renderType.includes("grow") ? _stackedBarModule.default.growBar : renderType === "fade" ? _stackedBarModule.default.fadeBar : "" : "",
                style: {
                  "--bar-from": (0, _calculateBarPositions.calculateStackedBarFrom)({
                    useTranslate,
                    horizontal,
                    checkPositive,
                    borderRadius,
                    rectWidth,
                    translate,
                    barHeight,
                    barOnlyUpperRadius,
                    drawHeight,
                    zeroHeight,
                    nowPosition
                  }),
                  "--bar-to": (0, _calculateBarPositions.calculateBarTo)({
                    useTranslate,
                    horizontal,
                    checkPositive,
                    borderRadius,
                    rectWidth,
                    translate,
                    barHeight,
                    barOnlyUpperRadius,
                    drawHeight,
                    zeroHeight,
                    nowPosition
                  }),
                  "--width-from": useTranslate ? "".concat(nowRectWidth - translate.width, "px") : horizontal ? "0px" : "".concat(nowRectWidth, "px"),
                  "--width-to": "".concat(nowRectWidth, "px"),
                  "--height-from": useTranslate ? "".concat(nowRectHeight - translate.height, "px") : horizontal ? "".concat(nowRectHeight, "px") : "0px",
                  "--height-to": "".concat(nowRectHeight, "px"),
                  "--animation-duration": useTranslate ? "".concat(translateDuration, "s") : "".concat(renderType === "grow" ? renderDuration * valueRatio : renderDuration, "s"),
                  "--animation-delay": "".concat((useTranslate ? translateStartDelay : renderStartDelay) + (useTranslate ? translateItemDelay : renderItemDelay) * (renderStartFrom === "left" ? index : data.length - 1 - index), "s"),
                  "--animation-timing-function": useTranslate ? translateTimingFunction : renderTimingFunction
                }
              }), useLabel && realHeight > labelInvisibleHeight && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
                transform: (0, _calculateBarPositions.calculateLabelTransform)({
                  useAnimation,
                  useTranslate,
                  horizontal,
                  horizontalLabelLocation,
                  halfBarRealWidth,
                  verticalLabelLocation,
                  renderType,
                  drawHeight,
                  barHeight,
                  zeroHeight
                }),
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
                  fontSize: labelSize,
                  fontWeight: labelWeight,
                  fill: labelColor,
                  opacity: labelOpacity,
                  dominantBaseline: horizontal ? "middle" : labelPosition === "over" ? "ideographic" : labelPosition === "under" ? "hanging" : "middle",
                  textAnchor: horizontal ? labelPosition === "over" ? "start" : labelPosition === "under" ? "end" : "middle" : "middle",
                  className: textRender && useAnimation ? useTranslate ? _stackedBarModule.default.translateText : textRenderType.includes("grow") ? _stackedBarModule.default.growText : textRenderType === "fade" ? _stackedBarModule.default.fadeText : "" : "",
                  style: {
                    "--text-from": (0, _calculateBarPositions.calculateStackedLabelFrom)({
                      useTranslate,
                      horizontal,
                      labelPosition,
                      checkPositive,
                      rectWidth: nowRectWidth,
                      rectHeight: nowRectHeight,
                      translate,
                      barBorderRadius,
                      labelMargin,
                      borderRadius,
                      barHeight,
                      nowPosition
                    }),
                    "--text-to": (0, _calculateBarPositions.calculateStackedLabelTo)({
                      useTranslate,
                      horizontal,
                      labelPosition,
                      checkPositive,
                      barHeight,
                      labelMargin,
                      translate,
                      halfBarRealWidth,
                      nowPosition,
                      rectWidth: nowRectWidth,
                      rectHeight: nowRectHeight
                    }),
                    "--animation-duration": useTranslate ? "".concat(translateDuration, "s") : "".concat(renderType === "grow" ? textRenderDuration * valueRatio : textRenderDuration, "s"),
                    "--animation-delay": "".concat((useTranslate ? translateStartDelay : textRenderStartDelay) + (useTranslate ? translateItemDelay : textRenderItemDelay) * (textRenderStartFrom === "left" ? index : data.length - 1 - index), "s"),
                    "--animation-timing-function": useTranslate ? translateTimingFunction : textRenderTimingFunction
                  },
                  children: nowData.value[idx]
                })
              })]
            }, "rect-" + ms + "-" + index + "-" + idx);
          })
        }, "group-" + ms + "-" + index);
      })
    })
  });
};
exports.StackedBar = StackedBar;