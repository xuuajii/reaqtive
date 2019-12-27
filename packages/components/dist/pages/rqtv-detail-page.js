"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _index = require("../index");

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\pages\\rqtv-detail-page.js";

const RqtvDetailPage = props => {
  return _react.default.createElement(_reactRouterDom.Route, {
    path: props.masterPath + '/detail/:detailFieldValue',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  }, _react.default.createElement(RqtvDetail, {
    field: props.field,
    masterPath: props.masterPath,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, props.children));
};

const RqtvDetail = props => {
  const history = (0, _reactRouterDom.useHistory)();
  const params = (0, _reactRouterDom.useParams)();
  const triggerDone = (0, _q.useTriggers)([{
    type: 'fieldSelection',
    params: {
      fieldName: props.field,
      value: params.detailFieldValue
    }
  }]);
  const fieldCountDef = (0, _react.useMemo)(() => {
    return {
      "qInfo": {
        "qType": "LayoutExpressions"
      },
      "fieldCount": {
        qStringExpression: {
          qExpr: "count(distinct ".concat(props.field, ")")
        }
      }
    };
  }, [props.field]);
  const qDoc = (0, _react.useContext)(_q.QDoc);
  const qObjectHandler = (0, _q.useQObjectHandler)(qDoc.qDoc, fieldCountDef);
  const qLayoutHandler = (0, _q.useQLayoutHandler)(qObjectHandler.qObject);
  const fieldCount = qLayoutHandler.qLayout && qLayoutHandler.qLayout.fieldCount;
  (0, _react.useEffect)(() => {
    if (fieldCount !== '1' && fieldCount !== null) {
      history.push(props.masterPath);
    }
  }, [fieldCount]);
  return _react.default.createElement(_index.RqtvRenderer, {
    loading: qLayoutHandler.qLoading,
    error: qLayoutHandler.qError,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: void 0
  }, props.children);
};

RqtvDetailPage.propTypes = {
  field: _propTypes.default.string.isRequired
};
var _default = RqtvDetailPage;
exports.default = _default;