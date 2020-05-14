"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useConfig = (currentScreenType, options) => {
  //options=options?options:{breakPoints:{xxl:0.175,xl:0.2,lg:0.25,default:0.5}, alwaysStaticMain:false}
  //console.log(options)
  const breakPoints = options.breakPoints ? options.breakPoints : {
    xxl: 0.2,
    xl: 0.25,
    lg: 0.35,
    default: 0.66
  };
  const defaultRatio = breakPoints && breakPoints.default ? breakPoints.default : options.defaultRatio;
  const alwaysStaticMain = options.alwaysStaticMain;

  const _useState = (0, _react.useState)(breakPoints && breakPoints[currentScreenType] ? breakPoints[currentScreenType] : defaultRatio),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        ratio = _useState2[0],
        setRatio = _useState2[1];

  const _useState3 = (0, _react.useState)(),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        staticMain = _useState4[0],
        setStaticMain = _useState4[1];

  (0, _react.useEffect)(() => {
    const updatedRatio = breakPoints && breakPoints[currentScreenType] ? breakPoints[currentScreenType] : defaultRatio;
    setRatio(updatedRatio);
  }, [currentScreenType, breakPoints, defaultRatio]);
  (0, _react.useEffect)(() => {
    const isStatic = ratio === defaultRatio || alwaysStaticMain === true ? true : false;
    setStaticMain(isStatic);
  }, [ratio]);
  return {
    ratio,
    staticMain
  };
};

var _default = useConfig;
exports.default = _default;