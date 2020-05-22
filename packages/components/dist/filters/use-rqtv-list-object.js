"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

const useRqtvListObject = (qObjectHandler, qSelectionHandler, qLayoutHandler, quickSelectionMode = false, _toggle = true) => {
  const qObject = qObjectHandler.qObject;
  const handleSelections = qSelectionHandler.handleSelections;
  const qLayout = qLayoutHandler.qLayout,
        applyQLayoutPatch = qLayoutHandler.applyQLayoutPatch;
  const qIsOneAndOnlyOne = qLayout && qLayout.qListObject.qDimensionInfo.qIsOneAndOnlyOne;
  const toggle = qIsOneAndOnlyOne ? false : _toggle;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isSearching = _useState2[0],
        setIsSearching = _useState2[1];

  const _useState3 = (0, _react.useState)(),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        waitingDataPage = _useState4[0],
        setWaitingDataPage = _useState4[1];

  const currentDataPage = (0, _react.useRef)();
  const rqtvListObject = (0, _react.useMemo)(() => {
    return {
      isSearching: isSearching,
      waitingDataPage: waitingDataPage,
      selectValue: async (value, callback) => {
        handleSelections(async () => {
          try {
            await qObject.selectListObjectValues('/qListObjectDef', [value], toggle);

            if (qIsOneAndOnlyOne || quickSelectionMode) {
              rqtvListObject.abortListObjectSearch();
            }

            callback && callback();
          } catch (err) {
            console.log(err);
          }
        }, qIsOneAndOnlyOne || quickSelectionMode);
      },
      getDataPage: async qDisplayArea => {
        setWaitingDataPage(true);
        currentDataPage.current = qDisplayArea;

        try {
          const qNewDataPage = await qObject.getListObjectData('/qListObjectDef', [qDisplayArea]);

          if (qNewDataPage[0].qArea.qTop === currentDataPage.current.qTop) {
            applyQLayoutPatch('qLayout/qListObject/qDataPages', qNewDataPage);
          }
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
  return rqtvListObject;
};

var _default = useRqtvListObject;
exports.default = _default;