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
const useOutsideEventListener = (ref, fn, add, events = ['mousedown', 'touchstart']) => {
  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        hasListener = _useState2[0],
        setHasListener = _useState2[1]; //console.log(add)


  function checkoutsideClick(e) {
    if (ref.current && !ref.current.contains(window.event.target)) {
      //console.log(1)
      fn();
    }
  }

  function handleOutsideEventListener() {
    if (add === true) {
      //console.log('add')
      events.forEach(event => document.addEventListener(event, checkoutsideClick, false));
      setHasListener(true);
    } else {
      //console.log('remove')
      events.forEach(event => document.removeEventListener(event, checkoutsideClick, false));
      setHasListener(false);
    }
  }

  (0, _react.useEffect)(() => {
    handleOutsideEventListener();
    return () => {
      //console.log('remove')
      events.forEach(event => document.removeEventListener(event, checkoutsideClick, false));
      setHasListener(false);
    };
  }, [add, fn, handleOutsideEventListener, checkoutsideClick]);
  return hasListener;
};

var _default = useOutsideEventListener;
exports.default = _default;