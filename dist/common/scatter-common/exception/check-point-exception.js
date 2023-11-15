"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNormalPoint = void 0;
var _colorPalette = require("../../utils/color/colorPalette");
var _checkCommonException = require("../../utils/exception/check-common-exception");
const normalPointSetting = {
  // 기본 세팅
  normalSettings: {
    width: 500,
    height: 400,
    backgroundColor: "#fff",
    margin: {
      top: 60,
      bottom: 60,
      left: 70,
      right: 120
    },
    innerMargin: {
      top: 0,
      bottom: 0
    },
    colorPalette: _colorPalette.colorPalette["jetty juice"],
    padding: 0,
    xReverse: false,
    yReverse: false,
    showTopScope: true
  },
  // 범위 세팅
  scopeSettings: {
    xAutoScope: true,
    yAutoScope: true,
    xMaxScope: 100,
    xMinScope: 0,
    yMaxScope: 100,
    yMinScope: 0
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
    legendMargin: 40,
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
    yLocation: -30,
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
  // 포인트 세팅
  pointSettings: {
    pointSize: 1,
    tooltipOn: true,
    xName: "",
    yName: "",
    pointRenderTime: 0.1
  },
  // 애니메이션 세팅
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
    }
  }
};
const checkNormalPoint = _ref => {
  let {
    normalSettings,
    scopeSettings,
    axisXGridLineSettings,
    axisYGridLineSettings,
    leftLabelSettings,
    rightLabelSettings,
    bottomLabelSettings,
    topLabelSettings,
    pointSettings,
    animationSettings
  } = _ref;
  const result = {
    normalSettings,
    scopeSettings,
    axisXGridLineSettings,
    axisYGridLineSettings,
    leftLabelSettings,
    rightLabelSettings,
    bottomLabelSettings,
    topLabelSettings,
    pointSettings,
    animationSettings
  };
  Object.keys(normalPointSetting).forEach(setting => {
    var _result$setting;
    (_result$setting = result[setting]) !== null && _result$setting !== void 0 ? _result$setting : result[setting] = {};
    if (setting === "animationSettings") {
      Object.keys(normalPointSetting[setting]).forEach(animation => {
        var _result$setting2, _result$setting2$anim;
        (_result$setting2$anim = (_result$setting2 = result[setting])[animation]) !== null && _result$setting2$anim !== void 0 ? _result$setting2$anim : _result$setting2[animation] = {};
        Object.keys(normalPointSetting[setting][animation]).forEach(detail => {
          var _result$setting$anima, _result$setting$anima2;
          (_result$setting$anima2 = (_result$setting$anima = result[setting][animation])[detail]) !== null && _result$setting$anima2 !== void 0 ? _result$setting$anima2 : _result$setting$anima[detail] = normalPointSetting[setting][animation][detail];
        });
      });
    } else {
      Object.keys(normalPointSetting[setting]).forEach(detail => {
        var _result$setting3, _result$setting3$deta;
        (_result$setting3$deta = (_result$setting3 = result[setting])[detail]) !== null && _result$setting3$deta !== void 0 ? _result$setting3$deta : _result$setting3[detail] = normalPointSetting[setting][detail];
      });
    }

    // Object.keys(normalPointSetting[setting]).forEach((detail) => {
    //   result[setting][detail] ??= normalPointSetting[setting][detail];
    // });
  });

  result.normalSettings.margin = (0, _checkCommonException.checkMargin)({
    margin: result.normalSettings.margin
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
exports.checkNormalPoint = checkNormalPoint;