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
  const qInitialSearchParams = (0, _react.useMemo)(() => {
    return {
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
  }, [fields, qItemOffSet, qMatchOffset, qItemCount]);
  const qDocHandler = (0, _react.useContext)(_index.QDoc); //const [qSearchParams, setQSearchParams] = useState(qInitialSearchParams)

  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qSearchResults = _useState2[0],
        setQSearchResults = _useState2[1];

  const intialQEngineError = {
    qError: false
  };

  const _useState3 = (0, _react.useState)(true),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qLoading = _useState4[0],
        setQLoading = _useState4[1];

  const _useState5 = (0, _react.useState)(intialQEngineError),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qEngineError = _useState6[0],
        setQEngineError = _useState6[1];

  const _useState7 = (0, _react.useState)(0),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        qErrorCount = _useState8[0],
        setQErrorCount = _useState8[1];

  const search = (0, _react.useCallback)(searchString => {
    const patchedParams = (0, _helpers.getPatchedObject)(qInitialSearchParams, 'qTerms', [searchString]);
    patchedParams && searchString && qDocHandler.qDoc && qDocHandler.qDoc.searchResults(patchedParams).then(qResults => {
      setQSearchResults(qResults);
      setQEngineError(intialQEngineError);
      setQErrorCount(0);
      setQLoading(false);
    }).catch(qErr => {
      qErrorCount >= 10 && console.log(qErr);
      setQErrorCount(qErrorCount => qErrorCount + 1);
    });
  }, [qInitialSearchParams]);
  (0, _react.useEffect)(() => {
    if (qErrorCount >= 10) {
      console.log('error searching', qErrorCount);
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
    const selectSearchParams = (0, _helpers.replaceObjectProp)(qInitialSearchParams, 'qPage', 'qMatchIx', qId);
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
    selectSearchResults,
    search
  };
};

var _default = useQGlobalSearch;
exports.default = _default;