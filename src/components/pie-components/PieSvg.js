// 파이 차트의 SVG를 그리는 컴포넌트
import getPiePiece from "../../common/pie-common/utils/getPiePiece";
import { divideRatio } from "../../common/pie-common/utils/getDivideRatio";
// import { PieDebugMode } from "../testFile/PieDebugMode";
import { setExceptionValue } from "../../common/pie-common/utils/setExceptionValue";
import PieCircleBackground from "./PieCircleBackground";
import PieDonutBackground from "./PieDonutBackground";
import ToolTipCommon from "../tooltip/ToolTipCommon";
import { DrawLegends } from "../legend/draw-legends";
import { getSortedColor } from "../../common/pie-common/utils/getSortedColor";
import { useState } from "react";
import PiePiecePath from "./PiePiecePath";
import PiePieceLabel from "./PiePieceLabel";
import PiePieceArcLinkLabel from "./PiePieceArcLinkLabel";

const PieSvg = ({
  data,
  generalSettings,
  pieSettings,
  labelSettings,
  arcLinkLabelSettings,
  animationSettings,
  legendSettings,
  // debugSettings,
}) => {
  setExceptionValue({ pieSettings, length: data.length });
  data = divideRatio({
    data,
    padAngle: pieSettings.padAngle,
    startAngle: pieSettings.startAngle,
    useAngle: pieSettings.useAngle,
    sortByValue: pieSettings.sortByValue,
  });
  const newColor = getSortedColor({ data, color: pieSettings.color });
  const newStrokeColor = getSortedColor({ data, color: pieSettings.strokeColor });
  const newArcLinkLabelTextColor = getSortedColor({
    data,
    color: arcLinkLabelSettings.arcLinkLabelTextColor,
  });
  const newArcLinkLabelLineColor = getSortedColor({
    data,
    color: arcLinkLabelSettings.arcLinkLabelLineColor,
  });
  const pieceData = getPiePiece({
    data,
    pieRadius: pieSettings.pieRadius,
    innerRadius: pieSettings.innerRadius,
    cornerRadius: pieSettings.cornerRadius,
    startAngle: pieSettings.startAngle,
    labelDistance: labelSettings.labelDistance,
    arcLinkLabelLineDistance: arcLinkLabelSettings.arcLinkLabelLineDistance,
    arcLinkLabelStartLine: arcLinkLabelSettings.arcLinkLabelStartLine,
    arcLinkLabelEndLine: arcLinkLabelSettings.arcLinkLabelEndLine,
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  if (!animationSettings.animationOn) {
    animationSettings.animationDuration = 0;
    animationSettings.animationDelay = 0;
    animationSettings.animationScale = 1;
  }
  console.log(arcLinkLabelSettings);
  return (
    <svg
      id="pie"
      width={generalSettings.width - generalSettings.paddingLeft - generalSettings.paddingRight}
      height={generalSettings.height - generalSettings.paddingTop - generalSettings.paddingBottom}
      viewBox="-2 -2 4 4"
      className="pie"
      style={{
        backgroundColor: generalSettings.backgroundColor,
        padding:
          generalSettings.paddingTop +
          "px " +
          generalSettings.paddingRight +
          "px " +
          generalSettings.paddingBottom +
          "px " +
          generalSettings.paddingLeft +
          "px ",
        "--animation-duration": animationSettings.animationDuration + "s",
        "--animation-delay": animationSettings.animationDelay + "s",
        "--animation-timing-function": animationSettings.animationTiming,
        "--animation-scale": animationSettings.animationScale,
      }}
      opacity={generalSettings.pieOpacity}
    >
      <g>
        <PieCircleBackground
          pieRadius={pieSettings.pieRadius}
          pieBackgroundColor={generalSettings.pieBackgroundColor}
          circleOpacity={generalSettings.circleOpacity}
        />
        <PieDonutBackground
          pieRadius={pieSettings.pieRadius}
          innerRadius={pieSettings.innerRadius}
          donutBackgroundColor={generalSettings.donutBackgroundColor}
          donutOpacity={generalSettings.donutOpacity}
        />
      </g>

      {pieceData.map((piece, index) => (
        <PiePiecePath
          pieRadius={piece.pieRadius}
          cornerInnerRadius={piece.cornerInnerRadius}
          cornerOuterRadius={piece.cornerOuterRadius}
          innerRadius={piece.innerRadius}
          calcVertexGroup={piece.calcVertexGroup}
          tangentLineGroup={piece.tangentLineGroup}
          isLargeArcGroup={piece.isLargeArcGroup}
          color={newColor[index % pieSettings.color.length]}
          strokeColor={newStrokeColor[index % pieSettings.strokeColor.length]}
          strokeWidth={pieSettings.strokeWidth}
          strokeOpacity={pieSettings.strokeOpacity}
          pieceOpacity={generalSettings.pieceOpacity}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          hoveredIndex={hoveredIndex}
          index={index}
          key={piece.index}
        />
      ))}

      {pieceData.map((piece, index) => (
        <g
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={hoveredIndex === index && "pie-piece__hover"}
        >
          <PiePieceLabel
            x={piece.labelLocation.x}
            y={piece.labelLocation.y}
            degrees={piece.labelLocation.degrees}
            labelColor={labelSettings.labelColor}
            labelFontFamily={labelSettings.labelFontFamily}
            labelFontSize={labelSettings.labelFontSize}
            labelFontStyle={labelSettings.labelFontStyle}
            labelFontWeight={labelSettings.labelFontWeight}
            labelMoveX={labelSettings.labelMoveX}
            labelMoveY={labelSettings.labelMoveY}
            labelIsRotate={labelSettings.labelIsRotate}
            labelText={labelSettings.labelText}
            labelSkipRatio={labelSettings.labelSkipRatio}
            labelIsUse={labelSettings.labelIsUse}
            labelDegrees={labelSettings.labelDegrees}
            labelOpacity={labelSettings.labelOpacity}
            label={piece.label}
            ratio={piece.ratio}
            value={piece.value}
            index={index}
            key={piece.index}
          />
          <PiePieceArcLinkLabel
            arcLinkLabelTextColor={
              newArcLinkLabelTextColor[index % arcLinkLabelSettings.arcLinkLabelTextColor.length]
            }
            arcLinkLabelFontSize={arcLinkLabelSettings.arcLinkLabelFontSize}
            arcLinkLabelFontWeight={arcLinkLabelSettings.arcLinkLabelFontWeight}
            arcLinkLabelFontFamily={arcLinkLabelSettings.arcLinkLabelFontFamily}
            arcLinkLabelFontStyle={arcLinkLabelSettings.arcLinkLabelFontStyle}
            arcLinkLabelText={arcLinkLabelSettings.arcLinkLabelText}
            arcLinkLabelLocation={piece.arcLinkLabelLocation}
            arcLinkLabelTextDistance={arcLinkLabelSettings.arcLinkLabelTextDistance}
            arcLinkLabelTextOpacity={arcLinkLabelSettings.arcLinkLabelTextOpacity}
            arcLinkLabelLineColor={
              newArcLinkLabelLineColor[index % arcLinkLabelSettings.arcLinkLabelLineColor.length]
            }
            arcLinkLabelSkipAngle={arcLinkLabelSettings.arcLinkLabelSkipAngle}
            arcLinkLabelLineSize={arcLinkLabelSettings.arcLinkLabelLineSize}
            arcLinkLabelLineOpacity={arcLinkLabelSettings.arcLinkLabelLineOpacity}
            arcLinkLabelIsUse={arcLinkLabelSettings.arcLinkLabelIsUse}
            value={piece.value}
            label={piece.label}
            ratio={piece.ratio}
            index={index}
            key={piece.index}
          />
        </g>
      ))}

      {/* <ToolTipCommon /> */}
      <DrawLegends
        keys={data.map((item) => item.label)}
        normalSettings={{
          width: 0,
          height: 0,
          colorPalette: newColor,
          margin: {
            top: legendSettings.marginTop,
            right: legendSettings.marginRight,
            bottom: legendSettings.marginBottom,
            left: legendSettings.marginLeft,
          },
        }}
        legendSettings={legendSettings}
      />
    </svg>
  );
};

export default PieSvg;
