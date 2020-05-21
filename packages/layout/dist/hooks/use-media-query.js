"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _system = require("../contexts/system");

const useMediaQuery = query => {
  const system = (0, _react.useContext)(_system.System);

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        match = _useState2[0],
        setMatch = _useState2[1];

  const supportMediaQueries = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  (0, _react.useEffect)(() => {
    if (supportMediaQueries) {
      console.log(query);
      const match = window.matchMedia(query);
      setMatch(match.matches);
    }
  }, [system.windowWidth, query, supportMediaQueries]);
  return supportMediaQueries ? match : undefined;
};

var _default = useMediaQuery;
exports.default = _default;