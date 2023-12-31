import { useRef } from "react";

import { LabelValueCommon } from "../../components/label-value-common/label-value-common";

import { checkNormalBar } from "../../common/bar-common/exception/check-normal-bar-exception";
import { getAutoScope, getUserScope } from "../../common/utils/scope/calculate-scope";
import { calculateBase, calculateBarBase, calculateLabelLocation } from "../../common/bar-common/utils/calculate-base-values";
import {
  calculateWarpperTransform,
  calculateBarWrapperTransform,
  calculateBarWrapperFrom,
  calculateBarWrapperTo,
  calculateBarTransform,
  calculateBarFrom,
  calculateBarTo,
  calculateLabelTransform,
  calculateLabelFrom,
  calculateLabelTo,
} from "../../common/bar-common/utils/calculate-bar-positions";

import styles from "./normal-bar.module.css";

/* eslint-disable complexity */
const NormalBar = ({
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
  animationSettings,
}) => {
  const prevBars = useRef({});
  const prevBarsTemp = useRef({});

  if (!data || data.length === 0) {
    return;
  }

  const result = checkNormalBar({
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
    animationSettings,
  });

  const { width, height, margin, innerMargin, padding, reverse, horizontal, colorPalette, useVariousColors } = result.normalSettings;
  const { autoScope, maxScope, minScope } = result.scopeSettings;
  let { showTopScope } = result.scopeSettings;
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
    labelInvisibleHeight,
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
    translateTimingFunction,
  } = result.animationSettings.barSettings;

  const scopeResult = autoScope ? getAutoScope({ data: data.map((d) => d.value) }) : getUserScope({ maxScope, minScope });
  let display = true;

  if (reverse) {
    scopeResult.scope.reverse();
  }

  if (!autoScope && !scopeResult.display) {
    display = false;
    showTopScope = false;
  }

  const { totalWidth, totalHeight, totalScope, drawWidth, drawHeight, lineHeight, barWidth, halfBarWidth, halfBarRealWidth, zeroHeight } =
    calculateBase({ horizontal, height, margin, width, scopeResult, autoScope, innerMargin, padding, length: data.length, barGap });

  const ms = new Date().valueOf();

  if (translateBar) {
    prevBars.current = { ...prevBarsTemp.current };
    prevBarsTemp.current = [];
  }

  return (
    <LabelValueCommon
      keys={keys}
      xAxis={data.map((d) => d.label)}
      yAxis={scopeResult.scope}
      xLegend={xLegend}
      yLegend={yLegend}
      normalSettings={{
        ...result.normalSettings,
        totalWidth,
        totalHeight,
        xAxisInitialPosition: halfBarWidth,
        xAxisWidth: barWidth,
        yAxisHeight: lineHeight,
        showTopScope,
      }}
      axisXGridLineSettings={result.axisXGridLineSettings}
      axisYGridLineSettings={result.axisYGridLineSettings}
      leftLabelSettings={result.leftLabelSettings}
      rightLabelSettings={result.rightLabelSettings}
      bottomLabelSettings={result.bottomLabelSettings}
      topLabelSettings={result.topLabelSettings}
      leftLegendSettings={result.leftLegendSettings}
      rightLegendSettings={result.rightLegendSettings}
      bottomLegendSettings={result.bottomLegendSettings}
      topLegendSettings={result.topLegendSettings}
      legendSettings={result.legendSettings}
      animationSettings={result.animationSettings}
    >
      <g transform={calculateWarpperTransform({ horizontal, reverse, innerMargin, padding })} className={styles.container}>
        {data.map((d, idx) => {
          const nowData = { ...d };

          if (reverse) {
            nowData.value = -nowData.value;
          }

          const { center, valueRatio, barHeight, borderRadius, realHeight, rectWidth, rectHeight, checkPositive } = calculateBarBase({
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
            halfBarRealWidth,
          });

          const { horizontalLabelLocation, verticalLabelLocation } = calculateLabelLocation({
            barHeight,
            realHeight,
            checkPositive,
            labelPosition,
            labelMargin,
          });

          const nowKey = `bar-${idx}`;

          prevBarsTemp.current[nowKey] = {
            center,
            width: rectWidth,
            height: rectHeight,
            zeroHeight,
          };

          let useTranslate = false;
          let translate = { center: 0, width: 0, height: 0, zeroHeight: 0 };

          if (translateBar && useAnimation) {
            if (Object.keys(prevBars.current).includes(String(nowKey))) {
              translate = {
                center: center - prevBars.current[nowKey].center,
                width: rectWidth - prevBars.current[nowKey].width,
                height: rectHeight - prevBars.current[nowKey].height,
                zeroHeight: zeroHeight - prevBars.current[nowKey].zeroHeight,
              };
              useTranslate = true;
            }
          }

          return (
            display && (
              <g
                key={"bar-" + ms + "-" + idx}
                transform={calculateBarWrapperTransform({
                  useAnimation,
                  useTranslate,
                  renderType,
                  horizontal,
                  zeroHeight,
                  center,
                  halfBarRealWidth,
                  drawHeight,
                  barHeight,
                })}
                className={useAnimation && useTranslate ? styles.translateGroup : ""}
                style={{
                  "--group-from": calculateBarWrapperFrom({
                    horizontal,
                    zeroHeight,
                    translate,
                    borderRadius,
                    center,
                    rectHeight,
                    rectWidth,
                    drawHeight,
                    barHeight,
                  }),
                  "--group-to": calculateBarWrapperTo({ horizontal, zeroHeight, translate, center, drawHeight, barHeight, halfBarRealWidth }),
                  "--animation-duration": `${translateDuration}s`,
                  "--animation-timing-function": translateTimingFunction,
                  "--animation-delay": `${translateStartDelay + translateItemDelay * (renderStartFrom === "left" ? idx : data.length - 1 - idx)}s`,
                }}
              >
                <rect
                  width={rectWidth}
                  height={rectHeight}
                  clipPath={
                    barOnlyUpperRadius
                      ? horizontal
                        ? checkPositive
                          ? `inset(0px 0px 0px ${borderRadius}px)`
                          : `inset(0px ${borderRadius}px 0px 0px)`
                        : checkPositive
                        ? `inset(0px 0px ${borderRadius}px 0px)`
                        : `inset(${borderRadius}px 0px 0px 0px)`
                      : ""
                  }
                  transform={calculateBarTransform({
                    useAnimation,
                    renderType,
                    useTranslate,
                    horizontal,
                    checkPositive,
                    barOnlyUpperRadius,
                    borderRadius,
                    barHeight,
                  })}
                  fill={useVariousColors ? colorPalette[idx % colorPalette.length] : colorPalette[0]}
                  fillOpacity={barOpacity}
                  rx={borderRadius}
                  ry={borderRadius}
                  stroke={useBarBorder ? barBorderColor : ""}
                  strokeOpacity={barBorderOpacity}
                  strokeWidth={useBarBorder ? barBorderWidth : "0"}
                  className={
                    useAnimation
                      ? useTranslate
                        ? styles.translateBar
                        : renderType.includes("grow")
                        ? styles.growBar
                        : renderType === "fade"
                        ? styles.fadeBar
                        : ""
                      : ""
                  }
                  style={{
                    "--bar-from": calculateBarFrom({
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
                    }),
                    "--bar-to": calculateBarTo({
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
                    }),
                    "--width-from": useTranslate ? `${rectWidth - translate.width}px` : horizontal ? `0px` : `${rectWidth}px`,
                    "--width-to": `${rectWidth}px`,
                    "--height-from": useTranslate ? `${rectHeight - translate.height}px` : horizontal ? `${rectHeight}px` : `0px`,
                    "--height-to": `${rectHeight}px`,
                    "--animation-duration": useTranslate
                      ? `${translateDuration}s`
                      : `${renderType === "grow" ? renderDuration * valueRatio : renderDuration}s`,
                    "--animation-delay": `${
                      (useTranslate ? translateStartDelay : renderStartDelay) +
                      (useTranslate ? translateItemDelay : renderItemDelay) * (renderStartFrom === "left" ? idx : data.length - 1 - idx)
                    }s`,
                    "--animation-timing-function": useTranslate ? translateTimingFunction : renderTimingFunction,
                  }}
                ></rect>
                {useLabel && realHeight > labelInvisibleHeight && (
                  <g
                    transform={calculateLabelTransform({
                      useAnimation,
                      useTranslate,
                      horizontal,
                      horizontalLabelLocation,
                      halfBarRealWidth,
                      verticalLabelLocation,
                      renderType,
                      drawHeight,
                      barHeight,
                      zeroHeight,
                    })}
                  >
                    <text
                      fontSize={labelSize}
                      fontWeight={labelWeight}
                      fill={labelColor}
                      opacity={labelOpacity}
                      dominantBaseline={
                        horizontal ? "middle" : labelPosition === "over" ? "ideographic" : labelPosition === "under" ? "hanging" : "middle"
                      }
                      textAnchor={horizontal ? (labelPosition === "over" ? "start" : labelPosition === "under" ? "end" : "middle") : "middle"}
                      className={
                        textRender && useAnimation
                          ? useTranslate
                            ? styles.translateText
                            : textRenderType.includes("grow")
                            ? styles.growText
                            : textRenderType === "fade"
                            ? styles.fadeText
                            : ""
                          : ""
                      }
                      style={{
                        "--text-from": calculateLabelFrom({
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
                          barHeight,
                        }),
                        "--text-to": calculateLabelTo({
                          useTranslate,
                          horizontal,
                          labelPosition,
                          checkPositive,
                          barHeight,
                          labelMargin,
                          translate,
                          halfBarRealWidth,
                        }),
                        "--animation-duration": useTranslate
                          ? `${translateDuration}s`
                          : `${renderType === "grow" ? textRenderDuration * valueRatio : textRenderDuration}s`,
                        "--animation-delay": `${
                          (useTranslate ? translateStartDelay : textRenderStartDelay) +
                          (useTranslate ? translateItemDelay : textRenderItemDelay) * (textRenderStartFrom === "left" ? idx : data.length - 1 - idx)
                        }s`,
                        "--animation-timing-function": useTranslate ? translateTimingFunction : textRenderTimingFunction,
                      }}
                    >
                      {reverse ? -nowData.value : nowData.value}
                    </text>
                  </g>
                )}
              </g>
            )
          );
        })}
      </g>
    </LabelValueCommon>
  );
};
/* eslint-enable complexity */

export { NormalBar };
