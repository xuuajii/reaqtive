"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvAppContextProvider = exports.RqtvAppContext = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _logo = _interopRequireDefault(require("./logo.png"));

var _q = require("@reaqtive/q");

var _layout = require("@reaqtive/layout");

var _wildMatch = _interopRequireDefault(require("./wild-match"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\contexts\\rqtv-app-context.js";

const RqtvAppContext = _react.default.createContext();

exports.RqtvAppContext = RqtvAppContext;
const qFieldListDef = {
  "qInfo": {
    "qId": "",
    "qType": "FieldList"
  },
  "qFieldListDef": {
    "qShowSystem": false,
    "qShowHidden": false,
    "qShowSemantic": true,
    "qShowSrcTables": true
  }
};
const qCurrentSelectionsDef = {
  "qInfo": {
    "qId": "",
    "qType": "SessionLists"
  },
  "qSelectionObjectDef": {},
  qSelections: null,
  qFields: null
};

const RqtvAppContextConsumer = props => {
  const theme = props.theme,
        brand = props.brand,
        title = props.title,
        brandUrl = props.brandUrl,
        brandStyle = props.brandStyle,
        hidePrefix = props.hidePrefix,
        pages = props.pages,
        sideMenuFieldsMatch = props.sideMenuFieldsMatch,
        searchFieldMatch = props.searchFieldMatch;
  /******************************************************/
  // qDoc app settings: get all objects and data
  //which are managed directly by the qDoc and that are used in RqtvApp (current selections and field list)

  /******************************************************/

  const qDocHandler = (0, _react.useContext)(_q.QDoc);

  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qDoc = _useState2[0],
        setQDoc = _useState2[1];

  (0, _react.useEffect)(() => {
    setQDoc(qDocHandler.qDoc);
  }, [qDocHandler]);
  const qFieldListHandler = (0, _q.useQObjectHandler)(qDoc, qFieldListDef);
  const qFieldListLayoutHandler = (0, _q.useQLayoutHandler)(qFieldListHandler.qObject);
  const qCurrentSelectionsHandler = (0, _q.useQObjectHandler)(qDoc, qCurrentSelectionsDef);
  const qCurrentSelectionsLayoutHandler = (0, _q.useQLayoutHandler)(qCurrentSelectionsHandler.qObject);
  const qFieldList = qFieldListLayoutHandler.qLayout;
  const qCurrentSelections = qCurrentSelectionsLayoutHandler.qLayout;
  const enhancedFieldList = (0, _q.useEnhancedFieldList)(qFieldList && qFieldList.qFieldList, qCurrentSelections);

  const markField = (field, method, maskArray) => {
    const keep = method === 'include' ? true : false;
    const match = maskArray.reduce((max, mask, index) => {
      const matchResult = (0, _wildMatch.default)(field.qName, maskArray[index]) || max;
      return keep ? matchResult : !matchResult;
    }, false);
    return (0, _objectSpread2.default)({}, field, {
      match
    });
  };

  const filterFieldList = (fieldLsit, matchParams) => fieldLsit && fieldLsit.map(field => markField(field, matchParams.method, matchParams.mask)).filter(field => field.match === true);

  const sideMenuFieldList = filterFieldList(enhancedFieldList, sideMenuFieldsMatch);
  const searchFieldList = filterFieldList(enhancedFieldList, searchFieldMatch);
  /******************************************************/
  // handle layout settings (e.g. maximization) managed at app level

  /******************************************************/

  const system = (0, _react.useContext)(_layout.System);
  const location = (0, _reactRouterDom.useLocation)();

  const _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        isMaximized = _useState4[0],
        setIsMaximized = _useState4[1];

  const _useState5 = (0, _react.useState)(),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        scrollPostioMemo = _useState6[0],
        setScrollPostioMemo = _useState6[1];

  const scrollTo = scrollPosition => {
    const mainNode = system.getAppMainNode();
    mainNode.scrollTop = scrollPosition;
  };

  (0, _react.useEffect)(() => {
    const mainNode = system.getAppMainNode();

    const maximize = () => {
      setScrollPostioMemo(mainNode.scrollTop);
      system.hideOverflow();
      scrollTo(0);
    };

    const restore = () => {
      //console.log(isMaximized, scrollPostioMemo)
      system.showOverflow();
      scrollTo(scrollPostioMemo);
      setScrollPostioMemo(0);
    };

    isMaximized ? maximize() : restore();
  }, [isMaximized]);
  (0, _react.useEffect)(() => {
    setScrollPostioMemo(0);
    scrollTo(0);
    setIsMaximized(false);
  }, [location.pathname]);
  return _react.default.createElement(RqtvAppContext.Provider, {
    value: {
      theme,
      brand,
      title,
      brandUrl,
      brandStyle,
      hidePrefix,
      qFieldList,
      enhancedFieldList,
      qCurrentSelections,
      sideMenuFieldList,
      searchFieldList,
      filterFieldList,
      pages,
      setIsMaximized
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110
    },
    __self: void 0
  }, props.children);
};

const RqtvAppContextProvider = props => {
  return _react.default.createElement(RqtvAppContextConsumer, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135
    },
    __self: void 0
  }), props.children);
};

exports.RqtvAppContextProvider = RqtvAppContextProvider;
RqtvAppContextConsumer.propTypes = {
  theme: _propTypes.default.shape({
    useRippleEffect: _propTypes.default.bool,
    useShadowEffect: _propTypes.default.bool,
    useAnimations: _propTypes.default.bool,
    selectionsHidePrefix: _propTypes.default.string
  }),
  title: _propTypes.default.string,
  brand: _propTypes.default.string,
  brandUrl: _propTypes.default.string,
  brandStyle: _propTypes.default.object,
  sideMenuFieldsMatch: _propTypes.default.shape({
    method: _propTypes.default.oneOf(['include', 'exclude']),
    mask: _propTypes.default.arrayOf(_propTypes.default.string)
  }),
  searchFieldMatch: _propTypes.default.shape({
    method: _propTypes.default.oneOf(['include', 'exclude']),
    mask: _propTypes.default.arrayOf(_propTypes.default.string)
  })
};
RqtvAppContextConsumer.defaultProps = {
  theme: {
    useRippleEffect: true,
    useShadowEffect: true,
    useAnimations: true
  },
  title: 'ReaqtivateApp',
  brand: _logo.default,
  brandUrl: 'https://it.reactjs.org/',
  brandStyle: {
    height: 40,
    width: 40,
    alt: "",
    display: "inline-block",
    verticalAlign: 'top'
  },
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