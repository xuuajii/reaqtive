"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

/*Select one value of one field*/
const fieldSelectionTrigger = _propTypes.default.shape({
  type: 'fieldSelection',
  params: _propTypes.default.shape({
    fieldName: _propTypes.default.string,
    value: _propTypes.default.string
  })
});
/*Select multiple values of one field*/


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
/*Clear one field*/


const clearFieldTrigger = _propTypes.default.shape({
  type: 'clearField',
  params: _propTypes.default.shape({
    fieldName: _propTypes.default.string
  })
});

const triggerType = _propTypes.default.oneOf([clearFieldTrigger, fieldSelectionsTrigger, fieldSelectionTrigger]);

var _default = triggerType;
exports.default = _default;