"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = _interopRequireDefault(require("airbnb-prop-types"));

var _useQVariableReducer = _interopRequireDefault(require("../hooks/use-q-variable-reducer"));

var _useQLayoutReducer = _interopRequireDefault(require("../hooks/use-q-layout-reducer"));

/**
 * QVariable
 * It provides a variable and its layout to its child.
 * It automatically aupdate layout everytime the variable is updated by the engine calculations.
 *
 * QVariable must have one and only one child. The child can be a React element (external layout mode) or a function that returns a React element (inline layout mode).
 *
 * See the example below for details
 */
const QVariable = props => {
  const variableId = props.variableName || props.variableId;
  const idType = props.variableId ? 'id' : 'name';
  const qVariableHandler = (0, _useQVariableReducer.default)(variableId, idType);
  const qLayoutHandler = (0, _useQLayoutReducer.default)(qVariableHandler);
  const moreThanOneChild = Array.isArray(props.children);

  if (moreThanOneChild) {
    throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }

  return _react.default.isValidElement(props.children) ? _react.default.cloneElement(props.children, {
    props,
    qLayoutHandler,
    qVariableHandler
  }) : props.children({
    qLayoutHandler,
    qVariableHandler
  });
};

const exclusivePropTypes = {
  variableName: _propTypes.default.string,
  variableId: _propTypes.default.string
};
const exclusiveProps = Object.keys(exclusivePropTypes);
QVariable.propTypes = (0, _objectSpread2.default)({
  /**
   * The name of the variable. It must not be provided if variableId is provided
   */
  variableName: _propTypes.default.string,

  /**
   * The id of the variable. It must not be provided if variableName is provided
   */
  variableId: _propTypes.default.string
}, Object.fromEntries(exclusiveProps.map(exclusiveProp => [exclusiveProp, _airbnbPropTypes.default.and([exclusivePropTypes[exclusiveProp], (props, propName, componentName, ...rest) => {
  const propList = exclusiveProps.join(', ');
  const exclusivePropCount = Object.keys(props).filter(prop => props[prop] != null).reduce((count, prop) => count + (exclusivePropTypes[prop] ? 1 : 0), 0);

  if (exclusivePropCount > 1) {
    return new Error("A ".concat(componentName, " cannot have more than one of these props: ").concat(propList, ". Both expect a sting"));
  }

  if (exclusivePropCount < 1) {
    return new Error("A ".concat(componentName, " must have at least one of these props: ").concat(propList, ". Both expect a sting"));
  }
}])])));
var _default = QVariable;
exports.default = _default;