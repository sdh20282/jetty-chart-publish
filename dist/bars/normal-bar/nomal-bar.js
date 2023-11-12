"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalBar = void 0;
var _react = require("react");
var _labelValueCommon = require("../../components/label-value-common/label-value-common");
var _checkNormalBarException = require("../../common/bar-common/exception/check-normal-bar-exception");
var _calculateScope = require("../../common/utils/scope/calculate-scope");
var _calculateBaseValues = require("../../common/bar-common/utils/calculate-base-values");
var _calculateBarPositions = require("../../common/bar-common/utils/calculate-bar-positions");
var _normalBarModule = _interopRequireDefault(require("./normal-bar.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */const NormalBar = _ref => {
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
  if (!data || data.length === 0) {
    return;
  }
  const result = (0, _checkNormalBarException.checkNormalBar)({
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
    useVariousColors
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
    useMinHeight,
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
    data: data.map(d => d.value)
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
      children: data.map((d, idx) => {
        const nowData = {
          ...d
        };
        if (reverse) {
          nowData.value = -nowData.value;
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
          value: nowData.value,
          length: data.length,
          idx,
          drawWidth,
          drawHeight,
          useMinHeight,
          minHeight,
          totalScope,
          barBorderRadius,
          barOnlyUpperRadius,
          halfBarRealWidth
        });
        const {
          horizontalLabelLocation,
          verticalLabelLocation
        } = (0, _calculateBaseValues.calculateLabelLocation)({
          barHeight,
          realHeight,
          checkPositive,
          labelPosition,
          labelMargin
        });
        const nowKey = "bar-".concat(idx);
        prevBarsTemp.current[nowKey] = {
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
          if (Object.keys(prevBars.current).includes(String(nowKey))) {
            translate = {
              center: center - prevBars.current[nowKey].center,
              width: rectWidth - prevBars.current[nowKey].width,
              height: rectHeight - prevBars.current[nowKey].height,
              zeroHeight: zeroHeight - prevBars.current[nowKey].zeroHeight
            };
            useTranslate = true;
          }
        }
        return display && /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
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
          className: useAnimation && useTranslate ? _normalBarModule.default.translateGroup : "",
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
            "--animation-delay": "".concat(translateStartDelay + translateItemDelay * (renderStartFrom === "left" ? idx : data.length - 1 - idx), "s")
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
            width: rectWidth,
            height: rectHeight,
            clipPath: barOnlyUpperRadius ? horizontal ? checkPositive ? "inset(0px 0px 0px ".concat(borderRadius, "px)") : "inset(0px ".concat(borderRadius, "px 0px 0px)") : checkPositive ? "inset(0px 0px ".concat(borderRadius, "px 0px)") : "inset(".concat(borderRadius, "px 0px 0px 0px)") : "",
            transform: (0, _calculateBarPositions.calculateBarTransform)({
              useAnimation,
              renderType,
              useTranslate,
              horizontal,
              checkPositive,
              barOnlyUpperRadius,
              borderRadius,
              barHeight
            }),
            fill: useVariousColors ? colorPalette[idx % colorPalette.length] : colorPalette[0],
            fillOpacity: barOpacity,
            rx: borderRadius,
            ry: borderRadius,
            stroke: useBarBorder ? barBorderColor : "",
            strokeOpacity: barBorderOpacity,
            strokeWidth: useBarBorder ? barBorderWidth : "0",
            className: useAnimation ? useTranslate ? _normalBarModule.default.translateBar : renderType.includes("grow") ? _normalBarModule.default.growBar : renderType === "fade" ? _normalBarModule.default.fadeBar : "" : "",
            style: {
              "--bar-from": (0, _calculateBarPositions.calculateBarFrom)({
                useTranslate,
                horizontal,
                checkPositive,
                borderRadius,
                rectWidth,
                translate,
                barHeight,
                barOnlyUpperRadius,
                drawHeight,
                zeroHeight
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
                zeroHeight
              }),
              "--width-from": useTranslate ? "".concat(rectWidth - translate.width, "px") : horizontal ? "0px" : "".concat(rectWidth, "px"),
              "--width-to": "".concat(rectWidth, "px"),
              "--height-from": useTranslate ? "".concat(rectHeight - translate.height, "px") : horizontal ? "".concat(rectHeight, "px") : "0px",
              "--height-to": "".concat(rectHeight, "px"),
              "--animation-duration": useTranslate ? "".concat(translateDuration, "s") : "".concat(renderType === "grow" ? renderDuration * valueRatio : renderDuration, "s"),
              "--animation-delay": "".concat((useTranslate ? translateStartDelay : renderStartDelay) + (useTranslate ? translateItemDelay : renderItemDelay) * (renderStartFrom === "left" ? idx : data.length - 1 - idx), "s"),
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
              className: textRender && useAnimation ? useTranslate ? _normalBarModule.default.translateText : textRenderType.includes("grow") ? _normalBarModule.default.growText : textRenderType === "fade" ? _normalBarModule.default.fadeText : "" : "",
              style: {
                "--text-from": (0, _calculateBarPositions.calculateLabelFrom)({
                  useTranslate,
                  horizontal,
                  labelPosition,
                  checkPositive,
                  rectWidth,
                  translate,
                  barBorderRadius,
                  labelMargin,
                  rectHeight,
                  borderRadius,
                  barHeight
                }),
                "--text-to": (0, _calculateBarPositions.calculateLabelTo)({
                  useTranslate,
                  horizontal,
                  labelPosition,
                  checkPositive,
                  barHeight,
                  labelMargin,
                  translate,
                  halfBarRealWidth
                }),
                "--animation-duration": useTranslate ? "".concat(translateDuration, "s") : "".concat(renderType === "grow" ? textRenderDuration * valueRatio : textRenderDuration, "s"),
                "--animation-delay": "".concat((useTranslate ? translateStartDelay : textRenderStartDelay) + (useTranslate ? translateItemDelay : textRenderItemDelay) * (textRenderStartFrom === "left" ? idx : data.length - 1 - idx), "s"),
                "--animation-timing-function": useTranslate ? translateTimingFunction : textRenderTimingFunction
              },
              children: reverse ? -nowData.value : nowData.value
            })
          })]
        }, "bar-" + ms + "-" + idx);
      })
    })
  });
};
/* eslint-enable complexity */
exports.NormalBar = NormalBar;