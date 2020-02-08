"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvPageContext = exports.RqtvPageProvider = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\contexts\\rqtv-page-context.js";

const RqtvPageContext = _react.default.createContext();

exports.RqtvPageContext = RqtvPageContext;

const useQPageObjectDef = qConditionExpr => (0, _react.useMemo)(() => {
  return {
    qInfo: {
      qType: "tableData"
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr
      }
    }
  };
}, [qConditionExpr]);

const RqtvPageConsumer = props => {
  const triggerState = (0, _q.useTriggers)(props.triggers);
  const qConditionExpr = props.conditionExpr;
  const qObjectDef = useQPageObjectDef(qConditionExpr);
  const qObjectHandler = (0, _q.useQObjectReducer)(qObjectDef);
  const qLayoutHandler = (0, _q.useQLayoutReducer)(qObjectHandler);
  const qCondition = qLayoutHandler.qLayout && qLayoutHandler.qLayout.qCondition;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        conditionRes = _useState2[0],
        setconditionRes = _useState2[1];

  (0, _react.useEffect)(() => {
    if (qCondition === '0') {
      setconditionRes(false);
    }

    if (qCondition === '-1') {
      setconditionRes(true);
    }
  }, [qCondition]);
  return _react.default.createElement(RqtvPageContext.Provider, {
    value: {
      triggerState,
      pageData: props.pageData,
      conditionRes
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  }, props.children);
};

const RqtvPageProvider = props => {
  return _react.default.createElement(RqtvPageConsumer, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: void 0
  }), props.children);
};

exports.RqtvPageProvider = RqtvPageProvider;
RqtvPageProvider.propTypes = {
  triggers: _propTypes.default.array.isRequired,
  conditionExpr: _propTypes.default.string
};
RqtvPageProvider.defaultProps = {
  triggers: [],
  conditionExpr: ""
};