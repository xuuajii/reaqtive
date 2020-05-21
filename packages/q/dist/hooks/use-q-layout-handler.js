"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("../helpers/helpers");

const useQLayoutHandler = (qObject, preventUpdate = false) => {
  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qLayout = _useState2[0],
        setQLayout = _useState2[1];

  const _useState3 = (0, _react.useState)(0),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qErrorCounter = _useState4[0],
        setQErrorCounter = _useState4[1];

  const _useState5 = (0, _react.useState)(false),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qError = _useState6[0],
        setQError = _useState6[1];

  const _useState7 = (0, _react.useState)(true),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        qLoading = _useState8[0],
        setQLoading = _useState8[1];

  const _useState9 = (0, _react.useState)(false),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        qUpdating = _useState10[0],
        setQUpdating = _useState10[1];

  const _useState11 = (0, _react.useState)(),
        _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
        onUpdate = _useState12[0],
        setOnUpdate = _useState12[1];

  const _useState13 = (0, _react.useState)(false),
        _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
        isSelecting = _useState14[0],
        setIsSelecting = _useState14[1];

  const qLayoutRef = (0, _react.useRef)();

  function handleQError(err) {
    qErrorCounter <= 10 ? setQErrorCounter(prevCounter => prevCounter + 1) : setQError({
      qError: true,
      rqtvMessage: 'error retrieving qLayout',
      qErrorObject: err
    });
  }

  function applyQLayoutPatch(path, patch) {
    const qLayoutPatched = (0, _helpers.getPatchedObject)(qLayout, path, patch); //console.log(qLayoutPatched)

    setQLayout(qLayoutPatched);
  }

  function getQLayout() {
    qObject.getLayout().then(qLayout => {
      setQLayout(qLayout);
    }).catch(err => {
      handleQError(err);
    });
  }

  const triggerUpdate = (0, _react.useCallback)(() => {
    //console.log(preventUpdate)
    if (preventUpdate === false) {
      setQUpdating(!preventUpdate);
    }
  }, [preventUpdate]);
  (0, _react.useEffect)(() => {
    const hasUpdated = !_lodash.default.isEqual(qLayoutRef.current, qLayout) && qLayout !== null;

    if (hasUpdated && qLoading === true) {
      qLayoutRef.current = qLayout;
      setQLoading(false);
    }

    if (hasUpdated && qUpdating === true) {
      //console.log('setToFalse',qUpdating)
      qLayoutRef.current = qLayout;
      setQUpdating(false);
    }
  }, [qLayout]);
  (0, _react.useEffect)(() => {
    if (qLoading === true && qObject !== null) {
      getQLayout();
    }
  }, [qLoading]);
  const layoutUpdater = (0, _react.useCallback)(updating => {
    if (isSelecting && onUpdate && typeof onUpdate.fn === 'function') {
      qObject && onUpdate.fn(() => setQUpdating(false));
    } else {
      qObject && getQLayout();
      setQUpdating(false);
    }
  }, [isSelecting, onUpdate, qObject]);
  (0, _react.useEffect)(() => {
    if (qUpdating === true && qObject !== null) {
      layoutUpdater(qUpdating);
    }
  }, [qUpdating]);
  (0, _react.useEffect)(() => {
    if (qObject) {
      getQLayout();
      qObject.on('changed', () => triggerUpdate());
      return () => qObject.removeAllListeners();
    }
  }, [qObject]);
  return {
    qLayout,
    qError,
    qLoading,
    applyQLayoutPatch,
    qUpdating,
    setOnUpdate,
    isSelecting,
    setIsSelecting
  };
};

var _default = useQLayoutHandler;
exports.default = _default;