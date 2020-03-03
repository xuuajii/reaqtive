"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _rqtvPageContext = require("../contexts/rqtv-page-context");

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\pages\\rqtv-page.js";

const useQConditionDef = qConditionExpr => (0, _react.useMemo)(() => {
  return {
    qInfo: {
      qType: "page-condition"
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr || ''
      }
    }
  };
}, [qConditionExpr]);

const RqtvPage = props => {
  const fallbackPage = props.fallbackPage;
  return _react.default.createElement(_rqtvPageContext.RqtvPageProvider, {
    triggers: props.triggers,
    qConditionExpr: props.qConditionExpr,
    qTitleExpr: props.qTitleExpr,
    hasQueryString: location.search !== "" ? true : false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, _react.default.createElement(RqtvPageConsumer, {
    fallbackPage: fallbackPage,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, props.children));
};

const RqtvPageConsumer = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const rqtvPageContext = (0, _react.useContext)(_rqtvPageContext.RqtvPageContext);
  const fallbackPage = props.fallbackPage;

  const _ref = rqtvPageContext && rqtvPageContext,
        triggerState = _ref.triggerState,
        qCondition = _ref.qCondition,
        qPageObjectHandler = _ref.qPageObjectHandler,
        qTitle = _ref.qTitle;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        triggersDone = _useState2[0],
        setTriggersDone = _useState2[1];

  (0, _react.useEffect)(() => {
    setTriggersDone(triggerState.done);
    return () => setTriggersDone(false);
  }, [triggerState.done]);
  (0, _react.useEffect)(() => {
    qPageObjectHandler.set;
  }, [location.pathname]); // useEffect(()=>{
  //   if( qCondition==='0' && fallbackPage && triggersDone===true){
  //     console.log('redirect')
  //   }
  //fallbackPage&&console.log(qCondition, qTitle, triggersDone)
  // },[qCondition, fallbackPage, triggersDone])

  if (qCondition === '0' && fallbackPage && triggersDone === true) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: fallbackPage ? fallbackPage : "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: void 0
    });
  }

  return props.children;
};

RqtvPage.propTypes = {
  triggers: _propTypes.default.array.isRequired,
  qConditionExpr: _propTypes.default.string,
  fallbackPage: _propTypes.default.string
};
RqtvPage.defaultProps = {
  triggers: [],
  qConditionExpr: ""
};
var _default = RqtvPage;
exports.default = _default;