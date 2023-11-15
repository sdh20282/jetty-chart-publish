"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalMap = void 0;
var _react = require("react");
var _normalMapModule = _interopRequireDefault(require("./normal-map.module.css"));
var _checkNormalMapException = require("../../common/map-common/exception/check-normal-map-exception");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable complexity */const NormalMap = _ref => {
  let {
    data,
    normalSetting,
    gagueBarSetting,
    tooltipSetting
  } = _ref;
  const result = (0, _checkNormalMapException.checkMapChart)({
    normalSetting,
    gagueBarSetting,
    tooltipSetting
  });
  const {
    backgroundColor,
    divide,
    colorCode,
    width,
    zoomMagnification,
    usePercentageColor,
    zoomOn,
    animationOn,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
  } = result.normalSetting;
  const {
    useGagueBar,
    useValueLavel,
    pointerSize,
    pointerColor,
    gagueBarWidth,
    gagueBarHeight,
    gagueValueFontSize,
    gagueValueFontFamily,
    gagueValueFontWeight,
    valueLavel
  } = result.gagueBarSetting;
  const {
    useFollowColor,
    useKorea,
    tooltipWidth,
    tooltipBackGroundColor,
    tooltipBorderRadius,
    tooltipBorder,
    tooltipBoxShadow,
    cityNameFontSize,
    cityNameColor,
    cityNameFontWeight,
    cityValueColor,
    cityValueFontWeight,
    cityValueFontSize,
    descriptionColor,
    descriptionFontSize,
    descriptionFontWeight,
    descriptionFontFamily,
    tooltipOpacity,
    useTooltipCol
  } = result.tooltipSetting;
  const colorPallette = [["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6"], ["#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316"], ["#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444"], ["#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b"], ["#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e"], ["#f3e8ff", "#e9d5ff", "#c084fc", "#a855f7", "#7e22ce"], ["#fefce8", "#fef08a", "#fde047", "#facc15", "#eab308"], ["#f5f5f4", "#d6d3d1", "#a8a29e", "#78716c", "#57534e"], ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"], ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"], ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"], ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF"], ["#080708", "#3772FF", "#DF2935", "#FDCA40", "#E6E8E6"], ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff00", "#00ff80", "#00ffff", "#0080ff", "#0000ff", "#8000ff", "#ff00ff", "#ff0080"], ["#EC5BCF", "#F65AA6", "#FF5C77", "#FF7A66", "#FFB070", "#FFE07A", "#F5FF85", "#D2FF8F", "#B6FF99", "#A3FFA6"], ["#202202", "#4E3708", "#772F13", "#9C212B", "#BC3473", "#C75CB7", "#BD88CD", "#C0B1D8", "#D6D6E6", "#F6F7F9"], ["#1A1E05", "#484B0C", "#786C12", "#A68017", "#D5871A", "#E9863A", "#F08D66", "#F6A093", "#FAC1C1", "#FEF1F3"], ["#FEC5BB", "#FCD5CE", "#FAE1DD", "#F8EDEB", "#E8E8E4", "#D8E2DC", "#ECE4DB", "#FFE5D9", "#FFD7BA", "#FEC89A"], ["#03071E", "#370617", "#6A040F", "#9D0208", "#D00000", "#DC2F02", "#E85D04", "#F48C06", "#FAA307", "#FFBA08"]];

  // 컬러코드 0: 파랑 , 1: 오렌지, 2: 레드, 3: 블루그레이, 4: 그린
  const color = colorPallette[colorCode];
  let useColor;
  // zMap : 게이지 바를 그려줄 좌표값.
  const zMap = [];
  if (divide === 2) {
    useColor = [color[0], color[2]];
    let y = 1000;
    for (let i = 0; i < divide; i++) {
      const z = y - (200 + gagueBarHeight) / divide;
      zMap.push([y, z]);
      y = z;
    }
  }
  // for 문을 돌면서 게이지의 시작점인 x,y 좌표를 기준으로 다음 좌표값들을 넣어준다. 200 + gagueBarHeight를 해준 이유는 게이지의 최소 크기가 200 이기때문.

  if (divide === 3) {
    useColor = [color[0], color[2], color[4]];
    let y = 1000;
    for (let i = 0; i < divide; i++) {
      const z = y - (200 + gagueBarHeight) / divide;
      zMap.push([y, z]);
      y = z;
    }
  }
  if (divide === 4) {
    useColor = [color[1], color[2], color[3], color[4]];
    let y = 1000;
    for (let i = 0; i < divide; i++) {
      const z = y - (200 + gagueBarHeight) / divide;
      zMap.push([y, z]);
      y = z;
    }
  }
  if (divide === 5) {
    useColor = color;
    let y = 1000;
    for (let i = 0; i < divide; i++) {
      const z = y - (200 + gagueBarHeight) / divide;
      zMap.push([y, z]);
      y = z;
    }
  }
  let max = 0;
  data.forEach(city => {
    if (city.value > max) {
      max = city.value;
    }
  });
  let min = 2103128142847128;
  data.forEach(d => {
    if (d.value < min) {
      min = d.value;
    }
  });
  const citycolor = data.map(city => {
    const percentage = city.value / max * 100;
    if (divide === 5) {
      if (percentage.toFixed(0) >= 20) {
        city.colorCode = 1;
      }
      if (percentage.toFixed(0) >= 40) {
        city.colorCode = 2;
      }
      if (percentage.toFixed(0) >= 60) {
        city.colorCode = 3;
      }
      if (percentage.toFixed(0) >= 80) {
        city.colorCode = 4;
      }
    }
    if (divide === 4) {
      if (percentage.toFixed(0) >= 25) {
        city.colorCode = 2;
      }
      if (percentage.toFixed(0) >= 50) {
        city.colorCode = 3;
      }
      if (percentage.toFixed(0) >= 75) {
        city.colorCode = 4;
      }
    }
    if (divide === 3) {
      if (percentage.toFixed(0) >= 33) {
        city.colorCode = 2;
      }
      if (percentage.toFixed(0) >= 66) {
        city.colorCode = 4;
      }
    }
    if (divide === 2) {
      if (percentage.toFixed(0) >= 5) {
        city.colorCode = 3;
      }
    }
    return city;
  });
  // 컬러코드 지정

  const [mousePointer, setMousePointer] = (0, _react.useState)(25);
  const [tooltipOn, setTooltipOn] = (0, _react.useState)(false);
  const [tooltipDescription, settooltipDescription] = (0, _react.useState)("");
  const [tooltipCity, setTooltipCity] = (0, _react.useState)("");
  const [tooltipValue, setTooltipValue] = (0, _react.useState)("");
  const [scale, setScale] = (0, _react.useState)(1);
  const [firstX, setFirstX] = (0, _react.useState)();
  const [targetColor, setTargetColor] = (0, _react.useState)("");
  let ToolW = tooltipWidth / scale;
  let ToolH = 1064 / scale;
  let cityFontS = cityNameFontSize / scale;
  let cityValueFontS = cityValueFontSize / scale;
  let decripFontS = descriptionFontSize / scale;
  const svgRef = (0, _react.useRef)(null);
  const mapRef = (0, _react.useRef)(null);
  const PathelementsRef = (0, _react.useRef)([]);
  const tooltipRef = (0, _react.useRef)(null);
  const tooltipDiv = (0, _react.useRef)(null);
  const pathRef = el => {
    if (el && !PathelementsRef.current.includes(el)) {
      PathelementsRef.current.push(el);
    }
  };
  function convertHexToRGBA(hexCode, opacity) {
    // 헥사 코드에서 R, G, B 값을 추출합니다.
    let r = parseInt(hexCode.slice(1, 3), 16);
    let g = parseInt(hexCode.slice(3, 5), 16);
    let b = parseInt(hexCode.slice(5, 7), 16);

    // RGBA 형식의 색상 문자열을 반환합니다.
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
  }
  function pathEvent(e) {
    const pathId = e.target.id;
    const value = citycolor.filter(city => {
      return city.name === pathId;
    });
    setTooltipOn(true);
    if (value.length > 0) {
      const cityValue = value[0].value;
      let cityName;
      if (useKorea) {
        cityName = value[0].inKorea;
      } else {
        cityName = value[0].name;
      }
      let color = e.target.getAttribute("fill");
      let opacolor = convertHexToRGBA(color, 0.5);
      const cityDescription = value[0].description;
      const mousePercentage = (200 + gagueBarHeight) * (cityValue / max);
      setTargetColor(opacolor);
      setMousePointer(mousePercentage);
      setTooltipCity(cityName);
      setTooltipValue(cityValue);
      settooltipDescription(cityDescription);
    } else {
      console.log("");
    }
  }
  function pathOut() {
    setTooltipOn(false);
  }
  (0, _react.useEffect)(() => {
    if (!data) {
      return;
    }
    const mySVG = svgRef.current;
    setFirstX(mySVG.getBoundingClientRect().x);
    const mapSvg = PathelementsRef;
    mapSvg.current.forEach(path => {
      path.addEventListener("mouseover", pathEvent);
    });
    const outMap = mapRef;
    outMap.current.addEventListener("mouseout", pathOut);
  }, [data]);
  function tooltipMove(e) {
    const main = mapRef.current;
    // 적용될 svg 태그의 .id 값을 선택합니다.
    const tooltipObject = tooltipRef.current;
    // 툴팁이 입력될 tooltipbox 를 선택합니다.
    const rect = main.getBoundingClientRect();
    // 선택된 svg 태그의 절대 위치를 가져옵니다.
    const rectTooltip = tooltipObject.getBoundingClientRect();
    // 선택된 tooltip 태그의 절대 위치를 가져옵니다.
    // 좌표값을 구하는데 오른쪽과 왼쪽을 나눠서 구해줍니다. 툴팁이 뜨는방향을 정하기 위함.
    const realativeTooltip = tooltipDiv.current;
    const realativetooltipMaxHeight = realativeTooltip.getBoundingClientRect().height;
    const xRight = 20 / scale + (e.clientX - rect.x) * (1048 / scale / width);
    // svg 의 실제 width 와 viewBox 의 비율을 맞춰줍니다. 1048 << 뷰박스 크기 , width 사용자가 입력한 width 크기
    const xLeft = -20 / scale + (e.clientX - rect.x) * (1048 / scale / width) - rectTooltip.width * (1048 / scale / width);
    const yTop = -20 / scale + (e.clientY - rect.y) * (1064 / rect.height);
    const yBottom = -20 / scale + (e.clientY - rect.y) * (1064 / rect.height) - realativetooltipMaxHeight * (1064 / rect.height);
    // svg 의 실제 height 와 viewBox 의 비율을 맞춰줍니다. 1064 << 뷰박스 크기 , height 사용자가 입력한 width 크기
    if (scale === 1) {
      if (e.clientX < rect.x + rect.width / 2 && e.clientY < rect.y + rect.height / 2) {
        tooltipObject.style.transform = "translate(".concat(xRight, "px,").concat(yTop, "px)");
      }
      if (e.clientX < rect.x + rect.width / 2 && e.clientY > rect.y + rect.height / 2) {
        tooltipObject.style.transform = "translate(".concat(xRight, "px,").concat(yBottom, "px)");
      }
      if (e.clientX > rect.x + rect.width / 2 && e.clientY < rect.y + rect.height / 2) {
        tooltipObject.style.transform = "translate(".concat(xLeft, "px,").concat(yTop, "px)");
      }
      if (e.clientX > rect.x + rect.width / 2 && e.clientY > rect.y + rect.height / 2) {
        tooltipObject.style.transform = "translate(".concat(xLeft, "px,").concat(yBottom, "px)");
      }
    } else {
      if (e.clientX < firstX + width / 2) {
        tooltipObject.style.transform = "translate(".concat(xRight, "px,").concat(yBottom, "px)");
      }
      if (e.clientX > firstX + width / 2) {
        tooltipObject.style.transform = "translate(".concat(xLeft, "px,").concat(yBottom, "px)");
      }
    }
    // 위치조정
  }

  (0, _react.useEffect)(() => {
    if (!svgRef.current) {
      return;
    }
    svgRef.current.addEventListener("mousemove", tooltipMove);
    return () => {
      svgRef.current.removeEventListener("mousemove", tooltipMove);
    };
  }, [tooltipOn, scale, width, firstX]);
  (0, _react.useEffect)(() => {
    if (zoomOn) {
      const mapSvg = svgRef.current;
      let onZoom = true;
      let animationFrameId;

      // eslint-disable-next-line no-inner-declarations
      function animateViewBox(targetViewBox, duration) {
        const startTime = performance.now();
        const initialViewBox = mapSvg.getAttribute("viewBox").split(" ").map(Number);
        // 현재 뷰박스 값 얻어서 숫자로 받기  [0, 0, 1048, 1064] 이렇게 배열로 옴

        const targetViewBoxValues = targetViewBox.split(" ").map(Number);
        //  목표 뷰박스 값 얻어서 숫자로 받기  [316.73062472873266, -93.81126234266492, 582.2222222222222, 591.1111111111111] 이렇게 배열로 옴

        function step(timestamp) {
          const elapsedTime = timestamp - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          // 애니메이션 진행정도 0엣 1사이 값 0 시작 1이 되면 종료

          const currentViewBox = initialViewBox.map((initialValue, index) => {
            const targetValue = targetViewBoxValues[index];
            return initialValue + (targetValue - initialValue) * progress;
          }).join(" ");

          // 현재viewBox 값을 map 함수로 돌면서 좌표 x, y , viewX, viewY 에  목표 (ViewBox값 xDest, yDest , viewX Dest , viewY Dest - 현재값) * 진행정도 만큼 더해준다.

          mapSvg.setAttribute("viewBox", currentViewBox);
          // 위에서 정해준 값이 다시 현재의 viewBox 값이 된다.

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          }
          // 만약 progress가 1 즉 , 완료되지 않았다면 재귀적으로 requestAnimationFrame(step) 를 불러온다.
        }

        animationFrameId = requestAnimationFrame(step);
        // 처음 한번 실행 될 때 requestAnimationFrame에 (step) 함수를 예약한다. 그리고 animationFrameId 이 return 받는값은 식별자로 사용하고 애니매이션 중지시에 사용할 수 있다.
      }
      // eslint-disable-next-line no-inner-declarations
      function zoomin(e) {
        let pt = mapSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        let svgP = pt.matrixTransform(mapSvg.getScreenCTM().inverse());
        let newScale = onZoom ? zoomMagnification : 1;
        let width = 1048 / newScale;
        let height = 1064 / newScale;
        let x = svgP.x - width / 2;
        let y = svgP.y - height / 2;
        let targetViewBox = onZoom ? "".concat(x, " ").concat(y, " ").concat(width, " ").concat(height) : "0 0 1048 1064";
        animateViewBox(targetViewBox, 350); // << 여기서 두번째 숫자가 duration 애니메이션 지연시간

        onZoom = !onZoom;
        setScale(newScale);
      }
      mapSvg.addEventListener("click", zoomin);
      return () => {
        mapSvg.removeEventListener("click", zoomin);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [zoomMagnification, zoomOn]);
  return (
    /*#__PURE__*/
    // width 랑 height 데이타 값으로 받기
    (0, _jsxRuntime.jsx)("div", {
      style: {
        width: "".concat(width, "px"),
        height: "100%",
        backgroundColor: "".concat(backgroundColor),
        marginTop: "".concat(marginTop, "px"),
        marginLeft: "".concat(marginLeft, "px"),
        marginRight: "".concat(marginRight, "px"),
        marginBottom: "".concat(marginBottom, "px")
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
        ref: svgRef,
        fill: "none",
        viewBox: "0 0 1048 1064",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
          ref: mapRef,
          className: "group",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            ref: pathRef,
            className: "path",
            id: "incheon",
            fill: usePercentageColor ? color[citycolor[1].colorCode] : citycolor[1].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m312 227 1 2-1 1-2 1h0l-3 1h-1l-5 2-2 2-2 2-6 5h-4l-1-3-1-1-1 1v-2h-1l-2 2-1-1h-2l1-1v-1l-2-2v-3h1l2 1 7-5 5-1h3l4-1 1-5 2-1 2 2 2 1 2 1h2l1 2 1 1Zm22 25v-2l-8-1-4 5-4-3 1-3 2-4-1-2-5-3v-6l1-3 5-1 1-1v-2h-2v2h-4v-2l-1-4 1-5h15l10 9v5l1 3 3 2 1 3-1 5-2 4-4 2-5 2Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "kangwon",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[2].colorCode] : citycolor[2].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m762 403-2-1-5-1-5 3-11-5 2-4-1-5-1-5v-5l2-5 1-5-1-2-1-1v-5h-11l-4-2-3-2-2-4-1-4-5-2-3-5-1-7 1-5 3-2 3-1 4 2 4-3-1-4-5-3-6-1-4 2-4 1-6-3-6-1-2 1h-2l-1-2-2-1-5 4-5 2v-7l-2-2h-3l-3-4-4-1-4 2-3 4 1 5-1 4v4h-5l-4-1-4-2-4-2-3-2-4-1-4-1h-4l-4-3-4-3h-3l-4 1-4 1h-3l-1-3-3-3v-3l-1-1h-8l-4 2-2 1h-1l-3-2-1-1 2-5 5-3 2-4-3-1-9-1-9-4-4 3-3 2-3-1-4 3-5 3-5 1-2-3v-4l-6-7-8 3-3 4 1 9-3 3-2 1-1 1-2-1-5-1-5 1 1-9-17 2-16 5 8-16 7-18 10-20 1-5-1-4 2-4 3-4 4-1 1-3-2-4-2-2h-4l-4-1-5-1-9-5-4-2-4-2-4-1-4 1-4-3v-3l2-3 1-4v-4l-4 1-2-2 4-6-1-3-1-4 1-3v-6l8-6 3-1 2-3 1-8-4-6h-3l-3-2-2-6h-8l-4-3-2-5v-9l-2-5-1-1h-1l-1 1h-1l-3-2-6 2-6-1-3-1-2-3v-4l1-3 1-3-1-1h-2l-1 1-3 3-2 2-4 1-3-2v-2l-1-2-1-1-1 1v9l-2 3-6-3-5-4-2-2h-2l-2-3-1-3-2-2-1-1-2-3-8-5-3-2 1-1 9-7 10-6 11-5 10-1 5 1 19-2 15 4h5l9-3 31-2h1l2 3 2 2 2 1 11-2 16 1 11-1 11-4 10-7 9-8 3-6 3-5 2-7 1-7-1-7-1-3 1-3 5-3 9-5 12 24 1 6 4 10 14 28 11 29 2 3 5 7 2 6 27 38 10 15 12 13 2 2 8 9 1 5v4l1 5 5 3 2 3 5 15 2 4 2 1 2 2 7 15 5 5 1 3 1 3 1 3 8 9 2 7 2 15 3 8 8 11 1 3-1 2-2 2-1 2v2l2 6 1 18 1 8 6 17v8l-2 8-3 6-3 9Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "gyeonggi",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[4].colorCode] : citycolor[4].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m246 281-1 1-2 2-1 1h-2l-2-1-1-3-2 1h-1l1-4 1-3 1-1h1l1 2 2 1 3 2 2 2Zm50-2-1 1-2 1-1-1h-2l-1-1v-5l2-2 2-1h4l2 1v4h-2l-1 1v2Zm15-8 1 2 2 1 3 1 1 1v4l-9 7h-3v-1l2-2v-1l-1-1 2-3v-2l-1-3-1-2-1-2h0l3 1 2-2 1 1-1 1Zm-139-75-1 1-1-4v-1l1-1 2 1 1 1-1 2-1 1Zm107 0h-3l-11-9 1-1 1-1 1-4 1-2 1-1h2v2l1 3 1 2 1 1 4 4 1 2 1 1-2 3ZM25 172h1v1l-2 1-1-1-1 1-1 1-2 1 1-3h1l1-1h3Zm239-7 3 2h6l2 2-1 3-3 3h-4l-6-1-4 1h-1l-1-2 1-1 1-5 2-2 3-1 2 1Zm40 37-2 4-1 2h-2l-2-2-1-1h-1l-1 1-9 1-3-2-3-4 5-1 1-1 1-2v-1l-1-1-1-1-5-11-1-1 1-2v-10l1-2 1-1 4-4 3-1 2 2 3 3 2 2 5 3 2 2 1 3v2l-1 2v3l2 3v10l1 1 1 3-2 1ZM17 165l-1 1h-2l-1 1-1-2-1-1v-2l3-2 2-2h3v2l-1 2v2l-1 1Zm3-34 2 2-1 3-2 2-3-2h-4l-1 1v2h2l2 1 1 1-4 2-6-1-5-4 2-7 4 1 8-3 5 2Zm455 170-1 2-2 2-2 2-2 3-7 14-4 3-1-2h-3l-3 2-1 4-2 2-4 2-3 3-1 6-5 1-7 4-7 2-8-1-6-5-7-4-13 6h-6l-7-1 2-2 2-1 2-2 1-5-1-1-1-2 1-1h1l2-1h2l1-1v-2l-9 3-2 2 1 6-1 1-4 1h-5l-6-4-6-6-2-5 9-1v-1l-2-2h4l1 1 2 1-1-4-2-3-2-4 1-5-1-1-2 2-1 3v3l-1 4h-1l-2-1h-3l-3 1-7-2v-2l-1-2 1-3v-3l1-4 3-3 2-1 3-1h4l4-1 1-1v-4l-1-1-2 1-3 3h-2l-2-1-1-2v-2l-3 2-3 2-6 6-2 1-1 1h-2l-1-1v-2l1-2 2-3-4 1h-2v-3l1-2 1-1 3-1 1-1 2-3h0-5l-1-1-1-2-1-2-1-3h0l2-1 1 1h2l3-1h2l2 2h2l3-1v5l1 1 1 1 2-1 1-2v-4l3-4 2 1 3 1 3-1-1-1-1-1-1-1-1-1h-2l-1-1h-7l-3-1-5-1-6-5-1-3 3-4 2-2 5-2 4-2 2-4 1-5-1-3-3-2-1-3v-5l-10-9h-15l-2-4-3-5-2-2v-3l-1-4-1-6-3-17 1-2 2-1 9 3h3l2-1 2-1 2 2 1 2v7l-1 3v5l5 4 6 2 4 1-3-3-9-7 2-7 1-4v-3l-2-3v-5l1-4 1-3-1-1h-2l-2 2-1-18 1-4 2-2h3l4-2 6-5 14-20 2-3 6-5 3-3 5-13 2-3 3 2 8 5 2 3 1 1 2 2 1 3 2 3h2l2 2 5 4 6 3 2-3v-9l1-1 1 1 1 2v2l3 2 4-1 2-2 3-3 1-1h2l1 1-1 3-1 3v4l2 3 3 1 6 1 6-2 3 2h1l1-1h1l1 1 2 5v9l2 5 4 3h8l2 6 3 2h3l4 6-1 8-2 3-3 1-8 6v6l-1 3 1 4 1 3-4 6 2 2 4-1v4l-1 4-2 3v3l4 3 4-1 4 1 4 2 4 2 9 5 5 1 4 1h4l2 2 2 4-1 3-4 1-3 4-2 4 1 4-1 5-10 20-7 18-8 16Zm-77-90v-4l-1-5-1-6-3-5h-6l-5 1-3 3-2 5-4 5h-7l-1 3v4l-3 2-4 1-5-3h-5l-2 5 4 5 3 4 1 6 3 2 4 1 5 6 7 1 3-1 3-2 4-1 3-1 2 4 5-2 4-1 5-2 1-3 3-4-2-1v-4l3-1 2-1v-3l-1-3h-3l-4 1h-4l1-6Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "northJeolla",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[5].colorCode] : citycolor[5].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "M269 599v2l-3 3-2 2-2 1-1 1v-1l-1-1v-2l2-1h-1l1-1 1-1 1-1v-1l3 1 1-2 1 1Zm208-81 1 2 1 1h2l1-2 2 2 3 3 7 2 1 2 3 1 5-4 6-2 2 2 2 1 3-2 2-2 6 11-1 13-6 6-1 4-8 4-4 2-2-1-2 1-3 7-3 3-4 4-1 5-1 6-2 4-2 5-2 6-1 6-3 4v5l4 2 1 2v2l2 5v5l1 4 3 1-1 5-7 8-1 6v4l-4 4-9-8-10-3-6 3-4 5-5 1h-17l-3-1-2-2-3 1h-8l-4 3-6-1-4-4v-6l-3-4-1-4 1-5-3-5h-5l-1 2-1 2-1 2-1 3h-4l-8-10-5-4-3-1h-2l-3 3-5-1-4 4v5l-2 2-2 2v2l1 2-2 3-2 1-2 2h-3l-2 2-2 1-6 1-5 2-4 1-4-1v-5l1-6 1-7-5-1-15 4-3 1-3-2v-2l1-5 2-5 5-10 3-6 6-1 5-2h5l3-2 2-3 3-1 3 3 3 4 2 1-2-8-2-3-2-1-22 3-8-5v-7l4-2 3-3 3-3 5-3 6-3 4-7 1-5 4-3 1-1h11l4 3 2 1 2 3 1-2v-2l1-2-4-3-3-2-3-2-3-2-2-1 1-2 1-1 1-2h2l9 1h2l1-1 1-2v-1l1-1 2-1h1l-1-2-2-1-1-1h-1l-12 5h-11l-8-1v-8l-2-1-4-2-7 1-1-5 14-2 8-1h8l3-2 2 1 4-2 5-4 8-3 3-3v-2l-9 2 7-8 8-1 9-2 16-5 6 1-2 9 4 5 4-1 5-2 9-1 2-1 2-1 3-1 3-3 2-3 5 5 7 12 6 3 2 1 1 1-2 3 1 1 9 1h4l4-1 5-1 4-3 4-4Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "southChungcheong",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[7].colorCode] : citycolor[7].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "M284 430v2l1 2 1 3 2 4 1 3-2-1h-9v-4l2-1v-2l-4 3-1-1v-3l3-4-1-1-2 2-1-2-2 1 1-4v-8l-1-4-2-6 2-1 2-3 3-1 3 3v2l-1 1-1 1v1l3 6v2l-1 2 1 1 2 1 1 3h-3v1h1l2 2Zm89-84 7 1h6l13-6 7 4 6 5 8 1 1 3 2 2 2 1 3 5 2 2v4l1 1 1 2v5l-1 2v2l-1 1v2h-3l-2 2-3 5-4 7-23-9-4 10 1 30-2 2-2 4 15 3 10-3 9 13 3 6v14l4 11 8-2 6-5 3-1 4-3 2-9 2-3 1-5 2-3 3-2 2 1 2 1-1 4-2 2-2 2-1 4-4 6-2 8v11l5-1 5 1 5 3 2 6-1 7 2 7 3 5 4 6-4 4-4 3-5 1-4 1h-4l-9-1-1-1 2-3-1-1-2-1-6-3-7-12-5-5-2 3-3 3-3 1-2 1-2 1-9 1-5 2-4 1-4-5 2-9-6-1-16 5-9 2-8 1-7 8-3 1-4 3-2 2-3 2h-4l-3 2-2-1-1-2v-2l-1-2-2-2-2-4-2-2 2-2-1-1-4-2-3-6-3-1-2 1h-1v-2l-4-2h-3l-1 4v1l-1-1v-6l6-2 4-2 7 2-2-4-2-1-2-2h-1l-1 1-1-1-1-1-1-1 3-9 2-5 3-1-2-2-7-2-2-2 2-2 7-1 2-3-1-2-3-1h-5l-1-1-2-2-1-1v-1h2l-3-5 3-1 3-1 4-5 6-2 3-1h-9l-2 1-4 5-2 1-2-2-1-4-1-4v-2l3-4 2-2-1-1-3 1-1-1-1-1h-1l-1-2 1-2v-2l-1-3-1-1v-1h2l3-2h3l1-2 1-2-2-2h-1l-3-3 2-2 2-2-2-3-3-1-1-3 1-2 4-1-2-2-1-1-1-2-1 1-2 2-3 1v3l1 2v3l-1 4 1 5-2 5-1 2-3-3h-3l-3-2v-11l1-3-2-1 1-5-2-2h-2l-2 3v3l-1 2h-4l2 3 3 5 1 3-2 2v1l3 4h-3l-2 2-1 1-2 2v-4l-1-1 2-5-4-8 1-3-1-6-3 2-4 5-3 1-2 1h-3l-2-1-1-3-1-1 1-1h7l1-1v-3l-2-3-2-1-2-1-3-2v2l-1 5-1 3-2 1v-12l4-6 1-1 1-3v2l2 3 1 2 1-1h1l2 1-1-2-2-3 4 1 2-1 1-2h-4l-2-1v-3l2-4-3-3v-3l3-2 3-1-1 5 1 1h7l1-2v-11l1-5 3-1v7l1 5 2 5-1 2-2 1-1 2v2l1 3v1l-1 1-3 2v2l1 1 1 1h1l2-3h2l5 4-3-8-2-4 2-2 3 3 1 1 1-2h1l1-1 3-1v-1h-1l-3-2v-1l4-1 2-3 1-5-1-3-2-1h-4l-2-1-2-1v-2l1-1 2 2 1-3-1-2-3-1h-2l1-1 1-1 2-1 2 1 1 1 1 1 1-1-1-1v-2h6l3 1 1 3-1 1-1 2-1 2 1 3 1-1 2-1h2v3l1 1v2l-1 2-1 1v9l1 3 1 1 1 1 1-1v-5l3-9 1-5 1-1 1 1 3 3 1 3 1 2 1 1h3v-1l-2-2-1-4-1-2-10-10v-3h1l2 2 3 3 1 1 2 1h1l2-1v-1l-1-1-2-1-3-1-4-4-1-4v-3h3l2 1 2 2 7 4 1 2 2 1 2 1 2 3-1 3-1 2v1l2 3v2l-1 3 2-1 1-1v-9l3-4 2-1h5l3 1 4 1 3 2 3 3 1 5-3 8 2-1 3-4h2l1 2v2l1 6v1l-1 3v3l1 3 2 6-1 1-2 1v2l1 1 1 1h1l1-4 2-3v-2l-1-5 3 1h4l-6-6-1-3 3-2h3l7-3 3-2Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "daejeon",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[8].colorCode] : citycolor[8].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "M434 430v1l1 2 1 1 1 1 1 2-1 3 5 2 5-2 2-2h2v2l2 2v3l2 5-1 5-2 3-2 9-4 3-3 1-6 5-8 2-4-11v-14l-3-6-9-13 18-5 3 1Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "southgyeongsang",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[10].colorCode] : citycolor[10].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "M580 789h1l3-1h0v1l-2 2-2 1-1-1-1 1h-2l-1 1h-1 0l1-2v-1h-1l-1-1v-3h1l1-1 5 3v1Zm17-37 1 1 1-1h6l1 1 1 3-1 1v2h-3l2 1 1 1-1 1-1 2h-3l-1-1-1-2h-1v-3h-3l2-2v-1l-1-1-3-1h-3l-1-1 2-1 2-1 2 1 2 1Zm-22 5h0-3l-2-2-1-1 1-1 1-2 2-2 2 1 2 3 1 1-1 1h-1l-1 1v1Zm-36-13h1l1-2 2-3h1l1 1 1 1 1 3v3l2 2 1 1h-2l-7-1-4 1h-2l-2-2-2-3 1-3 2-2 2-3 1-2 3-1 1 3-2 3v4Zm-10 8 2 4 3-1 4-2h3l6 1h1l1 2-1 2-1 2v9l-1 1-1 1 1 4v2h-3l-2-1-3-2-2 2h-3l-2-4-1-7-3-2-2 2-1 3-1 4-1 2h-2l-3-1-1-1-1-2v-3l-1-2-4-15-1-3 1-3 2-4 1-1h1l1-1 1-4 1-1 2-2 2-1 3 1 2 1 1 3v2l-1 3-4 4 1 1v3l1 2 2 1 3 1Zm122-25 1 2 1 2v2l-1 3-2 6 3-1 2-1h0v6l-1 2-1 2-2-1 1 2 2 5v3h-1l-3-1-3-1-1-2-1 3v1l-3 4-1 2 2 2 2 1 2 1-3 2-11 4h-4l6-4-3-1v-4l1-3-5 3-2-1-1-2 1-3 1-1h4l1-3v-3l1-3-3-1-1 2-6 2-2 2-2-2-2-3-2-3-1-3 1-3 2-2 3-1 2-1 6-1h1l3 1 2 1 2 1h3v-1l-3-2-2-3v-6h2l11-6-2-4 1-3 2-2 3 1 1 2v1l-1 8v3Zm18-8-1 1-1-1v-3l-2-2v-4l-1-1v-2l2-1h2l1 1 1 2v9l-1 1Zm27-113 1 8-4 8 3 4 9 2 4 3 7 8 8 4 4 3 1 6 4 3 4 2h1l-1 3v3l-1 2-1 2 1 2v1l-2 4-3 5-3 4-1 4-1-1-3-3-3-4-3-3-3-4-1-4-3-2h-4l-4 1-3 2-2 3-2 12-2 3-2 3-2 2h-1l-1 2-5 8-2 1v-8h-1l-1 3-2 5-3-1h-11v-3l-2-2-1 5-2 1-3-2-2-3h-2l-2 2v-9h-2l-1 2-1 3-2-2-2-3-2-2-3 2v-3l-1-4 1-2-2-5h-1l-2 2-2 3v2l2 4 1 5 1 2 1 2 3 4 1 2-1 2h1l3 1-1 1-2 1h-3l-2-1v-2l-1-1-1-2-1-1-9-3h-2l-5 1-2 1v1l2 3h-3l-5 3-7 2v2l-1 3-1 2v1l15-8 3-1 1 4 1 2v3l-1 2-2 1-3 1h-4l-2-1-1 2 1 1h2l1 2v7l-2 7 2 2 1-1 1-1 1-2 2 2-2 4-4 6-4 1-5-1 1-3h4l1-1-10-1-2-1-2-3-1-2 2-1 4-1-4-8-3 3-2 5h-4l-3-4-2-1-4-1-1 1-1 3v5h-11l-3-1v-5h-5l-4-1h-1l-1-2v-2l1-2-1-15 1-2 1-2 1-2v-3l-3 3-2 4-2 2-4 1 3 7-2 1h-4l-4 2-2-4-1-2-2-2v7l-2 5-3 3h-5l-3-1h-1l-1 1-2-2h-2v-5l-2-5-10-11-2-3-1-5-4-3-4-3-2-4-1-10-1-5-3-4v-4l4-4v-4l1-6 7-8 1-5-3-1-1-4v-5l-2-5v-2l-1-2-4-2v-5l3-4 1-6 2-6 2-5 2-4 1-6 1-5 4-4 3-3 3-7 2-1 2 1 4-2 8-4 1-4 6-6 2 4 3 2 3 2v4l3 1h5l2 2 2 1 5 1h4l5 1 3 3 2 4 3 3 1 2 1 1 2 2 2 2v5l-2 4 3 9 9 1 5-1 5 1 4 2 4 3 5 1 8-4h4l4-5 4-3 1 11 4 5 5 3 6-1 6-1 5 2 5 2h6l5-4h2l3-1 2-2 2-2 5-2 6 1 5 2 4-1Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "southJeolla",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[11].colorCode] : citycolor[11].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "M275 919h-1v2h-2v2h-1l-3-4h7Zm93-4-3 1-1-3 2-1h1l1 3Zm60-16 1 1h1l1 2h0l1 2h-1l-2-1-1-1-1-2v-1h1Zm-3 0 1 1-1 1 1 2 2 4h0l2 1h0v1l-2-1h-3v-2l-1-2-1-1v-4l1 1 1-1Zm-341 2-1 1-1-1-3-3-2-1-1-2 1-2 1-1 2 1 2 1 2 5v2Zm232-9-4-1 1-1v-2h2l1 2v2Zm-6-14h4l3 1 1 1v1h-2 0l-2-1h-2v1l-1 1-2 1-1 2-3 1h-3l-1-2v-3l1-3 3-2h2l3 2Zm16 10h-3v-1l-2-1v-3l1-4v-2l-1-1v-1l1-2h2l3 1v2l-2 1v2l2 2v1h1l-1 1v3l-1 2Zm15-13v2l-1-2-1-1v-2l2-2 1 2v2l-1 1Zm25 4-1 1-2 1-2 1-2-1-1-2h-1l-1 1h-1v-3l1-2v-2l1-1 1-1 2-1h3l1 3 3 2-1 3v1Zm-52-3-1 1-3-1-1-1v-1h-2v-1l2-3-1-1 1-1-1-2h1l2 1h4l2 2 1 1v1l-1 1-1 2-2 1h-1l1 1Zm-101-12-1 2h-3v0l1-2v-1l3 1Zm207 5v1l-3-1-3 1 1-4 2-2v-1h3v3l-1 2 1 1Zm-103-7 2 1v2h0l-1 1-1-1-2 1-1-2 1-1 2-1Zm-88 0h1l1 2-2 3h-1l-1-1-1 2v-2l-2-1 1-1h3l1-1-1-1h1Zm-20-1v2l-1 1v-2l-1 1-1 1-2-1 2-2h3Zm255-1-1 1-1-2h2v1Zm-154-4 1 1-2 1h-3v-2h4Zm132 0-2 1v-3h2v2Zm-8-2 1 1 2-1v2l-1 1-2 2v-5Zm-208-4 5 1h2l1 1v2l1 1-1 1h-2l-1 1h0l-1-1-1 1h-1l-3-2-1-1v-3l2-1Zm150 2h-2l-1-1h-1v-4l2-1h4l3 1v1l-1 1-3 3h-1Zm-156-7 2 1 1-1 3 1 3 1 1 1-1 1-4-1h-5l-1-2 1-1Zm76 1h-1l-1-1v-1l2 1v1Zm58-3 1 1h5l2 1-1 2v1l-1 2-1 1-1-1-2 1-1 1h-2v-1l-1-1-1-1-1-1h-1l-2 1h-2l-1-1-3-1-1-1h2l2-1h2l1 1 2-1 2-2h3Zm32-1 1 1 2-1h3l2 4h-1l-1-1h-3l1 2-1 1-3 2-1 1v-3l1-1v-1h-4l1-1-1-1-1-1h-3v-1h1l1-1 1-2 2-1 1 1 1 1 1 2Zm-274-5h-2l-1 1-2-4h2l3 3Zm226 11 3 3 1 1 1 3h-3l-2-2-1 1v1h-1l-1-1h-3l-3-1v-1l2-2v-1h-6l-1-2-2-1v-7l1-2 1-2 2-1 3-1 2 1 2 1 2 2 1 4 1 3v2l1 1v1Zm32-15-1 3v3l-1 1h-1l-1 1-1 1h-3l-1-1-1-2v-2h0-1l-1 2h-1l1-5-1-1 1-1 1 1h4l1 1 1 1h3l1-1 1-2h0v1Zm51 4v1l-2-1-1-1v-2l-1-1v-2h1l1 1 1 1v1l2 3h-1Zm-64-3v1h-1l-4-1-1 1-1 1-4 2-2 2v2l-1 1-1-2v-3l-2-1v-1l1-2 1-2 2-3 3-2 4-1 2 1v1l1 1-1 1h0l1 1 1 2 2 1Zm-248-8-2 1v-1l1-2h1v2Zm276-3h2l2 1 1 5v2l-1 1h-1v-3l-2 2-1-1-2-6v-1h2Zm121 9h0l-2-1-1-1 1-1-1-1 1-2v-2l1-1v-1l1 1 1 1-1 5v3Zm-50-10h0l2-1 1-1 4 4 1 2v1l-2 1-3 2-2 1h-1v-2l-1-1-2-1v-1h0l-3-2 1-2-1-2h1l2 1 3 1Zm-44 7-7 1h-2l-2-1-4-2v-2l1-1v-2l-2-1 2-1 3-1 5-1 5-1h3l2 1 1 4v3l-2 3-3 1Zm-183-11h2v1l-2 1-1 2h-1l-1-2v-1l2-3v-1l1 1h1l-1 2Zm280 1h-4v-1l1-2 1-1h2l-1 1 1 1v2Zm-109-7-1 2h-2l-1-1h-1v-2l1 1v-1l2 1 1-2h1v2Zm54 0-1 1 5 1 1 2-1 1h-3l-3 1-1 1-2-2v-1l1-1h1l-1-2v-1l-2-1h0v-1l1-2 1-1h2l2 1-2 2h1l1 2Zm48 5h-1l-1-1-2-1-2-1-1-1-1-2-1-1h-1l-1-2v-1l3-2h3l2 1 2 5v2h2l1 1v2l-2 1Zm-232-10 1 1h1l4-2v1l5 8v3l-1 3v2l-4 7-1 2-1 1h-1l-2-3-2-1v5l-15 8h-2l-7 1-2-1v-1l1-2 1-1v-2l-5-3v4l-3-4 2-6 4-5 5-1 1-4 1-1 1-2 2-1h2l1-1v-3l2 3h3l2-2 1-2-1-3-4-3 1-2h2l3 2 2 1 2 1 1 3Zm214-7h4l1 2-1 1h0l-1-2-1 2-1 1h-3l-2-2h-1l1-2 1-1 2-1h0l1 1v1Zm-89-4h-1l-1-2 1-1 2 2-1 1Zm72-4 1 1v1l-2 1v2l-1-1-1-1h-2l-1-2 1-1 2 1v-1h3Zm-237 16-2 1-2-1-1-1h2l2-2h0l-4-1 1-1 2-1h3l2-1v-4l-2-2-1-4h1l2 1 1 1 2 1v2l1 1v2l-1 3v1l-1 1-2 3-3 1Zm-32-17v3l-1 1-2 1h-4v-1l1-1v0l-3-3h1l1 1h2l3-2h1l1 1Zm28 10-1 1-1-1-1-7 1-3 1-2 2 4 2 3 1 2v3h-4Zm-9-11v2l-2-1v-1h-2l-1-2 2-1h1l1 2h0l1 1Zm-80-3-1 1-2-1 1-1h1v-1h2v1l-1 1Zm108-3v1l3-2 2 2v3h2l-3 2-1 1h-1l-1-1-1 1v1h-2l-2 1-1-1 1-5h-1l-1-1v-1h1l1-1 3-2h2v1l-1 1Zm-123-3-1 2-2-2 2-1 2 1h-1Zm9-4v1h4v1l-2 2-1 1-2 3-1 1-1 2-1 2-2-1-1-2v-3l1-2 1-2 2-2 1-1 1-1 1 1Zm107-1-1 1-2-1 1-1 1-1 1 2Zm-144-3 1 1 1-1v3l-1 3-2 1v2h-1v1l-1-1v-1l-1-1 2-1h0l2-3v-3Zm411 26h-4l-5-6-1-2 1-4 1-1 3-2v-1l1-5-2-3v-1l2-1h4v2l-1 2-2 2 2 1 2 2 1 3 1 5v5l-2 3-1 1Zm-9-24-1 1h-2l-1-2 1-1 1 1 2 1Zm-276 6-2 3-1 1h-3v-1l-2-1-3-1h0l-2-3 1-2 5-2 3-4h1l2 3 2 1v4l-1 2Zm19-18h2v1l2 1h2l1 1 1 1 1 1v2l1 2v2l-1 1-2 1-2-2-2-2h-1l-2 1h-1l-1-1v-2l-2-2-3-4-1-1h4l2-1 2 1Zm32 2h-1l-1-4 1-1 1-1v1l1 1v1h-1v3Zm-49-4v4l-3-1-1-1-1 2h-5v3l-1 2-2 2-2 1-1-1-2-1-1-2v-2l1-3 1-2 2-1h7l5-2h2l1 2Zm231-4-1 2-1 1-1 1h-1l-1-1h1v-2h2l2-1Zm-208 7h-1l-2-1-2-2-3-1-2-1 2-1 4-1 2-1 1-1 2 1 1 2-1 2v3l-1 1Zm-2-22h1v1l1 1-2 2v5h-3l-1 1v4l-2 1h-1l-1-2-2-2-1-2-1-2v-2l2-1h2l2 1h1l1-2-1-2 2-1h3Zm250-4 1 1h3l-4 4-2 1-1-1-1-1-1-1 1-1 2-2h2Zm-216 8 1 4-3 3-2-1 1-1v-2l-5-3-5 1-2 1h-4l-1-2 1-1h2l4-1 1-1v-1l2-1v-1l1-1-2-2v-2l1-1 3 1 3 1 2 2v1l-2 1-2 1v3l1 1h2l3 1Zm-42-11v3l-1 3-1 2-2 2h-3l-1-1h-2l-5 1h-2v-1l2-2 3-4 2-2h4v-1l1-3h2l1 1 2 2Zm24-1-1 1h-2l-1-2 1-2h4l1 1-1 2h-1Zm5-10 1 1 1 1 2 4-1 1-2-1-1-2-1-2-1-1 2-1Zm-10 1v2h-1l-1-3 1-2 2-1v1l-1 3Zm8-2-1 1-1-2v-3l-1-2h2l1 1 1 2v3h-1Zm-15-5 2 1v4l-2 1-3 1-1 1 1 1-1 1h-3l1-1 1-2v-4l2-1v-1h-8v-1l2-1v-1l2-1 1-1h3l2 2v2h1Zm-4-11 2 1h3l1 2v3l-1 1-1-1-2-1v-1l-2 1v-1h-1l-1-1 1-1h-1v-1l1-1h1Zm-19-7v4l-1-1-1-2v-1l2-1v1Zm26-1h3l2-1 1 1v1l2-1v2l-1 1h-2v1l2 2 1 1h2l1 1v2l1 1v4l-3-1-2-2v-2l1-1h-1l-4-1-1-1h-2l-2-1-1-1-1-4 1-2h2l1 1Zm-11 8-1 1-1 1-4-2-2 1-1-1-1-1 2-6v-2h1l2-1 2-1 1-1 1-3 3-1 3-1 3 1-5 2-1 2v4l2 3-1 1-2 2-1 2Zm5-42-1 1-2-3v0l1-2h1l1 1v2l1 1h-1Zm-18-14 1 1-2 1-2 1v-1l-2-1 2-1-1-1 2-2 1 1v1h1v1Zm250 14v4l3 4 1 5 1 10 2 4 4 3 4 3 1 5 2 3 10 11 2 5v5l-1-1h-9v-1l-1-1-1-2-2-2v4l1 1-1 4-1 1-2 2-6 4-3 2-2-2-3-6-3-1-1 2-1 4v3l1 4 3 4 3 4 2 2 2 2 2 1 2-2 4-4 4-1 3 1h2l3-2v7l-2 5-2 10-1 2-6 2-4-2-3-1-3 7-1-1-2 1 2 2 1 3 1 8-1 2-2-1-2-3h-4l-3-2-2-3v-4l1-4 2-4 1-4-1-3-1-2-2-5-1-1h-2l-1-1v-1l1-2-2-5-1-1v-2l1-2h0v-2h-1l-1-1v2l-3 6-1 2-7 2-3 1h-10l3 2 4 2 3 1v1l-7 2-3 2-1 3 2 1 3-1h1l1 2v1l-1 1 2 7 4 4 5 3 4 5h-6l7 3 1 2v4l-3 3h-5l-7-4-2-1h-2l-3 2-2 1-1 2 2 4 3 1 1 1 6-2 3 3-7 7-3 4-3-2-4 4v3l2 2h-4l-7-8-2-5-6-6h-2l-6 3 1 2v1l-3-1h-2l-2-1-2-3v-3l1-2 4-2 1-1 3-4 2-4 1-2 2-1v4l-1 3-2 5h5l4-1 2-4v-5l-1-3-1-1-1-1v-3l1-2 4-5 2 1 1 1v2l-1 2 1 2 2 2h4l1-2 2-4 1-2-2-4-1-3-1-2-3 3-3 1-3-2-4-7-2 4-4 8-2 3-2 1h-2l-4-1h-2l-2 2-2 4-2 1-5 3-4 3-2 1h-2l-1 1v6l-1 2-2 1v2l1 3-9 8v8l-1 2-4-2-2 1v4l1 2h-3l-4-3-6-2-1-1-2-4 1-9-1-4 1-3v-3l-1-2-2-1h-1l-2 2-2 2v2l1 2 1 3v1l-5 2v2l4 5-6 3-2 2 2 1v3h0-1l-2-1h0-2l-1 1v1l-1 2-1 1-5 1-1 2-1 1-4 13v4l-4-1-7 3-2-1v-2l1-5v-2l-2-1-2-1-4 1v-2l1-1 1-3h1l1-1 2-4v-4h-1l-1-1h-3l-1-1-1-1 1-1v-2l1-3v-1l-3 1 1-5 3-2 4-1h4l-1-1-1-2h-1l-1-1 2-2 2-2v-1l-2-2-1 1-1 2h-3l-2-1h-1l-1 1v1l-1 2h-9l-3 1v-3l-1-2-4-2h0l-1-2-1-1-1 2-1 1h-2l-3-3h-1v-2l1-1v-1l1 1h1l1-1v-2l-4-2-4-3v-5l1-6 2-5v-4l2-1h2l1 1 1 2 5 8-2 2v3l1 3 3 9 2 1 8 1 3 3 2-1 1-3h-2 0l-4-1-1-2-2-2v-5l-2 1-1 2-1 1-1-4-1-5 1-3-1-3h5l6 1 1 2v5l2 1 1 1 2 1 3 2 1 1 4 3 1-1-3-4 2-1 6 4 5 2 3-1-3-1-3-2-5-4 1-1-3-3-5-6-3-2-4-1-5 1-3-2-4 1-3-1-1-2 2-3 3-1 4 1 6-3 7 5h3l1 1h1l-1-3 1-4 2-2 3-1 8 2h3l-1-2 3-1 1-1h2l-3-2-3-1-8 1v-8l2-2v-2l-2-3-2-1-2 1-2 3v1l1 4v2l-2 4-2 6-1 2-3 1v-1l-1-1v-1l1-2 1-1-2-1-2 1-1 1-2 1-5-1h-1v2h-2l-4 2-1-1-1-2 1-2 3-3 2-2v-2l1-2-1-3 1-2 2-2-2-1-2-3-1-4v-3l3-2 3-2v-2l-3-1h-2l-2 2-3 1v2l1 2v2l-2 2-3 1-3-1-2-2 2-1-1-1-1-1-1-2-1-1 2-1h2l4 1-1-5 5-4-2-4-4-6-3-3-3-1 1 4-1 3h-2l-2-3 1-2-4-5v-4l2-2 3-1 3 2 1 3 2-1 1-3 2-4 1 2v6l-1 1v3l1-1 1 1 1 3v1l2 1 2 1h4l-1 3v2l1 2 2 1 4-9v-6l-1-1-3-1-1-1-1-1-2-4-5-6-1-3v-1l2-2v-2l-2-1v-4l-2 1h-7l2-2 3-1h3l3-1h-1l-1-1h-1l1-2 3-3v-1l-1-4 1-3 1-3 4-5v1l3 3h4v-1l-3-4 3-1 15-4 5 1-1 7-1 6v5l4 1 4-1 5-2 6-1 2-1 2-2h3l2-2 2-1 2-3-1-2v-2l2-2 2-2v-5l4-4 5 1 3-3h2l3 1 5 4 8 10h4l1-3 1-2 1-2 1-2h5l3 5-1 5 1 4 3 4v6l4 4 6 1 4-3h8l3-1 2 2 3 1h17l5-1 4-5 6-3 10 3 9 8Zm-108 4-4 1-4 1-6-1-3 3 4 9 9 6 9 1 7-8-4-9-8-3Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "busan",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[12].colorCode] : citycolor[12].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m710 707-1 2-1-1-1-2-3-1-1-2v-2l1-2h1l2 3 1 1 1 1h-1v2l2 1Zm17-20-1 1h-8l-2 1h-2v3l1 2v5l-4 1-4-4-2-1-4 4-2 4v4l-2 1v-2l-2-2v5h-1l-1-1h0l-3 2-1-1-2-5 1-4 1-5v-3l2-2 2-3 2-3 2-12 2-3 3-2 4-1h4l3 2 1 4 3 4 3 3 3 4 3 3 1 1Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "ulsan",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[13].colorCode] : citycolor[13].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m768 600 1 2-1 4v5l-1 8-2 3-2 3-3 2-1-4-1-4-2-3-2-1-1 4h2l1 2 1 2v3l-1 3h-3l-1 2v5l1 3-3 5 1 2 1 1v3l-3 1-3 2-5 4h-3 0-1l-4-2-4-3-1-6-4-3-8-4-7-8-4-3-9-2-3-4 4-8-1-8 4-3 4-3h3l1-2-2-2-1-3 6-4 6-2 6-1 5 1 6 2 1 3v3l1 2 2 2h2l15-2 13 3h0Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "jeju",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[14].colorCode] : citycolor[14].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m351 994 2 3 2 2 8 3 2 2 1 6 2 2 2-1v-1l1 2v1l-2 1-1 1v1l1 2v2l-2 2-3 4-5 4-2 3-2 5-1 1-1 3h-3l-2 1h-4l-6 4-16 3-6 5-6 1h-7l-8 1-7-2h-15l-5 3-2 5h-3l-2-1-4-6-5-2-4-5-2-5 3-8 2-5 2-2 6-3 4-8 5-1 2-5 7-2 16-5 4-3 16-2 10-4h3l12-2h13Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
            className: "kyeongbook-group group",
            fillOpacity: animationOn ? "0.5" : "1",
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            id: "kyeongbook",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              ref: pathRef,
              className: "kyeongbook path",
              id: "kyeongbook",
              fill: usePercentageColor ? color[citycolor[15].colorCode] : citycolor[15].color,
              d: "m762 403 1 8 2 8 1 8-1 17-1 3-5 6-2 4-1 3v27l1 2 1 1 1 1 1 7 1 5 1 1 1 1v3l-2 1-1 1-2 1-2 2-1 3 4 3 2 2 3 4h3l4-3 10-11 2-3 3 2v3l1 4 1 3-2 4-6 12-1 5-1 13-4 12v7l-4 13-3 6-2 3 2 3 1 2-13-3-15 2h-2l-2-2-1-2v-3l-1-3-6-2-5-1-6 1-6 2-6 4 1 3 2 2-1 2h-3l-4 3-4 3-4 1-5-2-6-1-5 2-2 2-2 2-3 1h-2l-5 4h-6l-5-2-5-2-6 1-6 1-5-3-4-5-1-11-4 3-4 5h-4l-8 4-5-1-4-3-4-2-5-1-5 1-9-1-3-9 2-4v-5l-2-2-2-2-1-1-1-2-3-3-2-4-3-3-5-1h-4l-5-1-2-1-2-2h-5l-3-1v-4l-3-2-3-2-2-4 1-13-6-11 3-2 4-1 3-5 1-5 1-2 2-2v-6l-1-5 4-3h4l3 1-2-11-3-2-8 2-3-2-5-3-4-2-6 2-1-10 4-3 2-4-2-3-1-4 1-4 1-11 1-5 3-2-8-12-6-1-2-4 3-1 2-1 2-2 4-5 1-2v-4l5-4 6-2 3-5 6 2 11 2-2-4-3-4 1-4 2-5 2-3 2 2h4l2-4 3-2 2 2 5 2h5l1-3 1-3 1-3 3-2 2 2 2 2 4 3 2 5 6 2 13-5 3-8-3-2-1-2 2-4 2-4 3-5 5-3 2-3 2-1 3-1 3-3 4-3 3-4 2-1 2 1 2-2 2-2 4 2 4 2 4 1h5v-4l1-4-1-5 3-4 4-2 4 1 3 4h3l2 2v7l5-2 5-4 2 1 1 2h2l2-1 6 1 6 3 4-1 4-2 6 1 5 3 1 4-4 3-4-2-3 1-3 2-1 5 1 7 3 5 5 2 1 4 2 4 3 2 4 2h11v5l1 1 1 2-1 5-2 5v5l1 5 1 5-2 4 11 5 5-3 5 1 2 1ZM657 551l1-3-1-4v-3l-2-1-1-2v-5l1-1v-2l-2-3-6-5h-9l-10 2-7 6 1 9-3 3-2 4h2l1 1v1l-1 2-2 1h-3l-2 3 1 3 3 1 2 3 2 3 2 3 2 1 2 1 1-1 2-4 3-2 5 1 9 2 3-2 1-2v-1l1-4 1-2v-1h2l3-2Zm338-316-3 1-4-1-4-2-2-3-1-4 1-3 3-2 6-1 3-2h2l3 2v5l-2 6-2 4Z"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              ref: pathRef,
              className: "kyeongbook path",
              id: "kyeongbook",
              fill: usePercentageColor ? color[citycolor[15].colorCode] : citycolor[15].color,
              d: "M1026 239c2 1-4 5-6 5-1 0-3-2-3-4-2 0 3-5 5-5s4 3 4 4Z"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              ref: pathRef,
              className: "kyeongbook path",
              id: "kyeongbook",
              fill: usePercentageColor ? color[citycolor[15].colorCode] : citycolor[15].color,
              d: "M1016 231v2a24 24 0 0 1-4 7l-1 1-3-2-2-2 2-3 3-2h2l1-1a30 30 0 0 1 2 0Z"
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "deagu",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[9].colorCode] : citycolor[9].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m657 551-3 2h-2v1l-1 2-1 4v1l-1 2-3 2-9-2-5-1-3 2-2 4-1 1-2-1-2-1-2-3-2-3-2-3-3-1-1-3 2-3h3l2-1 1-2v-1l-1-1h-2l2-4 3-3-1-9 7-6 10-2h9l6 5 2 3v2l-1 1v5l1 2 2 1v3l1 4-1 3Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "sejong",
            className: "path",
            ref: pathRef,
            fillOpacity: animationOn ? "0.5" : "1",
            fill: usePercentageColor ? color[citycolor[16].colorCode] : citycolor[16].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            d: "m418 397-3 6v4l-2 5-1 7 12-3 12 1v2l-1 2v7l-1 2-3-1-18 5-10 3-15-3 2-4 2-2-1-30 4-10 23 9Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "northChungcheong",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[0].colorCode] : citycolor[0].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m640 322-2 2-2 2-2-1-2 1-3 4-4 3-3 3-3 1-2 1-2 3-5 3-3 5-2 4-2 4 1 2 3 2-3 8-13 5-6-2-2-5-4-3-2-2-2-2-3 2-1 3-1 3-1 3h-5l-5-2-2-2-3 2-2 4h-4l-2-2-2 3-2 5-1 4 3 4 2 4-11-2-6-2-3 5-6 2-5 4v4l-1 2-4 5-2 2-2 1-3 1 2 4 6 1 8 12-3 2-1 5-1 11-1 4 1 4 2 3-2 4-4 3 1 10 6-2 4 2 5 3 3 2 8-2 3 2 2 11-3-1h-4l-4 3 1 5v6l-2 2-1 2-1 5-3 5-4 1-3 2-2 2-3 2-2-1-2-2-6 2-5 4-3-1-1-2-7-2-3-3-2-2-1 2h-2l-1-1-1-2-4-6-3-5-2-7 1-7-2-6-5-3-5-1-5 1v-11l2-8 4-6 1-4 2-2 2-2 1-4-2-1-2-1-3 2-2 3-2-5v-3l-2-2v-2h-2l-2 2-5 2-5-2 1-3-1-2-1-1-1-1-1-2v-1l1-2v-7l1-2v-2l-12-1-12 3 1-7 2-5v-4l3-6 4-7 3-5 2-2h3v-2l1-1v-2l1-2v-5l-1-2-1-1v-4l-2-2-3-5-2-1-2-2-1-3 7-2 7-4 5-1 1-6 3-3 4-2 2-2 1-4 3-2h3l1 2 4-3 7-14 2-3 2-2 2-2 1-2 16-5 17-2-1 9 5-1 5 1 2 1 1-1 2-1 3-3-1-9 3-4 8-3 6 7v4l2 3 5-1 5-3 4-3 3 1 3-2 4-3 9 4 9 1 3 1-2 4-5 3-2 5 1 1 3 2h1l2-1 4-2h8l1 1v3l3 3 1 3h3l4-1 4-1h3l4 3 4 3h4l4 1 4 1 3 2Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "seoul",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[3].colorCode] : citycolor[3].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m398 211-1 6h4l4-1h3l1 3v3l-2 1-3 1v4l2 1-3 4-1 3-5 2-4 1-5 2-2-4-3 1-4 1-3 2-3 1-7-1-5-6-4-1-3-2-1-6-3-4-4-5 2-5h5l5 3 4-1 3-2v-4l1-3h7l4-5 2-5 3-3 5-1h6l3 5 1 6 1 5v4Z"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            id: "gwangju",
            className: "path",
            ref: pathRef,
            fill: usePercentageColor ? color[citycolor[6].colorCode] : citycolor[6].color,
            stroke: "white",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "3",
            fillOpacity: animationOn ? "0.5" : "1",
            d: "m368 669 8 3 4 9-7 8-9-1-9-6-4-9 3-3 6 1 4-1 4-1Z"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          className: "nohover group",
          children: useGagueBar && scale === 1 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [zMap.map((e, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              id: "gaugeBar",
              className: "path",
              fill: useColor[index],
              stroke: "white",
              d: "m ".concat(1000, " ", e[0], " H ").concat(980 - gagueBarWidth, " V ").concat(e[1], " H ", 1000, " Z")
            }, index)), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              fill: pointerColor,
              className: "path",
              strokeLinejoin: "round",
              stroke: "white",
              d: "m ".concat(1010, " ", 1000 - mousePointer, " L").concat(1045 + pointerSize, " ").concat(1000 - mousePointer + 15 + pointerSize, " V ").concat(1000 - mousePointer - 15 - pointerSize, " Z")
            }), "(", /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
              x: "".concat(964 - gagueBarWidth),
              y: "".concat(1000 - mousePointer + 15),
              fill: "black",
              fontSize: "".concat(gagueValueFontSize, "px"),
              textAnchor: "end",
              children: tooltipValue
            }), ") :"]
          }) : ""
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
          ref: tooltipRef,
          id: "tooltipBox",
          className: "group",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("foreignObject", {
            id: "foreingObject",
            x: "0",
            y: "0",
            width: ToolW,
            height: ToolH,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              ref: tooltipDiv,
              className: "tooltipDiv",
              xmlns: "http://www.w3.org/1999/xhtml",
              style: tooltipOn ? {
                opacity: tooltipOpacity,
                maxWidth: "".concat(ToolW, "px"),
                // height: "100%",
                minHeight: "".concat(150 / scale, "px"),
                maxHeight: "".concat(ToolH, "px"),
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: useFollowColor ? targetColor : tooltipBackGroundColor,
                borderRadius: "".concat(tooltipBorderRadius, "px"),
                border: "".concat(tooltipBorder),
                boxShadow: "".concat(tooltipBoxShadow),
                margin: "10%",
                overflow: "hidden"
              } : {
                visibility: "hidden"
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                style: {
                  margin: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "".concat(cityNameColor),
                  fontSize: "".concat(cityFontS, "px"),
                  fontWeight: "".concat(cityNameFontWeight)
                },
                children: [tooltipCity, " ", useTooltipCol ? ":" : "", " ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                  style: {
                    color: "".concat(cityValueColor),
                    fontSize: "".concat(cityValueFontS, "px"),
                    fontWeight: "".concat(cityValueFontWeight)
                  },
                  children: tooltipValue
                })]
              }), tooltipDescription ? /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
                style: {
                  margin: "0",
                  textAlign: "center",
                  marginBottom: "5%",
                  marginTop: "2%",
                  marginRight: "10%",
                  marginLeft: "10%",
                  fontFamily: "".concat(descriptionFontFamily),
                  color: "".concat(descriptionColor),
                  fontSize: "".concat(decripFontS, "px"),
                  fontWeight: "".concat(descriptionFontWeight),
                  maxHeight: "50%",
                  overflow: "hidden"
                },
                children: tooltipDescription
              }) : ""]
            })
          })
        }), useValueLavel && scale === 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("text", {
          fontFamily: gagueValueFontFamily,
          fontWeight: gagueValueFontWeight,
          x: "1048",
          y: "1060",
          fill: "black",
          fontSize: "30px",
          textAnchor: "end",
          children: valueLavel
        }) : ""]
      })
    })
  );
};
exports.NormalMap = NormalMap;