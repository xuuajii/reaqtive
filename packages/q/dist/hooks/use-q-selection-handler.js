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
const qBeginSelections = async qObject => {
  try {
    const result = qObject.beginSelections(['/qListObjectDef']);
    return result;
  } catch (err) {
    return err;
  }
};

const qEndSelections = async (qObject, qAccept) => {
  try {
    const isQAccepting = qAccept === '1' || qAccept === 1 || qAccept === true ? true : false;
    const result = qObject.endSelections(isQAccepting);
    return result;
  } catch (err) {
    return err;
  }
};

const useQSelectionHandler = (qObject, quickSelectionMode = false) => {
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isSelecting = _useState2[0],
        setIsSelecting = _useState2[1];

  const beginSelections = (0, _react.useCallback)(callback => {
    const fn = async () => {
      try {
        const result = await qBeginSelections(qObject); //console.log('res',result)

        callback();
      } catch (err) {
        console.log(err);
        setIsSelecting(false);
      }
    }; //console.log('begin')
    //console.log(qObject)


    setIsSelecting(true);
    fn(qObject); //result instanceof Error?setIsSelecting(false):callback()
  }, [qObject]);
  const endSelections = (0, _react.useCallback)((qAccept, callback) => {
    const result = qEndSelections(qObject, qAccept);

    if (!(result instanceof Error)) {
      //console.log('end')
      setIsSelecting(false);
      typeof callback === 'function' && callback();
    }
  }, [qObject]);
  const handleSelections = (0, _react.useCallback)(callback => {
    if (quickSelectionMode === false && isSelecting === false) {
      beginSelections(callback);
    } else {
      //console.log('else')
      callback();
    }
  }, [quickSelectionMode, isSelecting, qObject]);
  return {
    isSelecting,
    handleSelections,
    endSelections,
    beginSelections
  };
};

var _default = useQSelectionHandler;
exports.default = _default;