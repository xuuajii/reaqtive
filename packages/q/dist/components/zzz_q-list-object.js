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

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const QListObject = props => {
  const qObject = props.qObjectHandler.qObject;
  const handleSelections = props.qSelectionHandler.handleSelections;
  const _props$qLayoutHandler = props.qLayoutHandler,
        qLayout = _props$qLayoutHandler.qLayout,
        applyQLayoutPatch = _props$qLayoutHandler.applyQLayoutPatch;
  const quickSelectionMode = props.quickSelectionMode;
  const qIsOneAndOnlyOne = qLayout && qLayout.qListObject.qDimensionInfo.qIsOneAndOnlyOne;
  const toggle = qIsOneAndOnlyOne || quickSelectionMode ? false : true;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isSearching = _useState2[0],
        setIsSearching = _useState2[1];

  const _useState3 = (0, _react.useState)(),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        waitingDataPage = _useState4[0],
        setWaitingDataPage = _useState4[1];

  const qListObject = (0, _react.useMemo)(() => {
    return {
      isSearching: isSearching,
      waitingDataPage: waitingDataPage,
      selectValue: async value => {
        handleSelections(async () => {
          try {
            await qObject.selectListObjectValues('/qListObjectDef', [value], toggle);
          } catch (err) {
            console.log(err);
          }
        }, !toggle);
      },
      getDataPage: async qDisplayArea => {
        setWaitingDataPage(true);

        try {
          const qNewDataPage = await qObject.getListObjectData('/qListObjectDef', [qDisplayArea]);
          applyQLayoutPatch('qLayout/qListObject/qDataPages', qNewDataPage);
        } catch (err) {
          console.log(err);
        } finally {
          setWaitingDataPage(false);
        }
      },
      searchListObjectFor: async string => {
        try {
          setIsSearching(true);
          await qObject.searchListObjectFor('/qListObjectDef', string);
        } catch (err) {
          console.log(err);
          setIsSearching(false);
        }
      },
      acceptListObjectSearch: async () => {
        try {
          setIsSearching(false);
          await qObject.acceptListObjectSearch('/qListObjectDef', true);
        } catch (err) {
          console.log(err);
          setIsSearching(true);
        }
      },
      abortListObjectSearch: async () => {
        try {
          setIsSearching(false);
          await qObject.abortListObjectSearch('/qListObjectDef');
        } catch (err) {
          console.log(err);
          setIsSearching(true);
        }
      },
      clearSelections: async () => {
        try {
          await qObject.clearSelections('/qListObjectDef');
        } catch (err) {
          console.log(err);
        }
      },
      selectPossible: async () => {
        try {
          await qObject.selectListObjectPossible('/qListObjectDef');
        } catch (err) {
          console.log(err);
        }
      },
      selectExcluded: async () => {
        try {
          await qObject.selectListObjectExcluded('/qListObjectDef');
        } catch (err) {
          console.log(err);
        }
      }
    };
  }, [qObject, qLayout, isSearching, waitingDataPage]);
  const moreThanOneChild = Array.isArray(props.children);

  if (moreThanOneChild) {
    throw "QListObject must have only one child, wrap the content inside a React element";
  }

  return _react.default.cloneElement(props.children, (0, _objectSpread2.default)({}, props, {
    qListObject
  }));
};

var _default = QListObject;
exports.default = _default;