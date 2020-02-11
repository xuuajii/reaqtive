"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _queryString = _interopRequireDefault(require("query-string"));

const parseSelection = selection => {
  const formatSelection = value => {
    const qIsNumeric = isNaN(Number(value)) ? false : true;
    return qIsNumeric ? {
      qIsNumeric: qIsNumeric,
      qNumber: Number(value)
    } : {
      qText: value
    };
  };

  return {
    type: 'fieldSelections',
    params: {
      fieldName: "[".concat(selection.substring(0, selection.indexOf(':')), "]"),
      values: selection.substring(selection.indexOf(':') + 1, selection.length).split(';').map(value => formatSelection(value))
    }
  };
};

const useQueryString = search => {
  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        triggers = _useState2[0],
        setTriggers = _useState2[1];

  (0, _react.useEffect)(() => {
    const values = _queryString.default.parse(search);

    const selectionsArray = Array.isArray(values.selections) ? values.selections : [values.selections];
    const parsedTriggers = search ? selectionsArray.map(selection => parseSelection(selection)) : [];
    setTriggers(parsedTriggers);
  }, [search]);
  return triggers;
};

var _default = useQueryString;
exports.default = _default;