"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _q = require("@reaqtive/q");

var _rqtvAppContext = require("./contexts/rqtv-app-context");

var _index = require("./loading/index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-app.js";

const RqtvApp = props => {
  const qCapabilityApiRequired = props.qCapabilityApiRequired,
        children = props.children,
        triggers = props.triggers,
        rqtvAppProps = (0, _objectWithoutProperties2.default)(props, ["qCapabilityApiRequired", "children", "triggers"]);
  const triggerState = (0, _q.useTriggers)(props.triggers);

  const isRqtvPage = child => child; //.type&&child.type.name==='RqtvPage'


  const _useState = (0, _react.useState)(children),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        pages = _useState2[0],
        setPages = _useState2[1];

  (0, _react.useEffect)(() => {
    const sortedPages = _react.default.Children.toArray(props.children).sort((a, b) => {
      const pageA = a;
      const pageB = b;
      return pageA.props.path === '/' ? -1 : pageB.props.path === '/' ? 1 : 0;
    }); //.filter(isRqtvPage)


    const extractPageInfo = page => {
      const _page$props = page.props,
            linkName = _page$props.linkName,
            path = _page$props.path,
            icon = _page$props.icon,
            exactActiveMatch = _page$props.exactActiveMatch;
      const key = page.key;
      return {
        linkName: linkName ? linkName : path.replace(/-/g, ' ').replace(/\//, ''),
        path,
        key,
        icon,
        exactActiveMatch
      };
    };

    setPages(sortedPages.map(page => extractPageInfo(page)));
  }, []);
  (0, _react.useEffect)(() => {
    document.title = props.title;
  }, [props.title]);
  return _react.default.createElement(_reactRouterDom.HashRouter, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }, _react.default.createElement(_rqtvAppContext.RqtvAppContextProvider, Object.assign({}, rqtvAppProps, {
    pages: pages,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvAppRenderer, {
    qCapabilityApiRequired: qCapabilityApiRequired,
    triggersDone: triggerState.qLoading === false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, props.children.length && props.useRouter === true ? _react.default.createElement(_reactRouterDom.Switch, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: void 0
  }, props.children) : props.children)));
};

RqtvApp.propTypes = {
  triggers: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.arrayOf(_propTypes.default.shape({
    type: _propTypes.default.string,
    params: _propTypes.default.object
  }))]),
  title: _propTypes.default.string,
  useRouter: _propTypes.default.bool
};
RqtvApp.defaultProps = {
  triggers: [],
  title: 'Reaqtive App',
  useRouter: true
};
var _default = RqtvApp;
exports.default = _default;