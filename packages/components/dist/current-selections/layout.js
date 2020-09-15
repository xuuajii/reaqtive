"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _rqtvCurrentSelectionsToolbar = _interopRequireDefault(require("./rqtv-current-selections-toolbar"));

var _rqtvCurrentSelectionsModal = _interopRequireDefault(require("./rqtv-current-selections-modal"));

var _index = require("../loading/index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/current-selections/layout.js";

const Layout = props => {
  //console.log(props)
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        currentSelectionModalOpen = _useState2[0],
        setCurrentSelectionModalOpen = _useState2[1];

  const qLayoutHandler = props.qLayoutHandler;
  const qLayout = qLayoutHandler && qLayoutHandler.qLayout;
  const qSelectionObject = qLayout && qLayout.qSelectionObject;

  const _useState3 = (0, _react.useState)([]),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        filteredSelections = _useState4[0],
        setFilteredselections = _useState4[1]; //const isMounted = useIsMounted()


  (0, _react.useEffect)(() => {
    const hideSelections = selectionField => selectionField.qField.indexOf(props.hidePrefix) !== 0;

    const filteredArray = qSelectionObject ? qSelectionObject.qSelections.filter(hideSelections) : [];
    qSelectionObject ? setFilteredselections(filteredArray) : setFilteredselections([]);
  }, [qSelectionObject, props.hidePrefix]); // console.log(qSelectionObject)

  const closeCurrentSelectionsModal = () => {
    setCurrentSelectionModalOpen(false);
  };

  const openCurrentSelectionsModal = () => {
    setCurrentSelectionModalOpen(true);
  };

  const _useState5 = (0, _react.useState)({
    loading: qLayoutHandler.qLoading,
    error: qLayoutHandler.qError,
    reload: props.qObjectHandler.reloadObject
  }),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        rendererProps = _useState6[0],
        setRendererProps = _useState6[1];

  (0, _react.useEffect)(() => {
    const rendererProps = {
      loading: qLayoutHandler.qLoading,
      error: qLayoutHandler.qError,
      reload: props.qObjectHandler.reloadObject
    };
    setRendererProps(rendererProps);
  }, [qLayoutHandler.qLoading, qLayoutHandler.qError]);
  return _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }), _react.default.createElement(_rqtvCurrentSelectionsToolbar.default, {
    qBackCount: props.rqtvCurrentSelectionsObject.qBackCount,
    qForwardCount: props.rqtvCurrentSelectionsObject.qForwardCount,
    qSelectionsCount: props.excludeHidden ? filteredSelections.length : props.rqtvCurrentSelectionsObject.qSelectionsCount,
    clearAll: props.rqtvCurrentSelectionsObject.clearAll,
    back: props.rqtvCurrentSelectionsObject.back,
    forward: props.rqtvCurrentSelectionsObject.forward,
    openCurrentSelectionsModal: openCurrentSelectionsModal,
    isResponsive: props.isResponsive,
    showModalToggler: props.showModalToggler,
    alwaysShowToolbar: props.alwaysShowToolbar,
    breakPoint: props.breakPoint,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }), props.useCurrentSelectionModal && _react.default.createElement(_rqtvCurrentSelectionsModal.default, {
    open: currentSelectionModalOpen,
    close: closeCurrentSelectionsModal,
    currentSelections: filteredSelections,
    hidePrefix: props.hidePrefix,
    toolbarProps: {
      qBackCount: props.rqtvCurrentSelectionsObject.qBackCount,
      qForwardCount: props.rqtvCurrentSelectionsObject.qForwardCount,
      qSelectionsCount: props.rqtvCurrentSelectionsObject.qSelectionsCount,
      clearAll: props.rqtvCurrentSelectionsObject.clearAll,
      back: props.rqtvCurrentSelectionsObject.back,
      forward: props.rqtvCurrentSelectionsObject.forward
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: void 0
  }));
};

var _default = Layout;
exports.default = _default;