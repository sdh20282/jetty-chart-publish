"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateWarpperTransform = exports.calculateStackedLabelTo = exports.calculateStackedLabelFrom = exports.calculateStackedBarFrom = exports.calculateLabelTransform = exports.calculateLabelTo = exports.calculateLabelFrom = exports.calculateBarWrapperTransform = exports.calculateBarWrapperTo = exports.calculateBarWrapperFrom = exports.calculateBarTransform = exports.calculateBarTo = exports.calculateBarFrom = void 0;
const calculateWarpperTransform = _ref => {
  let {
    horizontal,
    reverse,
    innerMargin,
    padding
  } = _ref;
  return horizontal ? "translate(".concat(reverse ? innerMargin.top : innerMargin.bottom, ",").concat(padding, ")") : "translate(".concat(padding, ", ").concat(reverse ? innerMargin.bottom : innerMargin.top, ")");
};
exports.calculateWarpperTransform = calculateWarpperTransform;
const calculateBarWrapperTransform = _ref2 => {
  let {
    useAnimation,
    useTranslate,
    renderType,
    horizontal,
    zeroHeight,
    center,
    halfBarRealWidth,
    drawHeight,
    barHeight
  } = _ref2;
  return useAnimation && useTranslate ? "translate(0,0)" : useAnimation && renderType.includes("grow") ? horizontal ? "translate(".concat(zeroHeight, ",").concat(center - halfBarRealWidth, ")") : "translate(".concat(center - halfBarRealWidth, ")") : horizontal ? "translate(".concat(zeroHeight, ",").concat(center - halfBarRealWidth, ")") : "translate(".concat(center - halfBarRealWidth, ",").concat(drawHeight - barHeight - zeroHeight, ")");
};
exports.calculateBarWrapperTransform = calculateBarWrapperTransform;
const calculateBarWrapperFrom = _ref3 => {
  let {
    horizontal,
    zeroHeight,
    translate,
    borderRadius,
    center,
    rectHeight,
    rectWidth,
    drawHeight,
    barHeight
  } = _ref3;
  return horizontal ? "".concat(zeroHeight - translate.zeroHeight - borderRadius, "px,").concat(center - translate.center - (rectHeight - translate.height) / 2, "px") : "".concat(center - translate.center - (rectWidth - translate.width) / 2, "px,").concat(drawHeight - barHeight - zeroHeight, "px");
};
exports.calculateBarWrapperFrom = calculateBarWrapperFrom;
const calculateBarWrapperTo = _ref4 => {
  let {
    horizontal,
    zeroHeight,
    translate,
    center,
    drawHeight,
    barHeight,
    halfBarRealWidth
  } = _ref4;
  return horizontal ? "".concat(zeroHeight - translate.zeroHeight, "px,").concat(center - halfBarRealWidth, "px") : "".concat(center - halfBarRealWidth, "px,").concat(drawHeight - barHeight - zeroHeight, "px");
};
exports.calculateBarWrapperTo = calculateBarWrapperTo;
const calculateBarTransform = _ref5 => {
  var _nowPosition;
  let {
    useAnimation,
    renderType,
    useTranslate,
    horizontal,
    checkPositive,
    barOnlyUpperRadius,
    borderRadius,
    barHeight,
    nowPosition
  } = _ref5;
  (_nowPosition = nowPosition) !== null && _nowPosition !== void 0 ? _nowPosition : nowPosition = 0;
  return useAnimation && renderType.includes("grow") || useAnimation && useTranslate ? "" : horizontal ? "translate(".concat(checkPositive ? (barOnlyUpperRadius ? -borderRadius : 0) + nowPosition : -barHeight - nowPosition, ")") : "translate(0,".concat(checkPositive ? nowPosition : barHeight - (barOnlyUpperRadius ? borderRadius : 0) - nowPosition, ")");
};
exports.calculateBarTransform = calculateBarTransform;
const calculateBarFrom = _ref6 => {
  let {
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
  } = _ref6;
  return useTranslate ? horizontal ? "".concat(checkPositive ? 0 : borderRadius + borderRadius - rectWidth + translate.width, "px") : "0px,".concat((checkPositive ? translate.height : barHeight + (barOnlyUpperRadius ? -borderRadius : 0)) + translate.zeroHeight, "px") : horizontal ? "".concat(barOnlyUpperRadius ? checkPositive ? -borderRadius : borderRadius : 0, "px,0px") : "0px,".concat(drawHeight - zeroHeight + (barOnlyUpperRadius ? checkPositive ? borderRadius : -borderRadius : 0), "px");
};
exports.calculateBarFrom = calculateBarFrom;
const calculateStackedBarFrom = _ref7 => {
  let {
    useTranslate,
    horizontal,
    checkPositive,
    borderRadius,
    translate,
    barHeight,
    barOnlyUpperRadius,
    drawHeight,
    zeroHeight,
    nowPosition
  } = _ref7;
  return useTranslate ? horizontal ? "".concat(checkPositive ? nowPosition - translate.position : -barHeight + translate.totalHeight - nowPosition + translate.position, "px") : "0px,".concat(checkPositive ? translate.totalHeight + nowPosition - translate.position : barHeight + (barOnlyUpperRadius ? -borderRadius : 0) + translate.zeroHeight - nowPosition + translate.position, "px") : horizontal ? "".concat(barOnlyUpperRadius ? checkPositive ? -borderRadius : borderRadius : 0, "px,0px") : "0px,".concat(drawHeight - zeroHeight + (barOnlyUpperRadius ? checkPositive ? borderRadius : -borderRadius : 0), "px");
};
exports.calculateStackedBarFrom = calculateStackedBarFrom;
const calculateBarTo = _ref8 => {
  var _nowPosition2;
  let {
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
  } = _ref8;
  (_nowPosition2 = nowPosition) !== null && _nowPosition2 !== void 0 ? _nowPosition2 : nowPosition = 0;
  return useTranslate ? horizontal ? "".concat((checkPositive ? -borderRadius + nowPosition : -rectWidth + borderRadius - nowPosition) + translate.zeroHeight, "px") : "0px,".concat(checkPositive ? nowPosition : barHeight - borderRadius - nowPosition, "px") : horizontal ? "".concat(checkPositive ? (barOnlyUpperRadius ? -borderRadius : 0) + nowPosition : -barHeight - nowPosition, "px,0px") : "0px,".concat(drawHeight - zeroHeight - (checkPositive ? barHeight - nowPosition : (barOnlyUpperRadius ? borderRadius : 0) + nowPosition), "px");
};
exports.calculateBarTo = calculateBarTo;
const calculateLabelTransform = _ref9 => {
  let {
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
  } = _ref9;
  return useAnimation && useTranslate ? "" : horizontal ? "translate(".concat(horizontalLabelLocation, ",").concat(halfBarRealWidth, ")") : "translate(".concat(halfBarRealWidth, ",").concat(verticalLabelLocation + (useAnimation && renderType.includes("grow") ? drawHeight - barHeight - zeroHeight : 0), ")");
};

