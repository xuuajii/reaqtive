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

var _reactRouterDom = require("react-router-dom");

var _index = require("../hooks/index");

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\contexts\\rqtv-page-context.js";

const RqtvPageContext = _react.default.createContext();

exports.RqtvPageContext = RqtvPageContext;

const useQPageObjectDef = (qConditionExpr, qTitleExpr) => (0, _react.useMemo)(() => {
  return {
    qInfo: {
      qType: "tableData"
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr
      }
    },
    qTitle: {
      qStringExpression: {
        qExpr: qTitleExpr
      }
    }
  };
}, [qConditionExpr, qTitleExpr]);

const RqtvPageConsumer = props => {
  const location = (0, _reactRouterDom.useLocation)(); // const [locationSearch, setLocationSearch] = useState(null)
  // useEffect(()=>{
  //   setLocationSearch(location.search)
  //   return () => setLocationSearch(null)
  // },[location.search])

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
  const triggerState = (0, _q.useTriggers)(triggers); //console.log(location.search,triggers, queryStringTriggers)

  const qConditionExpr = props.conditionExpr;
  const qTitleExpr = props.qTitleExpr;
  const qObjectDef = useQPageObjectDef(qConditionExpr, qTitleExpr);
  const qObjectHandler = (0, _q.useQObjectReducer)(qObjectDef);
  const qLayoutHandler = (0, _q.useQLayoutReducer)(qObjectHandler);
  const qCondition = qLayoutHandler.qLayout && qLayoutHandler.qLayout.qCondition;

  const _useState3 = (0, _react.useState)(),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        conditionRes = _useState4[0],
        setConditionRes = _useState4[1];

  const qTitle = qLayoutHandler.qLayout && qLayoutHandler.qLayout.qTitle;
  (0, _react.useEffect)(() => {
    if (qCondition === '0') {
      setConditionRes(false);
    }

    if (qCondition === '-1') {
      setConditionRes(true);
    }

    return () => setConditionRes(null);
  }, [qCondition]);
  return _react.default.createElement(RqtvPageContext.Provider, {
    value: {
      triggerState,
      pageData: props.pageData,
      conditionRes,
      qTitle
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: void 0
  }, props.children);
};

const RqtvPageProvider = props => {
  return _react.default.createElement(RqtvPageConsumer, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
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