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
const useQFieldHandler = (qFieldName, isAlwaysOneSelected, defaultValue) => {
  const qDocHandler = (0, _react.useContext)(_index.QDoc);
  const qDoc = qDocHandler.qDoc;

  const _useState = (0, _react.useState)(true),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qLoading = _useState2[0],
        setQLoading = _useState2[1];

  const _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qError = _useState4[0],
        setQError = _useState4[1];

  const _useState5 = (0, _react.useState)(),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qField = _useState6[0],
        setQField = _useState6[1];

  const _useState7 = (0, _react.useState)(null),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        nxProperties = _useState8[0],
        setNxProperties = _useState8[1];

  const _useState9 = (0, _react.useState)(),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        updatingNxProperties = _useState10[0],
        setUpdatingNxProperties = _useState10[1]; //Effect: getField and setNxProperties on qlikEngine every time inputs change


  (0, _react.useEffect)(() => {
    function selectDefaultAndSetNx(qField, defaultValue) {
      qField.select(defaultValue).then(qResult => qField.setNxProperties({
        "qOneAndOnlyOne": true
      }).then(qResult => console.log(qResult)).catch(qErr => {
        setQError({
          qError: true,
          rqtvMessage: "error setting ".concat(qFieldName, " alwaysOneSelected")
        });
        console.log("error setting ".concat(qFieldName, " alwaysOneSelected"), qErr);
      })).catch(qErr => {
        setQError({
          qError: true,
          rqtvMessage: "error selecting ".concat(defaultValue, " in ").concat(qFieldName, " and setting alwaysOneSelected")
        });
        console.log("error selecting ".concat(defaultValue, " in ").concat(qFieldName, " and setting alwaysOneSelected"), qErr);
      });
    } //console.log(qFieldName)


    qDoc && qFieldName && qFieldName.substring(0, 1) !== '=' && qDoc.getField(qFieldName).then(qField => {
      setQField(qField);
      setQLoading(false);

      if (isAlwaysOneSelected) {
        selectDefaultAndSetNx(qField, defaultValue);
      } else {
        setNxProperties({});
      }
    }).catch(qErr => {
      setQError({
        qError: true,
        rqtvMessage: "error getting qField".concat(qFieldName, " ")
      });
      console.log('error getting qField', qErr);
    });
  }, [qFieldName, isAlwaysOneSelected, defaultValue, qDoc]); //

  const _useState11 = (0, _react.useState)(true),
        _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
        isMounted = _useState12[0],
        setIsMounted = _useState12[1];

  (0, _react.useEffect)(() => {
    return () => setIsMounted(false);
  }, []); //Effect: read field nxProps from qlikEngine and update state nxProps, everytime qField changes

  (0, _react.useEffect)(() => {
    setUpdatingNxProperties(true);

    if (qField) {
      if (nxProperties === null) {
        qField.getNxProperties().then(nxProperties => {
          //console.log(nxProperties)
          setNxProperties(nxProperties);
          setUpdatingNxProperties(false);
        }).catch(qErr => {
          setUpdatingNxProperties(false);
          setQError({
            qError: true,
            rqtvMessage: "setting fieldNxProps"
          });
        });
      }

      qField.on('changed', () => qField.getNxProperties().then(nxProperties => {
        //console.log(nxProperties)
        if (isMounted === true) {
          setNxProperties(nxProperties);
          setUpdatingNxProperties(false);
        }
      }).catch(qErr => {
        setUpdatingNxProperties(false);
        console.log('error getting qField', qErr);
      }));
      return () => qField.removeAllListeners();
    }
  }, [qField]);
  return {
    qField,
    nxProperties,
    updatingNxProperties,
    qLoading,
    qError
  };
};

var _default = useQFieldHandler;
exports.default = _default;