"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _index = require("../index");

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

const abortModal = (qDoc, isSelecting) => {
  if (_index.QDoc && isSelecting) {
    qDoc && qDoc.abortModal(false);
  }
};

const useQSelectionHandler = qObject => {
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isSelecting = _useState2[0],
        setIsSelecting = _useState2[1];

  const qDocHandler = (0, _react.useContext)(_index.QDoc);
  const qDoc = qDocHandler.qDoc;
  (0, _react.useEffect)(() => {
    return () => abortModal(qDoc, isSelecting);
  }, [qDoc, isSelecting]);
  const beginSelections = (0, _react.useCallback)(callback => {
    const fn = async () => {
      try {
        const result = await qBeginSelections(qObject); //console.log('res',result)
      } catch (err) {
        console.log(err);
        setIsSelecting(false);
      } finally {
        callback();
      }
    };

    setIsSelecting(true);
    fn(qObject);
  }, [qObject]);
  const endSelections = (0, _react.useCallback)((qAccept, callback) => {
    const result = qEndSelections(qObject, qAccept);

    if (!(result instanceof Error)) {
      //console.log('end')
      setIsSelecting(false);
      typeof callback === 'function' && callback();
    }
  }, [qObject]);
  const handleSelections = (0, _react.useCallback)((callback, quickSelectionMode = false) => {
    if (quickSelectionMode === false && isSelecting === false) {
      beginSelections(callback);
    } else {
      //console.log('else')
      callback();
    }
  }, [isSelecting, qObject]);
  return {
    isSelecting,
    handleSelections,
    endSelections,
    beginSelections
  };
};

var _default = useQSelectionHandler;
exports.default = _default;