"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/filters/rqtv-listbox/listbox-menu.js";

const ListboxMenu = props => {
  const items = [{
    id: 1,
    label: 'search',
    action: props.setShowSearch
  }, {
    id: 2,
    label: 'clear selections',
    action: props.clearSelections
  }, {
    id: 3,
    label: 'select possible',
    action: props.selectPossible
  }, {
    id: 4,
    label: 'select excluded',
    action: props.selectExcluded
  }];
  return _react.default.createElement(_layout.Dropdown, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }, _react.default.createElement(_layout.DropdownButton, {
    hideCaret: true,
    label: _react.default.createElement(_layout.LuiIcon, {
      iconType: "more",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }), _react.default.createElement(_layout.DropdownMenu, {
    align: "right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, items.map(item => _react.default.createElement(_layout.DropdownMenuItem, {
    key: item.id,
    action: () => item.action(),
    label: item.label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }))));
};

var _default = ListboxMenu;
exports.default = _default;