"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

const fieldSelectionTrigger = _propTypes.default.shape({
  type: 'fieldSelection',
  params: _propTypes.default.shape({
    fieldName: _propTypes.default.string,
    value: _propTypes.default.string
  })
});

const fieldSelectionsTrigger = _propTypes.default.shape({
  type: 'fieldSelections',
  params: _propTypes.default.shape({
    fieldName: _propTypes.default.string,
    value: _propTypes.default.arrayOf(_propTypes.default.shape({
      qText: _propTypes.default.string,
      qIsNumeric: _propTypes.default.bool,
      qNumber: _propTypes.default.number
    }))
  })
});

const clearFieldTrigger = _propTypes.default.shape({
  type: 'clearField',
  params: _propTypes.default.shape({
    fieldName: _propTypes.default.string
  })
});

const triggerType = _propTypes.default.oneOf([clearFieldTrigger, fieldSelectionsTrigger, fieldSelectionTrigger]);

var _default = triggerType;
exports.default = _default;