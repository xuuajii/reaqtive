"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _index = require("../../index");

var _helpers = require("../../helpers");

var _q = require("@reaqtive/q");

var _index2 = _interopRequireDefault(require("../rqtv-listbox/index"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-modal-listbox\\index.js";

/**
 * RqtvModalListbox
 * It allows you to wrap a listbox inside a modal: the listbox will be hidden and a button will be shown.
 * Clicking the button the listbox will appear inside a modal
 */
const RqtvModalListbox = props => {
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showModal = _useState2[0],
        setShowModal = _useState2[1];

  const openModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const qFieldExpr = (0, _helpers.normalizeExpression)(props.listboxProps.qFieldExpr);
  const qFieldHandler = (0, _q.useQFieldHandler)(props.listboxProps.qFieldExpr);
  const qField = qFieldHandler && qFieldHandler.qField;
  const defaultLabelExpr = "\n    '".concat(props.listboxProps.qFieldExpr, " '&\n    if(getSelectedCount(").concat(qFieldExpr, ")>0,\n      if(len(only(").concat(qFieldExpr, "))>0,only(").concat(qFieldExpr, "),getSelectedCount(").concat(qFieldExpr, ")&' selected'\n      )\n    )");
  const qLabelExpr = props.qLabelExpr ? props.qLabelExpr : defaultLabelExpr; //console.log(qLabelExpr);

  const listboxProps = (0, _objectSpread2.default)({
    showHeaderButtonbar: true,
    alwaysShowSearch: true
  }, props.listboxProps);
  return _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvButton, {
    onClick: openModal,
    label: props.listboxProps.qFieldExpr,
    qLabelExpr: qLabelExpr,
    className: props.buttonClassName,
    style: props.buttonStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }), _react.default.createElement(_layout.Modal, {
    open: showModal,
    onClose: handleClose,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: void 0
  }, _react.default.createElement(_layout.ModalDialog, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: void 0
  }, _react.default.createElement(_layout.ModalHeader, {
    title: " ",
    close: handleClose,
    showDismiss: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: void 0
  }), _react.default.createElement(_layout.ModalBody, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: void 0
  }, _react.default.createElement(_index2.default, Object.assign({}, props.listboxProps, {
    height: 300,
    alwaysShowSearch: props.alwaysShowSearch,
    qId: 5,
    onEndSelections: () => setShowModal(false),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }))), _react.default.createElement(_layout.ModalFooter, {
    showDismiss: true,
    dismissLabel: "Cancel",
    close: handleClose,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: void 0
  }, !(qFieldHandler.nxProperties && qFieldHandler.nxProperties.qOneAndOnlyOne === true) && _react.default.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    onClick: () => qFieldHandler.qField.clear(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: void 0
  }, "Clear")))));
};

RqtvModalListbox.propTypes = {
  /**
   * The expression used in the listbox title and in the button that toggles the listbox
   */
  qLabelExpr: _propTypes.default.string,

  /**
   * className for the dropdown button
   */
  buttonClassName: _propTypes.default.string,

  /**
   * style object to customize the dropdown button
   */
  buttonStyle: _propTypes.default.object,

  /**
   * the props which will be passed to the listbox
   */
  listboxProps: _propTypes.default.object
};
RqtvModalListbox.defaultProps = {
  buttonStyle: {},
  buttonClassName: 'primary text-light'
};
var _default = RqtvModalListbox;
exports.default = _default;