"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

const qButtonObjectDef = (qLabelExpr, qColorExpr) => (0, _react.useMemo)(() => {
  return {
    "qInfo": {
      "qType": "LayoutExpressions"
    },
    "label": {
      qStringExpression: {
        qExpr: qLabelExpr
      }
    },
    "color": {
      qStringExpression: {
        qExpr: qColorExpr
      }
    }
  };
}, [qLabelExpr, qColorExpr]);

var _default = qButtonObjectDef;
exports.default = _default;