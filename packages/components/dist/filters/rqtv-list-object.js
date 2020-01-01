"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const RqtvListObject = props => {
  const _props$qLayoutHandler = props.qLayoutHandler,
        isSelecting = _props$qLayoutHandler.isSelecting,
        setIsSelecting = _props$qLayoutHandler.setIsSelecting;
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout;
  const qDimensionInfo = qLayout && qLayout.qListObject.qDimensionInfo;

  const _useState = (0, _react.useState)(true),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isMounted = _useState2[0],
        setIsMounted = _useState2[1];

  (0, _react.useEffect)(() => {
    return () => setIsMounted(false);
  }, []);
  (0, _react.useEffect)(() => {
    if (isSelecting === true) {
      props.onBeginSelections && props.onBeginSelections();
    }

    if (isSelecting === false) {
      props.onEndSelections && props.onEndSelections();
    }
  }, [isSelecting]);

  const _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        isSearching = _useState4[0],
        setIsSearching = _useState4[1];

  const _useState5 = (0, _react.useState)(false),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        isGettingScrollData = _useState6[0],
        setIsGettingScrollData = _useState6[1];

  const _useState7 = (0, _react.useState)(false),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        errorGettingScrollData = _useState8[0],
        setErrorGettingScrollData = _useState8[1];

  const qFieldName = qLayout && qDimensionInfo.qGroupFieldDefs[qLayout && qDimensionInfo.qGroupPos];
  const activeField = (0, _q.useQFieldHandler)(qFieldName, props.alwaysOneSelected, props.defaultValue);

  const _useState9 = (0, _react.useState)(0),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        qTop = _useState10[0],
        setQTop = _useState10[1];

  const qObject = props.qObjectHandler && props.qObjectHandler.qObject; //console.log(isSelecting)

  const scroll = (qDisplayArea, callback) => {
    qObject.getListObjectData('/qListObjectDef', [qDisplayArea]).then(qNewDataPage => {
      props.qLayoutHandler.applyQLayoutPatch('qLayout/qListObject/qDataPages', qNewDataPage);
      callback();
    }).catch(qErr => {
      console.log(qErr);
      callback();
    });
  };

  const updateDisplayArea = (qObject, qDisplayArea) => {
    setIsGettingScrollData(true);
    scroll(qDisplayArea, () => setIsGettingScrollData(false));
  };

  (0, _react.useEffect)(() => {
    const qDisplayArea = qLayout && qLayout.qListObject.qDataPages[0].qArea; //console.log(qDisplayArea&&qDisplayArea.qTop)

    props.qLayoutHandler.setOnUpdate({
      fn: callback => scroll(qDisplayArea, () => callback())
    });
  }, [qLayout && qLayout.qListObject.qDataPages[0].qArea.qTop]);
  const rqtvListObject = {
    isSelecting: isSelecting,
    isSearching: isSearching,
    setIsSearching: setIsSearching,
    isGettingScrollData: isGettingScrollData,
    activeField: qFieldName,
    beginSelections: (value, callback = console.log) => {
      setIsSelecting(true);
      qObject.beginSelections(['/qListObjectDef']).then(qResult => {
        //console.log(qResult)
        qObject.selectListObjectValues('/qListObjectDef', [value], true);
      }).catch(qErr => {
        setIsSelecting(false);
        callback(qErr);
      });
    },
    selectValue: (value, callback) => {
      if (activeField.nxProperties && activeField.nxProperties.qOneAndOnlyOne === true || props.toggle === false) {
        qObject.selectListObjectValues('/qListObjectDef', [value], false).then(qResult => {
          props.onSelect(qResult);
          callback && callback(qResult);
        }).catch(qErr => {
          console.log(qErr);
          callback && callback(qErr);
        });
      } else {
        rqtvListObject.toggleSelect(value, callback);
      }
    },
    toggleSelect: (value, callback) => {
      isSelecting === true || props.quickSelectMode === true ? qObject.selectListObjectValues('/qListObjectDef', [value], true).then(qResult => {
        props.onSelect(qResult);
        callback && callback(qResult);
      }).catch(qErr => {
        console.log(qErr);
        callback && callback(qErr);
      }) : rqtvListObject.beginSelections(value);
    },
    endSelections: (qAccept, callback) => {
      //console.log(callback)
      const isQAccepting = qAccept === '1' || qAccept === true ? true : false;
      setIsSelecting(false);
      qObject.endSelections(isQAccepting).then(qRes => {
        //console.log(1)
        callback && callback();
      }).catch(qErr => callback(qErr));
    },
    searchListObjectFor: string => {
      //console.log(1,string)
      setIsSearching(true);
      qObject.searchListObjectFor('/qListObjectDef', string).catch(qErr => console.log(qErr));
    },
    acceptListObjectSearch: () => {
      setIsSearching(false);
      qObject.acceptListObjectSearch('/qListObjectDef', true).catch(qErr => console.log(qErr));
    },
    abortListObjectSearch: () => {
      qObject.abortListObjectSearch('/qListObjectDef').then(setIsSearching(false)).catch(qErr => console.log(qErr));
    },
    clearSelections: callback => {
      qObject.clearSelections('/qListObjectDef').catch(qErr => callback && callback(qErr));
    },
    selectPossible: callback => {
      qObject.selectListObjectPossible('/qListObjectDef').catch(qErr => callback(qErr));
    },
    selectExcluded: callback => {
      qObject.selectListObjectExcluded('/qListObjectDef').catch(qErr => callback(qErr));
    },
    // Retrieve scroll data. Data is fetched by this component
    // then sent to the layout as a patch with is path
    getNewDataPage: qDisplayArea => {
      updateDisplayArea(qObject, qDisplayArea);
    }
  };

  const childrenArray = _react.default.Children.toArray(props.children);

  const enhancedChildren = childrenArray.map(child => _react.default.cloneElement(child, (0, _objectSpread2.default)({}, props, {
    rqtvListObject
  })));
  return enhancedChildren && isMounted === true ? enhancedChildren : null;
};

RqtvListObject.propTypes = {
  toggle: _propTypes.default.bool,
  alwaysOneSelected: _propTypes.default.bool,
  defaultValue: _propTypes.default.string,
  quickSelectMode: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onBeginSelections: _propTypes.default.func,
  onEndSelections: _propTypes.default.func
};
RqtvListObject.defaultProps = {
  alwaysOneSelected: false,
  defaultValue: null,
  toggle: true,
  quickSelectMode: false,
  onSelect: () => true,
  onBeginSelections: () => true,
  onEndSelections: () => true
};
var _default = RqtvListObject;
exports.default = _default;