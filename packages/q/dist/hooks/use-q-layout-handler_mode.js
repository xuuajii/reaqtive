"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _objectPatcher = require("../helpers/object-patcher");

// import _ from 'lodash';
const useQLayoutHandler = qObject => {
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

  function handleQLayout(qLayout) {
    setQLayout(qLayout);
    setQLoading(false);
  }

  function handleQError(err) {
    qErrorCounter <= 10 ? setQErrorCounter(prevCounter => prevCounter + 1) : setQError({
      qError: true,
      rqtvMessage: 'error retrieving qLayout',
      qErrorObject: err
    });
  }

  function applyQLayoutPatch(path, patch) {
    const qLayoutPatched = (0, _objectPatcher.getPatchedObject)(qLayout, path, patch); //console.log(qLayoutPatched)

    setQLayout(qLayoutPatched);
  } // OLD patched layout
  // function handlePatchedLayout(){
  //   if(qLayoutPatch){
  //       //qLayoutPatch.getQLayoutPatch((qNewDataPage)=>{
  //       if(qLayoutPatch.patch){
  //         const qLayoutPatched = getPatchedObject(qLayout, qLayoutPatch.path, qLayoutPatch.patch)
  //         //console.log(qLayoutPatched)
  //         setQLayout(qLayoutPatched)
  //       }
  //     //})
  //     // if(qLayoutPatch.method)qLayoutPatch.method(qLayoutPatch.qDisplayArea).then(res=>console.log(res))
  //   	}else{
  //       //console.log('layout', qLayout&&qLayout.appObjectId)
  //       qObject.getLayout()
  //       .then(qLayout=> handleQLayout(qLayout))
  //       .catch(err=>handleQError(err))
  //     }
  // }


  function getQLayout() {
    qObject.getLayout().then(qLayout => {
      console.log('gotlayout');
      setQLayout(qLayout);
    }).catch(err => handleQError(err));
  }

  const updateLayout = () => {
    setQUpdating(true);
  };

  (0, _react.useEffect)(() => {
    if (qLayout || qError.qError) {
      setQLoading(false);
      setQUpdating(false);
    }
  }, [qLayout, qError]);
  (0, _react.useEffect)(() => {
    if ((qLoading === true || qUpdating === true) && qObject !== null) {
      getQLayout();
    }
  }, [qLoading, qUpdating]);
  (0, _react.useEffect)(() => {
    if (qObject) {
      getQLayout();
      qObject.on('changed', () => updateLayout());
      return () => qObject.removeAllListeners();
    }
  }, [qObject]);
  return {
    qLayout,
    qError,
    qLoading,
    applyQLayoutPatch
  };
};

var _default = useQLayoutHandler;
exports.default = _default;