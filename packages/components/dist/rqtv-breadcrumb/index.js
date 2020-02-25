"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvBreadcrumb = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-breadcrumb\\index.js";

const RqtvBreadcrumb = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const history = (0, _reactRouterDom.useHistory)();

  const goToPage = page => {
    history.push('/' + page);
  };

  const crumbs = location.pathname.endsWith('/') ? location.pathname.slice(0, location.pathname.length - 1).replace('//', '/').split('/') : location.pathname.split('/'); //console.log(crumbs)

  const checkIsActive = crumb => crumb === crumbs[crumbs.length - 1] ? true : false;

  return _react.default.createElement(_layout.Breadcrumb, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, crumbs.map((crumb, index) => _react.default.createElement(_layout.BreadcrumbItem, {
    key: index,
    label: crumb === '' ? props.homeLabel : props.pathnameBeautifier(crumb),
    action: checkIsActive(crumb) ? () => false : () => goToPage(crumb),
    isActive: checkIsActive(crumb),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  })));
};

exports.RqtvBreadcrumb = RqtvBreadcrumb;
RqtvBreadcrumb.propTypes = {
  homeLabel: _propTypes.default.string,
  pathnameBeautifier: _propTypes.default.func
};
RqtvBreadcrumb.defaultProps = {
  homeLabel: 'home',
  pathnameBeautifier: pathname => pathname
};