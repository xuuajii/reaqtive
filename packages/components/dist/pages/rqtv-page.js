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

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/pages/rqtv-page.js";

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
/**
 * RqtvPage
 *
 * It is a container based on the Route component of the React Router.
 * It is a dummy component which provides a the RqtvPageContext and a QGenericObject with 2 experessions:
 * qTitleExpr --> providing the qTitle result
 * qConditionExpr --> providing the qCondition result
 * RqtvPage also accept triggers which are fired when the page mounts.
 * Like Routes RqtvPages can be nested. RqtvPage does not unMount when the route change.
 *
 */


const RqtvPage = props => {
  const fallbackPage = props.fallbackPage;
  return _react.default.createElement(_reactRouterDom.Route, {
    path: props.path,
    exact: props.exact,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: void 0
  }, _react.default.createElement(_rqtvPageContext.RqtvPageProvider, {
    triggers: props.triggers,
    qConditionExpr: props.qConditionExpr,
    qTitleExpr: props.qTitleExpr,
    hasQueryString: location.search !== "" ? true : false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }, _react.default.createElement(RqtvPageConsumer, {
    fallbackPage: fallbackPage,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  }, props.children)));
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
  }, [location.pathname]);

  if (qCondition === '0' && fallbackPage && triggersDone === true) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: fallbackPage ? fallbackPage : "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74
      },
      __self: void 0
    });
  }

  return props.children;
};

RqtvPage.propTypes = {
  /**
   * the path to reach the page. See React Router for details
   *
   */
  path: _propTypes.default.string.isRequired,

  /**
   * the name of the page displayed in the side-menu of the app. If not set it will be equal to the path, replacing '-' with  ' '
   *
   */
  linkName: _propTypes.default.string,

  /**
   * triggers fired when the page is mounted see @reaqtive/q docs for details
   *
   */
  triggers: _propTypes.default.array.isRequired,

  /**
   * the expression that can be used to make the title dynamic as in Qlik Sense sheets
   *
   */
  qTitleExpr: _propTypes.default.string,

  /**
   * a qlik espression that returns a value, used in combination with the fallback page prop, it redirects when false
   *
   */
  qConditionExpr: _propTypes.default.string,

  /**
   * the page the user is redicrected to when the qConditionExpr returns false (0)
   *
   */
  fallbackPage: _propTypes.default.string,

  /**
   * shows the route only if the path match exactly with the addressbar. See the React Router docs for details
   *
   */
  exact: _propTypes.default.bool
};
RqtvPage.defaultProps = {
  exact: false,
  triggers: [],
  qConditionExpr: "",
  qTitleExpr: "'My Reaqtive Page'"
};
var _default = RqtvPage;
exports.default = _default;