"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = require("react");

var _index = require("../index");

var _helpers = require("../helpers/helpers");

var _lodash = _interopRequireDefault(require("lodash"));

const searchObjectDefReducer = (state, action) => {
  switch (action.type) {
    case 'search':
      const qTerms = Array.isArray(action.qTerms) ? action.qTerms : [action.qTerms];
      return (0, _objectSpread2.default)({}, state, {
        qTerms: qTerms
      });
      break;

    case 'scroll':
      return (0, _objectSpread2.default)({}, state, {
        qPage: (0, _objectSpread2.default)({}, state.qPage, {
          qOffset: action.qOffset
        })
      });
      break;

    default:
      console.log('error searching');
      throw new Error();
  }
};

const initializeState = (fields, qItemCount, qMatchOffset, qMatchCount) => {
  return {
    qOptions: {
      qSearchFields: fields,
      qContext: 'CONTEXT_CLEARED',
      qCharEncoding: 'CHAR_ENCODING_UTF8'
    },
    qTerms: [],
    qPage: {
      qOffset: 0,
      qCount: qItemCount,
      qGroupItemOptions: [{
        qGroupItemType: 'FIELD',
        qOffset: qMatchOffset,
        qMatchCount: qMatchCount
      }]
    }
  };
};

const initialSearchState = {
  qLoading: true,
  qEngineError: false,
  qErrorCounter: 5,
  qSearchResults: null
};

const qSearchResultsReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return (0, _objectSpread2.default)({}, initialSearchState, {
        qSearchResults: action.qSearchResults,
        qLoading: false
      });
      break;

    case 'error':
      const newErrorCounter = state.qErrorCounter + 1;
      return state.maxErrorCounter > state.qErrorCounter ? (0, _objectSpread2.default)({}, initialSearchState, {
        qErrorCounter: newErrorCounter
      }) : (0, _objectSpread2.default)({}, initialSearchState, {
        qLoading: false,
        qEngineError: true,
        qErrorObject: action.qErrorObject,
        rqtvMessage: 'error getting searchresults'
      });
      break;

    case 'new-search':
      return (0, _objectSpread2.default)({}, initialSearchState);
      break;

    default:
      console.log('error searching');
      throw new Error();
  }
};

const searchQDoc = async (qDoc, searchObjectDef) => {
  try {
    const qSearchResults = await qDoc.searchResults(searchObjectDef);
    return qSearchResults;
  } catch (err) {
    return err;
  }
};

const useQGlobalSearch = (fields, searchString, qItemOffSet, qItemCount, qMatchOffset = 0, qMatchCount = 20) => {
  //console.log(fields)
  const qDocHandler = (0, _react.useContext)(_index.QDoc);
  const initialSearchObjectDef = initializeState(fields, qItemCount, qMatchOffset, qMatchCount);

  const _useReducer = (0, _react.useReducer)(searchObjectDefReducer, initialSearchObjectDef),
        _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
        qSearchObjectDef = _useReducer2[0],
        dispatchDef = _useReducer2[1];

  const _useReducer3 = (0, _react.useReducer)(qSearchResultsReducer, initialSearchState),
        _useReducer4 = (0, _slicedToArray2.default)(_useReducer3, 2),
        qSearchResults = _useReducer4[0],
        dispatchResults = _useReducer4[1];

  const currentOffset = (0, _react.useRef)(0);
  (0, _react.useEffect)(() => {
    dispatchResults({
      type: 'new-search'
    });

    if (searchString) {
      dispatchDef({
        qTerms: searchString,
        type: 'search'
      });
    }
  }, [searchString]);
  (0, _react.useEffect)(() => {
    dispatchDef({
      qTerms: qItemOffSet,
      type: 'scroll'
    });
  }, [qItemOffSet]);
  const search = (0, _react.useCallback)(async qSearchObjectDef => {
    const res = await searchQDoc(qDocHandler.qDoc, qSearchObjectDef);

    if (res instanceof Error) {
      dispatchResults({
        qErrorObject: res,
        type: 'error'
      });
    } else {
      if (_lodash.default.isEqual(res.qSearchTerms, qSearchObjectDef.qTerms)) dispatchResults({
        qSearchResults: res,
        type: 'success'
      });
    }
  }, [qDocHandler.qDoc]);
  (0, _react.useEffect)(() => {
    qSearchObjectDef.qTerms.length > 0 && search(qSearchObjectDef);
  }, [qSearchObjectDef, qSearchResults.qErrorCounter]);

  const selectSearchResults = (searchString, qId, callback) => {
    const selectSearchParams = (0, _helpers.replaceObjectProp)(initialSearchObjectDef, 'qPage', 'qMatchIx', qId);
    const patchedSelectSearchParams = (0, _helpers.getPatchedObject)(selectSearchParams, 'qTerms', [searchString]); // console.log(patchedSelectSearchParams)

    qDocHandler.qDoc.selectAssociations(patchedSelectSearchParams).then(qResult => {
      if (callback) {
        callback();
      }
    }).catch(qErr => {
      setQEngineError({
        isError: true,
        errorMessage: qErr
      });
    });
  };

  return (0, _objectSpread2.default)({}, qSearchResults, {
    selectSearchResults,
    search: () => search(qSearchObjectDef)
  });
};

var _default = useQGlobalSearch;
exports.default = _default;