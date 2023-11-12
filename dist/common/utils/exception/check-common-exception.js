"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSize = exports.checkMargin = exports.checkBarBorderRadius = void 0;
const checkMargin = _ref => {
  var _margin$top, _margin$bottom, _margin$left, _margin$right;
  let {
    margin
  } = _ref;
  (_margin$top = margin.top) !== null && _margin$top !== void 0 ? _margin$top : margin.top = 50;
  (_margin$bottom = margin.bottom) !== null && _margin$bottom !== void 0 ? _margin$bottom : margin.bottom = 50;
  (_margin$left = margin.left) !== null && _margin$left !== void 0 ? _margin$left : margin.left = 50;
  (_margin$right = margin.right) !== null && _margin$right !== void 0 ? _margin$right : margin.right = 50;
  return margin;
};
exports.checkMargin = checkMargin;
const checkBarBorderRadius = _ref2 => {
  let {
    halfWidth,
    height,
    borderRadius
  } = _ref2;
  borderRadius = halfWidth < borderRadius ? halfWidth : borderRadius;
  borderRadius = height < borderRadius ? height : borderRadius;
  return borderRadius;
};
exports.checkBarBorderRadius = checkBarBorderRadius;
const checkSize = _ref3 => {
  let {
    width,
    height,
    margin,
    padding
  } = _ref3;
  if (width < 30) {
    width = 30;
    margin = {
      top: margin.top,
      bottom: margin.bottom,
      left: 0,
      right: 0
    };
    if (padding) {
      padding = 0;
    }
  }
  if (height < 30) {
    height = 30;
    margin = {
      top: 0,
      bottom: 0,
      left: margin.left,
      right: margin.right
    };
  }
  if (width - margin.left - margin.right - (padding ? padding : 0) - (padding ? padding : 0) <= 0) {
    const over = (margin.left + margin.right - width + 30) / 2;
    margin = {
      ...margin,
      left: margin.left - over,
      right: margin.right - over
    };
    if (padding) {
      padding = 0;
    }
  }
  if (height - margin.top - margin.bottom <= 0) {
    const over = (margin.top + margin.bottom - height + 30) / 2;
    margin = {
      ...margin,
      top: margin.top - over,
      bottom: margin.bottom - over
    };
  }
  return {
    width,
    height,
    margin,
    padding
  };
};
exports.checkSize = checkSize;