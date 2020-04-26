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

var _index2 = require("./custom-prop-types/index.js");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/rqtv-app.js";

/**
 * RqtvApp
 *
 * It provides routing using react router and a context that allows you to store
 * app info to be available everywhere inside your app.
 *
 */
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
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement(_rqtvAppContext.RqtvAppContextProvider, Object.assign({}, rqtvAppProps, {
    pages: pages,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvAppRenderer, {
    qCapabilityApiRequired: qCapabilityApiRequired,
    triggersDone: triggerState.qLoading === false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  }, props.children.length && props.useRouter === true ? _react.default.createElement(_reactRouterDom.Switch, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: void 0
  }, props.children) : props.children)));
};

RqtvApp.propTypes = {
  /**
   * triggers to fire when opening the app (do not abuse triggers)
   *
   */
  triggers: _index2.triggerType,

  /**
   * the title of the app displayed in the navbar
   *
   */
  title: _propTypes.default.string,

  /**
   * the brand of the app displayed in the navbar. An image is expected: import it in the app and pass it as a prop
   *
   */
  brand: _propTypes.default.string,

  /**
   * the url to redirect to when clicking on the brand
   *
   */
  brandUrl: _propTypes.default.string,

  /**
   * styles to be applied to the image container
   *
   */
  brandStyle: _propTypes.default.object,

  /**
   * if true the applicatin will be wrapped in react router and in a switch
   *
   */
  useRouter: _propTypes.default.bool,

  /**
   * fields to be displayed in the side menu. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
   *
   */
  sideMenuFieldsMatch: _propTypes.default.shape({
    method: _propTypes.default.oneOf(['include', 'exclude']),
    mask: _propTypes.default.arrayOf(_propTypes.default.string)
  }),
  useRouter: _propTypes.default.bool,

  /**
   * fields to be used in the search object in the navbar. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
   *
   */
  searchFieldMatch: _propTypes.default.shape({
    method: _propTypes.default.oneOf(['include', 'exclude']),
    mask: _propTypes.default.arrayOf(_propTypes.default.string)
  }),

  /**
   * Prefix to hide a field in current selections modal. Hidden fields will be considered in selectins count and in back, forward actions
   *
   */
  hidePrefix: '%'
};
RqtvApp.defaultProps = {
  triggers: [],
  useRouter: true,
  hidePrefix: '%',
  sideMenuFieldsMatch: {
    method: 'include',
    mask: ['**']
  },
  searchFieldMatch: {
    method: 'include',
    mask: ['**']
  }
};
var _default = RqtvApp;
exports.default = _default;