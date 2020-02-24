"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _helpers = require("../../helpers");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useMapPropsToDef = props => {
  const qFieldExpr = (0, _helpers.normalizeExpression)(props.qFieldExpr);
  const qLabelExpr = props.qLabelExpr ? props.qLabelExpr : "\n    '".concat(props.qFieldExpr, " '&if(getSelectedCount(").concat(qFieldExpr, ")>0,\n      if(count(distinct ").concat(qFieldExpr, ")=1 and getSelectedCount(").concat(qFieldExpr, ")=1,\n        only(").concat(qFieldExpr, "),\n        getSelectedCount(").concat(qFieldExpr, ")&' selected'\n      )\n    )");
  const qId = props.qId,
        qDataPageHeight = props.qDataPageHeight;
  const qSortByState = props.qSortByState,
        qSortByNumeric = props.qSortByNumeric,
        qSortByAscii = props.qSortByAscii,
        qSortByExpression = props.qSortByExpression;
  const qObjectDef = (0, _react.useMemo)(() => {
    return props.qObjectDef ? props.qObjectDef : {
      "qInfo": {
        "qType": "ListObject"
      },
      "qListObjectDef": {
        "qDef": props.qDimensionDef ? props.qDimensionDef : {
          "qFieldDefs": [qFieldExpr],
          "qFieldLabels": [props.qFieldExpr],
          "qSortCriterias": [props.qSortObject],
          "qAutoSortByState": {
            qDisplayNumberOfRows: props.qSortObject.qSortByState
          },
          "qLabelExpression": "".concat(props.qLabelExpr)
        },
        "qInitialDataFetch": [{
          qTop: 0,
          qLeft: 0,
          qHeight: props.qDataPageHeight || 30,
          qWidth: 1
        }]
      },
      "label": {
        qStringExpression: {
          qExpr: qLabelExpr
        }
      },
      "appObjectId": "'".concat(props.qId, "'")
    };
  }, [qId, qFieldExpr, qLabelExpr, qDataPageHeight, qSortByState, qSortByNumeric, qSortByAscii, qSortByExpression]);
  return qObjectDef;
};

var _default = useMapPropsToDef;
exports.default = _default;