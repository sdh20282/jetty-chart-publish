import { checkSize } from "../../utils/exception/check-common-exception";

const checkMargin = ({ margin }) => {
  margin.top ??= 60;
  margin.bottom ??= 70;
  margin.left ??= 80;
  margin.right ??= 120;

  return margin;
};

const checkInnerMargin = ({ innerMargin }) => {
  innerMargin.top ??= 0;
  innerMargin.bottom ??= 0;

  return innerMargin;
};

const normalBumpSetting = {
  // 기본 세팅
  normalSettings: {
    width: 500,
    height: 400,
    backgroundColor: "#fff",
    margin: { top: 50, bottom: 50, left: 80, right: 80 },
    innerMargin: { top: 0, bottom: 0 },
    // colorPalette: ["#202202", "#4E3708", "#772F13", "#9C212B", "#BC3473", "#C75CB7", "#BD88CD", "#C0B1D8", "#D6D6E6", "#F6F7F9"],
    colorPalette: [
      "#8ecae6",
      "#219ebc",
      "#2364aa",
      "#ffb703",
      "#fb8500",
      "#fb5607",
      "#ff006e",
      "#8338ec",
      "#6a994e",
      "#00f5d4",
      "#003e1f",
      "#92140c",
    ],
    padding: 0,
    reverse: false,
    horizontal: false,
  },
  // 범위 세팅
  scopeSettings: {
    autoScope: true,
    maxScope: 12,
    minScope: 1,
    showTopScope: true,
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
    lineRound: false,
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
    showEndLine: false,
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
    sideLineWidth: 2,
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
    sideLineWidth: 2,
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
    sideLineWidth: 2,
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
    sideLineWidth: 2,
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
    legendMove: 0,
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
    legendMove: 0,
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
    legendMove: 0,
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
    legendMove: 0,
  },
  // 설명 세팅
  legendSettings: {
    useLegend: true,
    position: "bottom-right", // bottom center top - left center right
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
    legendOnStart: true,
  },
  // 라인 세팅
  lineSettings: {
    lineColor: "#F1948A",
    lineOpacity: 1,
    lineWidth: 2,
    enablePoint: true,
    pointColor: null,
    pointSize: 4,
    pointBorderColor: null,
    pointBorderWidth: 2,
    // enablePointLabel: true,
    // showLabelOnHover: true,
    // pointLabelColor: "#000",
    // pointLabelSize: 12,
    // pointLabelOffsetX: 0,
    // pointLabelOffsetY: -5,
    // pointLabelWeight: 500,
    enableCurve: false,
    smoothDegree: 0.15,
    angleDegree: 1,
    strokeLinejoin: "miter", // "miter" | "round" | "bevel"
    strokeLinecap: "butt", // "butt" | "round" | "square",
    autoRank: false,
    xPadding: 1,
    xOuterPadding: 30,
    yOuterPadding: 30,
    activeLineWidth: 3,
    inactiveLineWidth: 10,
    activeOpacity: 1,
    inactiveOpacity: 0.2,
    startLabel: false,
    endLabel: false,
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
      translateTimingFunction: "ease",
    },
    axisXGridLineSettings: {
      useAnimation: true,
      renderType: "draw", // draw, fade
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "left-bottom",
      translateLine: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease",
    },
    axisYLabelSettings: {
      useAnimation: true,
      renderType: "fade", // fade
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "bottom",
      translateLabel: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease",
    },
    axisXLabelSettings: {
      useAnimation: true,
      renderType: "fade", // fade
      renderDuration: 0.4,
      renderStartDelay: 0,
      renderItemDelay: 0.1,
      renderTimingFunction: "ease",
      renderStartFrom: "left",
      translateLabel: true,
      translateDuration: 0.3,
      translateStartDelay: 0,
      translateItemDelay: 0,
      translateTimingFunction: "ease",
    },
    lineSettings: {
      useAnimation: true,
      appearType: "draw",
      appearDuration: 1,
      appearStartDelay: 0.1,
      appearItemDelay: 0.5,
      appearTimingFunction: "ease",
      moveLine: true,
      moveDuration: 2,
      moveStartDelay: 0,
      moveItemDelay: 0,
      moveTimingFunction: "ease",
    },
  },
};

export const checkNormalBump = ({
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
  animationSettings,
}) => {
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
    animationSettings,
  };

  Object.keys(normalBumpSetting).forEach((setting) => {
    result[setting] ??= {};

    if (setting === "animationSettings") {
      Object.keys(normalBumpSetting[setting]).forEach((animation) => {
        result[setting][animation] ??= {};

        Object.keys(normalBumpSetting[setting][animation]).forEach((detail) => {
          result[setting][animation][detail] ??= normalBumpSetting[setting][animation][detail];
        });
      });
    } else {
      Object.keys(normalBumpSetting[setting]).forEach((detail) => {
        result[setting][detail] ??= normalBumpSetting[setting][detail];
      });
    }
  });

  result.normalSettings.margin = checkMargin({ margin: result.normalSettings.margin });
  result.normalSettings.innerMargin = checkInnerMargin({ innerMargin: result.normalSettings.innerMargin });

  const checkedSize = checkSize({
    width: result.normalSettings.width,
    height: result.normalSettings.height,
    margin: result.normalSettings.margin,
    padding: result.normalSettings.padding,
  });

  result.normalSettings.width = checkedSize.width;
  result.normalSettings.height = checkedSize.height;
  result.normalSettings.margin = checkedSize.margin;
  result.normalSettings.padding = checkedSize.padding;

  return result;
};
