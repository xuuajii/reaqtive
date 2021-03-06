"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layout = require("@reaqtive/layout");

var _index = require("../index");

var _currentSelectionsField = _interopRequireDefault(require("./current-selections-field"));

var _rqtvCurrentSelectionsToolbar = _interopRequireDefault(require("./rqtv-current-selections-toolbar"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/current-selections/rqtv-current-selections-modal.js";

const RqtvCurrentSelectionsModal = props => {
  const modalBodyEl = (0, _react.useRef)();

  const _useState = (0, _react.useState)(''),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        activeField = _useState2[0],
        setActiveField = _useState2[1]; //const [filteredSelections, setFilteredselections] = useState(props.currentSelections)
  //const isMounted = useIsMounted()
  // useEffect(()=>{
  //   const hideSelections = (selectionField) => selectionField.qField.indexOf(props.hidePrefix)!==0;
  //   setFilteredselections(props.currentSelections.filter(hideSelections))
  //   //console.log(filteredSelections)
  // }, [props.currentSelections, props.hidePrefix])


  const activFieldListbox = (0, _react.useMemo)(() => {
    return activeField === '' ? _react.default.createElement(_react.default.Fragment, null) : _react.default.createElement(_index.RqtvListbox, {
      title: activeField.qFieldExpr,
      focus: false,
      qFieldExpr: activeField.qFieldExpr,
      height: (modalBodyEl.current && modalBodyEl.current.offsetHeight) * 0.875,
      showHeaderButtonbar: activeField.toggle,
      alwaysShowSearch: true,
      toggle: activeField.toggle,
      quickSelectionMode: !activeField.toggle,
      qId: 'cs',
      qState: props.qState,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: void 0
    });
  }, [activeField]);

  const clearAll = () => {
    props.clearAll();
    props.close();
  };

  return _react.default.createElement("div", {
    className: "rqtv-current-selections-modal",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: void 0
  }, _react.default.createElement(_layout.Modal, {
    open: props.open,
    onClose: () => {
      setActiveField('');
      props.close();
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: void 0
  }, _react.default.createElement(_layout.ModalDialog, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: void 0
  }, _react.default.createElement(_layout.ModalHeader, {
    title: "Current Selections",
    close: props.close,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }), _react.default.createElement(_layout.ModalBody, {
    modalBodyEl: modalBodyEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: void 0
  }, _react.default.createElement(_layout.Carousel, {
    index: activeField === '' ? 0 : 1,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: void 0
  }, _react.default.createElement(CurrentSelectionsList, {
    currentSelections: props.currentSelections,
    setActiveField: setActiveField,
    qState: props.qState,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: void 0
  }), _react.default.createElement(CurrentSelectionsListbox, {
    backToFieldList: () => setActiveField(''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: void 0
  }, activFieldListbox))), _react.default.createElement(_layout.ModalFooter, {
    showDismiss: false,
    dismissLabel: "Cancel",
    close: props.close,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: void 0
  }, _react.default.createElement(_rqtvCurrentSelectionsToolbar.default, Object.assign({
    isResponsive: false,
    showModalToggler: false,
    inModal: true
  }, props.toolbarProps, {
    alwayShowToolbar: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: void 0
  }))))));
};

const CurrentSelectionsList = props => {
  return props.currentSelections.length > 0 ? _react.default.createElement("ul", {
    className: "list-group current-selections-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: void 0
  }, props.currentSelections.map((currentSelectionField, index) => _react.default.createElement(_currentSelectionsField.default, {
    item: currentSelectionField,
    key: index,
    setActiveField: props.setActiveField,
    qState: props.qState,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: void 0
  }))) : _react.default.createElement("div", {
    style: {
      textAlign: 'center',
      minHeight: '80px',
      verticalAlign: 'middle'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: void 0
  }, _react.default.createElement("h4", {
    style: {
      textAlign: 'center',
      fontSize: "1.2rem"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: void 0
  }, _react.default.createElement(_layout.LuiIcon, {
    iconType: "info",
    className: "lui-icon--large",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: void 0
  }), " No Selections"));
};

const CurrentSelectionsListbox = props => _react.default.createElement("div", {
  className: "current-selections-listbox d-flex align-items-center",
  style: {
    height: '100%'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 103
  },
  __self: void 0
}, _react.default.createElement("div", {
  style: {
    margin: '0 1rem 0 0'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 104
  },
  __self: void 0
}, _react.default.createElement("button", {
  className: "btn primary ripple back",
  onClick: () => props.backToFieldList(),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 105
  },
  __self: void 0
}, _react.default.createElement(_layout.Icon, {
  type: _layout.chevronLeft,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 106
  },
  __self: void 0
}))), _react.default.createElement("div", {
  style: {
    flexGrow: 1,
    height: '100%'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 109
  },
  __self: void 0
}, props.children));

var _default = RqtvCurrentSelectionsModal;
exports.default = _default;