/* eslint-disable complexity */
exports.calculateLabelTransform = calculateLabelTransform;
const calculateLabelFrom = _ref10 => {
  let {
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
  } = _ref10;
  return useTranslate ? horizontal ? labelPosition === "over" ? "".concat((checkPositive ? rectWidth - translate.width : barBorderRadius) + labelMargin, "px,").concat((rectHeight - translate.height) / 2, "px") : labelPosition === "under" ? "".concat((checkPositive ? 0 : -rectWidth + translate.width + borderRadius) + borderRadius - labelMargin, "px,").concat((rectHeight - translate.height) / 2, "px") : "".concat((checkPositive ? (barHeight - translate.width) / 2 : -(barHeight - translate.width) / 2) + borderRadius, "px,").concat((rectHeight - translate.height) / 2, "px") : labelPosition === "over" ? "".concat((rectWidth - translate.width) / 2, "px,").concat((checkPositive ? translate.height : barHeight) - labelMargin + translate.zeroHeight, "px") : labelPosition === "under" ? "".concat((rectWidth - translate.width) / 2, "px,").concat((checkPositive ? barHeight : barHeight + barHeight - translate.height) + labelMargin + translate.zeroHeight, "px") : "".concat((rectWidth - translate.width) / 2, "px,").concat(checkPositive ? translate.height + (barHeight - translate.height) / 2 + translate.zeroHeight : barHeight + (barHeight - translate.height) / 2 + translate.zeroHeight, "px") : horizontal ? labelPosition === "over" ? "".concat(checkPositive ? -barHeight : 0, "px,0px") : labelPosition === "under" ? "".concat(checkPositive ? 0 : barHeight, "px,0px") : "".concat(checkPositive ? -barHeight / 2 : barHeight / 2, "px,0px") : labelPosition === "over" ? "0px,".concat(checkPositive ? barHeight : 0, "px") : labelPosition === "under" ? "0px,".concat(checkPositive ? 0 : -barHeight, "px") : "0px,".concat(checkPositive ? barHeight / 2 : -barHeight / 2, "px");
};
/* eslint-enable complexity */
exports.calculateLabelFrom = calculateLabelFrom;
const calculateStackedLabelFrom = _ref11 => {
  var _nowPosition3;
  let {
    useTranslate,
    horizontal,
    labelPosition,
    checkPositive,
    rectWidth,
    translate,
    labelMargin,
    rectHeight,
    barHeight,
    nowPosition
  } = _ref11;
  (_nowPosition3 = nowPosition) !== null && _nowPosition3 !== void 0 ? _nowPosition3 : nowPosition = 0;
  return useTranslate ? horizontal ? labelPosition === "over" ? "".concat(checkPositive ? nowPosition - translate.position + rectWidth - translate.width + labelMargin : -(barHeight - translate.totalHeight) - (nowPosition - translate.position) + (rectWidth - translate.width) + labelMargin, "px,").concat((rectHeight - translate.height) / 2, "px") : // : labelPosition === "under"
  // ? `${(checkPositive ? 0 : -rectWidth + translate.width + borderRadius) + borderRadius - labelMargin}px,${
  //     (rectHeight - translate.totalHeight) / 2
  //   }px`
  "".concat(checkPositive ? (rectWidth - translate.width) / 2 + nowPosition - translate.position : -(barHeight - translate.totalHeight) - (nowPosition - translate.position) + (rectWidth - translate.width) / 2, "px,").concat((rectHeight - translate.height) / 2, "px") : labelPosition === "over" ? "".concat((rectWidth - translate.width) / 2, "px,").concat((checkPositive ? translate.totalHeight + nowPosition - translate.position : barHeight - nowPosition + translate.position) - labelMargin, "px") : // : labelPosition === "under"
  // ? `${(rectWidth - translate.width) / 2}px,${
  //     (checkPositive ? barHeight : barHeight + barHeight - translate.totalHeight) + labelMargin + translate.zeroHeight
  //   }px`
  "".concat((rectWidth - translate.width) / 2, "px,").concat(checkPositive ? translate.totalHeight + (rectHeight - translate.height) / 2 + nowPosition - translate.position : barHeight + (rectHeight - translate.height) / 2 - nowPosition + translate.position, "px") : horizontal ? labelPosition === "over" ? "".concat(checkPositive ? -(nowPosition + rectWidth + labelMargin) : barHeight + nowPosition - rectWidth, "px,0px") : // : labelPosition === "under"
  // ? `${checkPositive ? 0 : barHeight}px,0px`
  "".concat(checkPositive ? -nowPosition - rectWidth / 2 : barHeight + nowPosition - rectWidth / 2, "px,0px") : labelPosition === "over" ? "0px,".concat(checkPositive ? barHeight - nowPosition : nowPosition, "px") : // : labelPosition === "under"
  // ? `0px,${checkPositive ? 0 : -barHeight}px`
  "0px,".concat(checkPositive ? -nowPosition + barHeight - rectHeight / 2 : nowPosition, "px");
};
/* eslint-enable complexity */
exports.calculateStackedLabelFrom = calculateStackedLabelFrom;
const calculateLabelTo = _ref12 => {
  let {
    useTranslate,
    horizontal,
    labelPosition,
    checkPositive,
    barHeight,
    labelMargin,
    translate,
    halfBarRealWidth
  } = _ref12;
  return useTranslate ? horizontal ? labelPosition === "over" ? "".concat((checkPositive ? barHeight : 0) + labelMargin + translate.zeroHeight, "px,").concat(halfBarRealWidth, "px") : labelPosition === "under" ? "".concat((checkPositive ? 0 : -barHeight) + translate.zeroHeight - labelMargin, "px,").concat(halfBarRealWidth, "px") : "".concat((checkPositive ? barHeight / 2 : -barHeight / 2) + translate.zeroHeight, "px,").concat(halfBarRealWidth, "px") : labelPosition === "over" ? "".concat(halfBarRealWidth, "px,").concat((checkPositive ? 0 : barHeight) - labelMargin, "px") : labelPosition === "under" ? "".concat(halfBarRealWidth, "px,").concat((checkPositive ? barHeight : barHeight + barHeight) + labelMargin, "px") : "".concat(halfBarRealWidth, "px,").concat(checkPositive ? barHeight / 2 : barHeight + barHeight / 2, "px") : "0px,0px";
};
exports.calculateLabelTo = calculateLabelTo;
const calculateStackedLabelTo = _ref13 => {
  var _nowPosition4;
  let {
    useTranslate,
    horizontal,
    labelPosition,
    checkPositive,
    barHeight,
    labelMargin,
    translate,
    halfBarRealWidth,
    nowPosition,
    rectWidth,
    rectHeight
  } = _ref13;
  (_nowPosition4 = nowPosition) !== null && _nowPosition4 !== void 0 ? _nowPosition4 : nowPosition = 0;
  return useTranslate ? horizontal ? labelPosition === "over" ? "".concat((checkPositive ? nowPosition + rectWidth : -barHeight - nowPosition + rectWidth) + labelMargin + translate.zeroHeight, "px,").concat(halfBarRealWidth, "px") : // : labelPosition === "under"
  // ? `${(checkPositive ? 0 : -barHeight) + translate.zeroHeight - labelMargin}px,${halfBarRealWidth}px`
  "".concat((checkPositive ? nowPosition : -(barHeight + nowPosition)) + rectWidth / 2 + translate.zeroHeight, "px,").concat(halfBarRealWidth, "px") : labelPosition === "over" ? "".concat(halfBarRealWidth, "px,").concat((checkPositive ? nowPosition : barHeight - nowPosition) - labelMargin, "px") : // : labelPosition === "under"
  // ? `${halfBarRealWidth}px,${(checkPositive ? barHeight : barHeight + barHeight) + labelMargin}px`
  "".concat(halfBarRealWidth, "px,").concat((checkPositive ? nowPosition : -nowPosition + barHeight) + rectHeight / 2, "px") : "0px,0px";
};
exports.calculateStackedLabelTo = calculateStackedLabelTo;