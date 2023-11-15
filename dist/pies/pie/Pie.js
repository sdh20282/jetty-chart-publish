"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pie = void 0;
var _PieSvg = _interopRequireDefault(require("../../components/pie-components/PieSvg"));
var _setDefaultSettings = require("../../common/pie-common/utils/setDefaultSettings");
require("./pie.css");
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { useState } from "react";
// import PieTestSetting from "./testFile/PieTestSetting";

const Pie = _ref => {
  let {
    data,
    generalSettings,
    pieSettings,
    labelSettings,
    arcLinkLabelSettings,
    animationSettings,
    legendSettings,
    debugSettings = false
  } = _ref;
  // const newGeneralSettings = {
  //   ...setDefaultGeneralSettings(),
  //   ...generalSettings,
  // };
  // const newPieSettings = {
  //   ...setDefaultPieSettings(),
  //   ...pieSettings,
  // };
  // const newLabelSettings = {
  //   ...setDefaultLabelSettings(),
  //   ...labelSettings,
  // };
  // const newArcLinkLabelSettings = {
  //   ...setDefaultArcLinkLabelSettings(),
  //   ...arcLinkLabelSettings,
  // };
  // const newAnimationSettings = {
  //   ...setDefaultAnimationSettings(),
  //   ...animationSettings,
  // };
  // const newDebugSettings = debugSettings;

  // const animationPieMakeWay = "all"; // all, oneByOne, none
  // if (animationPieMakeWay === "all") {
  // } else if (animationPieMakeWay === "oneByOne") {
  // }

  // const [newPieSettings, setNewPieSettings] = useState({
  //   ...setDefaultPieSettings(),
  //   ...pieSettings,
  //   useAngle: 0,
  // });

  // useEffect(() => {
  //   let intervalId;

  //   if (newPieSettings.useAngle < 360) {
  //     intervalId = setInterval(() => {
  //       setNewPieSettings((prevSettings) => ({
  //         ...prevSettings,
  //         useAngle: prevSettings.useAngle + 10,
  //       }));
  //     }, 10);
  //   }

  //   console.log("RENDERING");

  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [newPieSettings.useAngle]);

  const [newGeneralSettings, setNewGeneralSettings] = (0, _react.useState)({
    ...(0, _setDefaultSettings.setDefaultGeneralSettings)(),
    ...generalSettings
  });
  const [newPieSettings, setNewPieSettings] = (0, _react.useState)({
    ...(0, _setDefaultSettings.setDefaultPieSettings)(),
    ...pieSettings
  });
  const [newLabelSettings, setNewLabelSettings] = (0, _react.useState)({
    ...(0, _setDefaultSettings.setDefaultLabelSettings)(),
    ...labelSettings
  });
  const [newArcLinkLabelSettings, setNewArcLinkLabelSettings] = (0, _react.useState)({
    ...(0, _setDefaultSettings.setDefaultArcLinkLabelSettings)(),
    ...arcLinkLabelSettings
  });
  const [newAnimationSettings, setNewAnimationSettings] = (0, _react.useState)({
    ...(0, _setDefaultSettings.setDefaultAnimationSettings)(),
    ...animationSettings
  });
  const [newLegendSettings, setNewLegendSettings] = (0, _react.useState)({
    ...(0, _setDefaultSettings.setDefaultLegendSettings)(),
    ...legendSettings
  });
  const [newDebugSettings, setNewDebugSettings] = (0, _react.useState)(debugSettings);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PieSvg.default, {
      data: data,
      generalSettings: newGeneralSettings,
      pieSettings: newPieSettings,
      labelSettings: newLabelSettings,
      debugSettings: newDebugSettings,
      animationSettings: newAnimationSettings,
      legendSettings: newLegendSettings,
      arcLinkLabelSettings: newArcLinkLabelSettings
    })
  });
};
exports.Pie = Pie;