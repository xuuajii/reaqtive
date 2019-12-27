"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _index = require("../index");

var _helpers = require("../helpers/helpers");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useQGlobalSearch = (fields, searchString, qItemOffSet, qItemCount, qMatchOffset = 0, qMatchCount = 20) => {
  //console.log(fields)
  const qInitialSearchParams = {
    qOptions: {
      qSearchFields: fields,
      qContext: 'CONTEXT_CURRENT_SELECTIONS',
      qCharEncoding: 'CHAR_ENCODING_UTF8'
    },
    qTerms: [],
    qPage: {
      qOffset: qItemOffSet,
      qCount: qItemCount,
      qGroupItemOptions: [{
        qGroupItemType: 'FIELD',
        qOffset: qMatchOffset,
        qMatchCount: 20
      }]
    }
  };
  const qDocHandler = (0, _react.useContext)(_index.QDoc);

  const _useState = (0, _react.useState)(qInitialSearchParams),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qSearchParams = _useState2[0],
        setQSearchParams = _useState2[1];

  const _useState3 = (0, _react.useState)(null),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qSearchResults = _useState4[0],
        setQSearchResults = _useState4[1];

  const intialQEngineError = {
    qError: false
  };

  const _useState5 = (0, _react.useState)(true),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qLoading = _useState6[0],
        setQLoading = _useState6[1];

  const _useState7 = (0, _react.useState)(intialQEngineError),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        qEngineError = _useState8[0],
        setQEngineError = _useState8[1];

  const _useState9 = (0, _react.useState)(0),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        qErrorCount = _useState10[0],
        setQErrorCount = _useState10[1];

  const search = searchString => {
    const patchedParams = (0, _helpers.getPatchedObject)(qSearchParams, 'qTerms', [searchString]);
    patchedParams && searchString && qDocHandler.qDoc && qDocHandler.qDoc.searchResults(patchedParams).then(qResults => {
      setQSearchResults(qResults);
      setQEngineError(intialQEngineError);
      setQErrorCount(0);
      setQLoading(false);
    }).catch(qErr => {
      setQErrorCount(qErrorCount => qErrorCount + 1);
    });
  };

  (0, _react.useEffect)(() => {
    if (qErrorCount >= 10) {
      console.log('error searching');
      setQEngineError({
        qError: true,
        rqtvMessage: 'error getting global search results'
      });
      setQSearchResults(null);
      setQLoading(false);
    } else {
      search(searchString);
    }
  }, [qErrorCount, searchString]);

  const selectSearchResults = (searchString, qId, callback) => {
    const selectSearchParams = (0, _helpers.replaceObjectProp)(qSearchParams, 'qPage', 'qMatchIx', qId);
    const patchedSelectSearchParams = (0, _helpers.getPatchedObject)(selectSearchParams, 'qTerms', [searchString]); // console.log(patchedSelectSearchParams)

    qDocHandler.qDoc.selectAssociations(patchedSelectSearchParams).then(qResult => {
      if (callback) {
        callback();
      }
    }).catch(qErr => {
      console.log('error accepting global search', qErr);
      setQEngineError({
        isError: true,
        errorMessage: qErr
      });
    });
  };

  (0, _react.useEffect)(() => {
    const resetSearch = () => {
      setQSearchResults();
      setQLoading(true);
      setQEngineError(intialQEngineError);
    };

    searchString ? search(searchString) : resetSearch();
  }, [searchString, qItemOffSet]);
  return {
    qSearchResults,
    qLoading,
    qEngineError,
    selectSearchResults
  };
};

var _default = useQGlobalSearch;
exports.default = _default;