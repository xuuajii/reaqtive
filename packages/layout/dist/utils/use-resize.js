"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useDebounce3 = require("use-debounce");

const rectMap = new WeakMap();

function manageRects(entries) {
  for (let entry of entries) {
    const setter = rectMap.get(entry.target);
    setter(entry.contentRect);
  }
} // Babel changes `global` to `window` for client-side code


const observer = 'ResizeObserver' in global && new ResizeObserver(manageRects);

const useResize = element => {
  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        rect = _useState2[0],
        setRect = _useState2[1];

  (0, _react.useEffect)(() => {
    if (!element) {
      return;
    } else {
      rectMap.set(element, setRect);
      observer.observe(element);
    }

    return () => {
      observer.unobserve(element);
      rectMap.delete(element);
    };
  }, [element]);

  const _useDebounce = (0, _useDebounce3.useDebounce)(rect, 300),
        _useDebounce2 = (0, _slicedToArray2.default)(_useDebounce, 1),
        debouncedRect = _useDebounce2[0];

  return debouncedRect;
};

var _default = useResize;
exports.default = _default;