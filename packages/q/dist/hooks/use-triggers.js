"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _qDoc = require("../contexts/q-doc");

var _layout = require("@reaqtive/layout");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useTriggers = triggers => {
  ///////////////////////////////////////////////////////////////
  // handle state
  ///////////////////////////////////////////////////////////////
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        done = _useState2[0],
        setDone = _useState2[1];

  const _useState3 = (0, _react.useState)(true),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qLoading = _useState4[0],
        setQLoading = _useState4[1];

  const _useState5 = (0, _react.useState)(false),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qError = _useState6[0],
        setQError = _useState6[1];

  const _useState7 = (0, _react.useState)(false),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        progress = _useState8[0],
        setProgress = _useState8[1];

  const qDocHandler = (0, _react.useContext)(_qDoc.QDoc);
  const triggersMemo = (0, _layout.useDeepCompareMemo)(triggers);
  (0, _react.useEffect)(() => {
    return;
  }, []);
  (0, _react.useEffect)(() => {
    if (!triggers || triggers.length === 0 || progress === triggers.length) {
      setDone(true);
      setQLoading(false);
    }
  }, [progress]);
  (0, _react.useEffect)(() => {
    if (qDocHandler.qDoc) {
      triggers.forEach(trigger => fire(trigger));
    }

    return () => {
      qDocHandler.qDoc && triggers.forEach(trigger => {
        if (trigger.type === 'fieldSelection' && trigger.params.alwaysOneSelected === true) {
          removeAlwaysOneSelected(trigger.params);
        }
      });
    };
  }, [qDocHandler, triggersMemo]); ///////////////////////////////////////////////////////////////
  // fire the right trigger
  ///////////////////////////////////////////////////////////////

  const fire = trigger => {
    if (qError === false) switch (trigger.type) {
      case 'fieldSelection':
        selectFieldValue(trigger.params);
        setProgress(progress => progress + 1);
        break;

      default:
        console.log('unkown trigger type', trigger.type);
        setQLoading(false);
    }
  }; ///////////////////////////////////////////////////////////////
  // select field values trigger
  ///////////////////////////////////////////////////////////////


  const getField = async params => {
    try {
      const field = qDocHandler.qDoc.getField(params.fieldName);
      return field;
    } catch (err) {
      console.log('error getting trigger field', err);
      setQError(true);
    }
  };

  const select = async (field, params) => {
    try {
      const selected = field.select(params.value);
      return selected;
    } catch (err) {
      console.log('error selecting trigger value', err);
    }
  };

  const setNxProps = async (field, nxPropsValue) => {
    try {
      const setNxPropsDone = field.setNxProperties({
        "qOneAndOnlyOne": nxPropsValue
      });
      return setNxPropsDone;
    } catch (err) {
      console.log('error setting alwaysOneSelected in trigger', err);
    }
  };

  const selectFieldValue = async params => {
    const field = await getField(params);
    const selected = await select(field, params);
    const triggerDone = params.alwaysOneSelected ? await setNxProps(field, true) : true;
  };

  const removeAlwaysOneSelected = async params => {
    const field = await getField(params);
    const removed = await setNxProps(field, false); //console.log(field, removed)
  }; ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // return trigger state
  ///////////////////////////////////////////////////////////////


  return {
    done,
    qLoading,
    qError
  };
};

var _default = useTriggers;
exports.default = _default;