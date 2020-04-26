"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvPageContext = exports.RqtvPageProvider = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _index = require("../hooks/index");

var _q = require("@reaqtive/q");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/contexts/rqtv-page-context.js";

/**
 * RqtvPageContext
 * It is a react context. It provides generic info about the page.
 * It is provided by the RqtvPage component
 * It provides the page triggerState, the page title and teh page condition result
 */
const RqtvPageContext = _react.default.createContext();

exports.RqtvPageContext = RqtvPageContext;

const mapPageObject = (qTitleExpr, qConditionExpr) => {
  return {
    qInfo: {
      qType: "page-object"
    },
    qTitle: {
      qStringExpression: {
        qExpr: qTitleExpr
      }
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr
      }
    }
  };
};

const RqtvPageConsumer = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const queryStringTriggers = (0, _index.useQueryString)(location.search);

  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        triggers = _useState2[0],
        setTriggers = _useState2[1];

  (0, _react.useEffect)(() => {
    if (location.search !== null && location.search !== '' && Array.isArray(queryStringTriggers) && queryStringTriggers.length > 0) {
      setTriggers([...props.triggers, ...queryStringTriggers]);
    }

    if (location.search === '') {
      setTriggers([...props.triggers]);
    }

    return () => setTriggers(null);
  }, [props.triggers, queryStringTriggers, location.search]);
  const qConditionExpr = props.qConditionExpr,
        qTitleExpr = props.qTitleExpr;
  const qObjectDef = mapPageObject(qTitleExpr, qConditionExpr);
  const qObjectHandler = (0, _q.useQObjectReducer)(qObjectDef);
  const qLayoutHandler = (0, _q.useQLayoutReducer)(qObjectHandler);
  (0, _react.useEffect)(() => {
    //if(triggerState.done===true && qObjectHandler.qObject!==null && qConditionExpr!==''){
    qObjectHandler.qObject && qObjectHandler.qObject.setProperties((0, _objectSpread2.default)({}, qObjectDef, {
      qInfo: (0, _objectSpread2.default)({
        qId: qObjectHandler.qObject.id
      }, qObjectDef.qInfo),
      qExtendsId: ''
    })); //}
  }, [location.pathname, qConditionExpr, qTitleExpr, qObjectHandler]);
  const triggerState = (0, _q.useTriggers)(triggers);
  const qTitle = qLayoutHandler.qLayout && qLayoutHandler.qLayout.qTitle;
  const qCondition = qLayoutHandler.qLayout && qLayoutHandler.qLayout.qCondition;
  return _react.default.createElement(RqtvPageContext.Provider, {
    value: {
      triggerState,
      pageData: props.pageData,
      qTitle,
      qCondition,
      qPageObjectHandler: qObjectHandler
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: void 0
  }, props.children);
};

const RqtvPageProvider = props => {
  return _react.default.createElement(RqtvPageConsumer, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90
    },
    __self: void 0
  }), props.children);
};

exports.RqtvPageProvider = RqtvPageProvider;
RqtvPageProvider.propTypes = {
  triggers: _propTypes.default.array.isRequired,
  qConditionExpr: _propTypes.default.string,
  qTitleExpr: _propTypes.default.string
};
RqtvPageProvider.defaultProps = {
  triggers: [],
  qConditionExpr: "=''",
  qTitleExpr: "=''"
};