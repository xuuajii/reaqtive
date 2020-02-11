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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\current-selections\\rqtv-current-selections-modal.js";

const RqtvCurrentSelectionsModal = props => {
  const modalBodyEl = (0, _react.useRef)();

  const _useState = (0, _react.useState)(''),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        activeField = _useState2[0],
        setActiveField = _useState2[1];

  const _useState3 = (0, _react.useState)(props.currentSelections),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        filteredSelections = _useState4[0],
        setFilteredselections = _useState4[1]; //const isMounted = useIsMounted()


  (0, _react.useEffect)(() => {
    const hideSelections = selectionField => selectionField.qField.indexOf(props.hidePrefix) !== 0;

    setFilteredselections(props.currentSelections.filter(hideSelections)); //console.log(filteredSelections)
  }, [props.currentSelections, props.hidePrefix]);
  const activFieldListbox = (0, _react.useMemo)(() => {
    return _react.default.createElement(_index.RqtvListbox, {
      title: activeField,
      focus: false,
      qFieldExpr: activeField,
      height: (modalBodyEl.current && modalBodyEl.current.offsetHeight) * 0.875,
      showHeaderButtonbar: true,
      alwaysShowSearch: true,
      qId: 'cs',
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
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
      lineNumber: 48
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
      lineNumber: 49
    },
    __self: void 0
  }, _react.default.createElement(_layout.ModalDialog, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: void 0
  }, _react.default.createElement(_layout.ModalHeader, {
    title: "Current Selections",
    close: props.close,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: void 0
  }), _react.default.createElement(_layout.ModalBody, {
    modalBodyEl: modalBodyEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }, _react.default.createElement(_layout.Carousel, {
    index: activeField === '' ? 0 : 1,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: void 0
  }, _react.default.createElement(_layout.CarouselPanel, {
    key: 0,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: void 0
  }, _react.default.createElement(CurrentSelectionsList, {
    currentSelections: filteredSelections,
    setActiveField: setActiveField,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: void 0
  })), _react.default.createElement(_layout.CarouselPanel, {
    key: 1,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: void 0
  }, _react.default.createElement(CurrentSelectionsListbox, {
    backToFieldList: () => setActiveField(''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: void 0
  }, activFieldListbox)))), _react.default.createElement(_layout.ModalFooter, {
    showDismiss: false,
    dismissLabel: "Cancel",
    close: props.close,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: void 0
  }, _react.default.createElement(_rqtvCurrentSelectionsToolbar.default, Object.assign({
    className: "in-modal",
    isResponsive: false,
    showModalToggler: false,
    inModal: true
  }, props.toolbarProps, {
    alwayShowToolbar: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: void 0
  }))))));
};

const CurrentSelectionsList = props => {
  return props.currentSelections.length > 0 ? _react.default.createElement("ul", {
    className: "list-group current-selections-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: void 0
  }, props.currentSelections.map((currentSelectionField, index) => _react.default.createElement(_currentSelectionsField.default, {
    item: currentSelectionField,
    key: index,
    setActiveField: props.setActiveField,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
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
      lineNumber: 98
    },
    __self: void 0
  }, _react.default.createElement("h4", {
    style: {
      textAlign: 'center',
      fontSize: "1.2rem"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99
    },
    __self: void 0
  }, _react.default.createElement(_layout.LuiIcon, {
    iconType: "info",
    className: "lui-icon--large",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100
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
    lineNumber: 107
  },
  __self: void 0
}, _react.default.createElement("div", {
  style: {
    margin: '0 1rem 0 0'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 108
  },
  __self: void 0
}, _react.default.createElement("button", {
  className: "btn primary ripple back",
  onClick: () => props.backToFieldList(),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 109
  },
  __self: void 0
}, _react.default.createElement(_layout.Icon, {
  type: _layout.chevronLeft,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 110
  },
  __self: void 0
}))), _react.default.createElement("div", {
  style: {
    flexGrow: 1,
    height: '100%'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 113
  },
  __self: void 0
}, props.children));

var _default = RqtvCurrentSelectionsModal;
exports.default = _default;