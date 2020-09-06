"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _rqtvRenderer = _interopRequireDefault(require("./rqtv-renderer"));

var _q = require("@reaqtive/q");

var _rqtvAppLoading = _interopRequireDefault(require("./rqtv-app-loading"));

var _rqtvAppError = _interopRequireDefault(require("./rqtv-app-error"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/loading/rqtv-app-renderer.js";

//import {conditionalDelay} from '../../../helpers'
//export default
function conditionalDelay(delay) {
  return process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_LOCAL_AS_PROD === 'FALSE' ? 0 : delay;
}

const RqtvAppRenderer = props => {
  const appLauncher = useRqtvAppLauncher(props.qCapabilityApiRequired, props.triggerDone);
  return _react.default.createElement(_rqtvRenderer.default, {
    loading: appLauncher.loading,
    error: appLauncher.error,
    customLoading: _react.default.createElement(_rqtvAppLoading.default, {
      value: appLauncher.progress * 100,
      height: 3,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: void 0
    }),
    customError: _react.default.createElement(_rqtvAppError.default, {
      errorMessage: appLauncher.errorMessage,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, props.children);
};

const useRqtvAppLauncher = (qCapabilityApiRequired, triggersDone) => {
  const _useState = (0, _react.useState)(true),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        loading = _useState2[0],
        setLoading = _useState2[1];

  const _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        error = _useState4[0],
        setError = _useState4[1];

  const _useState5 = (0, _react.useState)(),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        errorMessage = _useState6[0],
        setErrorMessage = _useState6[1];

  const _useState7 = (0, _react.useState)(0),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        progress = _useState8[0],
        setProgress = _useState8[1];

  const qDocHandler = (0, _react.useContext)(_q.QDoc);
  const qGlobalHandler = (0, _react.useContext)(_q.QGlobal);
  const qCapabilityApiHandlerContext = (0, _react.useContext)(qCapabilityApiRequired === true ? _q.QCapabilityApi : {});
  const qAppHandlerContext = (0, _react.useContext)(qCapabilityApiRequired === true ? _q.QApp : {});
  const qCapabilityApiHandler = qCapabilityApiHandlerContext ? qCapabilityApiHandlerContext : {
    qLoading: false,
    qError: false
  };
  const qAppHandler = qAppHandlerContext ? qAppHandlerContext : {
    qLoading: false,
    qError: false
  };
  const contextValues = {
    qCapabilityApi: qCapabilityApiRequired ? 0.3 : 0,
    qApp: qCapabilityApiRequired ? 0.3 : 0,
    qDoc: qCapabilityApiRequired ? 0.2 : 0.5,
    qGlobal: qCapabilityApiRequired ? 0.2 : 0.5
  };

  const updateProgress = (increment, context) => {
    const updatedProgress = !context.qError ? progress + increment : progress + 0.1; //console.log(updatedProgress)

    if (context.qError) {
      setErrorMessage(context.qError.rqtvMessage);
    }

    const progressWithTrigger = triggersDone ? updatedProgress : Math.min(0, updatedProgress - 0.05);
    setProgress(updatedProgress);
  };

  (0, _react.useEffect)(() => {
    !qDocHandler.qLoading && updateProgress(contextValues.qDoc, qDocHandler);
  }, [qDocHandler.qLoading]);
  (0, _react.useEffect)(() => {
    !qGlobalHandler.qLoading && updateProgress(contextValues.qGlobal, qGlobalHandler);
  }, [qGlobalHandler.qLoading]);
  (0, _react.useEffect)(() => {
    !qAppHandler.qLoading && updateProgress(contextValues.qApp, qAppHandler);
  }, [qAppHandler.qLoading]);
  (0, _react.useEffect)(() => {
    !qCapabilityApiHandler.qLoading && updateProgress(contextValues.qCapabilityApi, qCapabilityApiHandler);
  }, [qCapabilityApiHandler.qLoading]);
  (0, _react.useEffect)(() => {
    //console.log(errorMessage)
    const hasError = qAppHandler.qError || qDocHandler.qError || qGlobalHandler.qError || qCapabilityApiHandler.qError ? true : false;
    const loadingComplete = progress === 1 || hasError ? true : false;

    const set = () => {
      setTimeout(() => setLoading(!loadingComplete), conditionalDelay(700));
      setError(hasError);
    };

    setTimeout(set, conditionalDelay(500));
  }, [progress]);
  return {
    progress,
    loading,
    error,
    errorMessage
  };
};

var _default = RqtvAppRenderer;
exports.default = _default;