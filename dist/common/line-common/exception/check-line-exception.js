"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNormalLine = void 0;
var _colorPalette = require("../../utils/color/colorPalette");
var _checkCommonException = require("../../utils/exception/check-common-exception");
const checkMargin = _ref => {
  var _margin$top, _margin$bottom, _margin$left, _margin$right;
  let {
    margin
  } = _ref;
  (_margin$top = margin.top) !== null && _margin$top !== void 0 ? _margin$top : margin.top = 60;
  (_margin$bottom = margin.bottom) !== null && _margin$bottom !== void 0 ? _margin$bottom : margin.bottom = 70;
  (_margin$left = margin.left) !== null && _margin$left !== void 0 ? _margin$left : margin.left = 80;
  (_margin$right = margin.right) !== null && _margin$right !== void 0 ? _margin$right : margin.right = 120;
  return margin;
};
const checkInnerMargin = _ref2 => {
  var _innerMargin$top, _innerMargin$bottom;
  let {
    innerMargin
  } = _ref2;
  (_innerMargin$top = innerMargin.top) !== null && _innerMargin$top !== void 0 ? _innerMargin$top : innerMargin.top = 0;
  (_innerMargin$bottom = innerMargin.bottom) !== null && _innerMargin$bottom !== void 0 ? _innerMargin$bottom : innerMargin.bottom = 0;
  return innerMargin;
};
const normalLineSetting = {
  // 기본 세팅
  normalSettings: {
    width: 500,
    height: 400,
    backgroundColor: "#fff",
    margin: {
      top: 60,
      bottom: 70,
      left: 80,
      right: 100
    },
    innerMargin: {
      top: 0,
      bottom: 0
    },
    colorPalette: _colorPalette.colorPalette.jetty,
    padding: 0,
    reverse: false,
    horizontal: false
  },
  // 범위 세팅
  scopeSettings: {
    autoScope: true,
    maxScope: 700,
    minScope: -100,
    showTopScope: false
  },
  // y축 라인 세팅
  axisYGridLineSettings: {
    lineVisible: true,
    lineOpacity: 1,
    lineColor: "#d4d4d4",
    lineWidth: 1,
    lineDash: false,
    lineDashWidth: 5,
    lineDashGap: 3,
    lineRound: false
  },
  // x축 라인 세팅
  axisXGridLineSettings: {
    lineVisible: true,
    lineOpacity: 1,
    lineColor: "#d4d4d4",
    lineWidth: 1,
    lineDash: false,
    lineDashWidth: 5,
    lineDashGap: 3,
    lineRound: false,
    showEndLine: false
  },
  // 왼쪽 라벨 세팅
  leftLabelSettings: {
    useLabel: true,
    labelOnLeft: true,
    labelMargin: 5,
    labelSize: 12,
    labelWeight: 500,
    labelOpacity: 1,
    labelColor: "#777",
    labelRotate: 0,
    labelMove: 0,
    sideLineSize: 5,
    sideLineVisible: true,
    sideLineOpacity: 1,
    sideLineColor: "#aaa",
    sideLineWidth: 2
  },
  // 오른쪽 라벨 세팅
  rightLabelSettings: {
    useLabel: false,
    labelOnLeft: false,
    labelMargin: 5,
    labelSize: 12,
    labelWeight: 500,
    labelOpacity: 1,
    labelColor: "#777",
    labelRotate: 0,
    labelMove: 0,
    sideLineSize: 5,
    sideLineVisible: true,
    sideLineOpacity: 1,
    sideLineColor: "#aaa",
    sideLineWidth: 2
  },
  // 아래쪽 라벨 세팅
  bottomLabelSettings: {
    useLabel: true,
    labelOnBottom: true,
    labelMargin: 5,
    labelSize: 12,
    labelWeight: 500,
    labelOpacity: 1,
    labelColor: "#777",
    labelRotate: 0,
    labelMove: 0,
    sideLineSize: 5,
    sideLineVisible: true,
    sideLineOpacity: 1,
    sideLineColor: "#aaa",
    sideLineWidth: 2
  },
  // 위쪽 라벨 세팅
  topLabelSettings: {
    useLabel: false,
    labelOnBottom: false,
    labelMargin: 5,
    labelSize: 12,
    labelWeight: 500,
    labelOpacity: 1,
    labelColor: "#777",
    labelRotate: 0,
    labelMove: 0,
    sideLineSize: 5,
    sideLineVisible: true,
    sideLineOpacity: 1,
    sideLineColor: "#aaa",
    sideLineWidth: 2
  },
  // 왼쪽 설명 세팅
  leftLegendSettings: {
    useLegend: true,
    legendOnLeft: true,
    legendMargin: 50,
    legendSize: 14,
    legendWeight: 700,
    legendOpacity: 1,
    legendColor: "#333",
    legendReverse: false,
    legendMove: 0
  },
  // 오른쪽 설명 세팅
  rightLegendSettings: {
    useLegend: false,
    legendOnLeft: false,
    legendMargin: 40,
    legendSize: 14,
    legendWeight: 700,
    legendOpacity: 1,
    legendColor: "#333",
    legendReverse: false,
    legendMove: 0
  },
  // 아래쪽 설명 세팅
  bottomLegendSettings: {
    useLegend: true,
    legendOnBottom: true,
    legendMargin: 40,
    legendSize: 14,
    legendWeight: 700,
    legendOpacity: 1,
    legendColor: "#333",
    legendReverse: false,
    legendMove: 0
  },
  // 위쪽 설명 세팅
  topLegendSettings: {
    useLegend: false,
    legendOnBottom: false,
    legendMargin: 40,
    legendSize: 14,
    legendWeight: 700,
    legendOpacity: 1,
    legendColor: "#333",
    legendReverse: false,
    legendMove: 0
  },
  // 설명 세팅
  legendSettings: {
    useLegend: true,
    position: "bottom-right",
    // bottom center top - left center right
    xLocation: 20,
    yLocation: 0,
    directionColumn: true,
    itemWidth: 80,
    itemMargin: 2,
    symbolSize: 16,
    symbolRadius: 3,
    symbolMargin: 5,
    symbolOpacity: 1,
    legendSize: 12,
    legendWeight: 400,
    legendOpacity: 1,
    legendColor: "#aaa",
    legendOnStart: true
  },
  // 라인 세팅
  lineSettings: {
    lineOpacity: 1,
    lineWidth: 2,
    enablePoint: true,
    pointColor: "#000",
    pointColorFollowLineColor: true,
    pointSize: 2,
    pointBorderColor: "#666",
    pointBorderColorFollowLineColor: true,
    pointBorderWidth: 2,
    enablePointLabel: false,
    showLabelOnHover: false,
    pointLabelColor: "#000",
    pointLabelSize: 12,
    pointLabelOffsetX: 0,
    pointLabelOffsetY: -10,
    pointLabelWeight: 500,
    enableArea: false,
    areaColorFollowLineColor: true,
    areaOpacity: 0.5,
    enableCurve: false,
    smoothDegree: 0.15,
    angleDegree: 1,
    strokeLinejoin: "miter",
    // "miter" | "round" | "bevel"
    strokeLinecap: "butt" // "butt" | "round" | "square"
  },

  animationSettings: {
    axisYGridLineSettings: {
      useAnimation: true,
      renderType: "draw",
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "left-bottom",
      translateLine: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease"
    },
    axisXGridLineSettings: {
      useAnimation: true,
      renderType: "draw",
      // draw, fade
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "left-bottom",
      translateLine: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease"
    },
    axisYLabelSettings: {
      useAnimation: true,
      renderType: "fade",
      // fade
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "bottom",
      translateLabel: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease"
    },
    axisXLabelSettings: {
      useAnimation: true,
      renderType: "fade",
      // fade
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "left",
      translateLabel: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease"
    },
    generalSettings: {
      useAnimation: true,
      useGridAnimation: true,
      renderReverse: false,
      // renderLineSingly: true,
      translateReverse: false
    },
    lineSettings: {
      useLineAnimation: true,
      lineRenderType: "draw",
      lineRenderDuration: 1,
      lineRenderStartDelay: 0,
      lineRenderItemDelay: 0,
      lineRenderTimingFunction: "ease",
      translateLine: true,
      translateLineItemDelay: 0,
      translateLineDuration: 0.5,
      translateLineStartDelay: 0,
      translateLineTimingFunction: "ease"
    },
    pointSettings: {
      usePointAnimation: true,
      pointRenderType: "draw",
      pointRenderDuration: 0.5,
      pointLineRenderDuration: 1,
      pointRenderStartDelay: 0,
      pointRenderItemDelay: 0,
      pointRenderTimingFunction: "ease",
      translatePoint: true,
      translatePointItemDelay: 0,
      translatePointDuration: 0.5,
      translatePointStartDelay: 0,
      translatePointTimingFunction: "ease"
    },
    areaSettings: {
      useAreaAnimation: true,
      areaRenderType: "draw",
      areaRenderDuration: 1,
      areaRenderStartDelay: 0,
      areaRenderItemDelay: 0,
      areaRenderTimingFunction: "ease",
      translateArea: true,
      translateAreaItemDelay: 0,
      translateAreaDuration: 0.5,
      translateAreaStartDelay: 0,
      translateAreaTimingFunction: "ease"
    }
  }
};
const checkNormalLine = _ref3 => {
  let {
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
    lineSettings,
    animationSettings
  } = _ref3;
  const result = {
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
    lineSettings,
    animationSettings
  };
  Object.keys(normalLineSetting).forEach(setting => {
    var _result$setting;
    (_result$setting = result[setting]) !== null && _result$setting !== void 0 ? _result$setting : result[setting] = {};
    if (setting === "animationSettings") {
      Object.keys(normalLineSetting[setting]).forEach(animation => {
        var _result$setting2, _result$setting2$anim;
        (_result$setting2$anim = (_result$setting2 = result[setting])[animation]) !== null && _result$setting2$anim !== void 0 ? _result$setting2$anim : _result$setting2[animation] = {};
        Object.keys(normalLineSetting[setting][animation]).forEach(detail => {
          var _result$setting$anima, _result$setting$anima2;
          (_result$setting$anima2 = (_result$setting$anima = result[setting][animation])[detail]) !== null && _result$setting$anima2 !== void 0 ? _result$setting$anima2 : _result$setting$anima[detail] = normalLineSetting[setting][animation][detail];
        });
      });
    } else {
      Object.keys(normalLineSetting[setting]).forEach(detail => {
        var _result$setting3, _result$setting3$deta;
        (_result$setting3$deta = (_result$setting3 = result[setting])[detail]) !== null && _result$setting3$deta !== void 0 ? _result$setting3$deta : _result$setting3[detail] = normalLineSetting[setting][detail];
      });
    }
  });
  result.normalSettings.margin = checkMargin({
    margin: result.normalSettings.margin
  });
  result.normalSettings.innerMargin = checkInnerMargin({
    innerMargin: result.normalSettings.innerMargin
  });
  const checkedSize = (0, _checkCommonException.checkSize)({
    width: result.normalSettings.width,
    height: result.normalSettings.height,
    margin: result.normalSettings.margin,
    padding: result.normalSettings.padding
  });
  result.normalSettings.width = checkedSize.width;
  result.normalSettings.height = checkedSize.height;
  result.normalSettings.margin = checkedSize.margin;
  result.normalSettings.padding = checkedSize.padding;
  return result;
};
exports.checkNormalLine = checkNormalLine;