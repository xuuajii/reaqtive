"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("../index");

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * QGenericObject
 * Creates a generic object and provides qObject and qLayout to its clid.
 * It expects only 1 child
 * It attaches an onChange event-listener to the qObject and automatically updates the layout when the event fires.
 * For example it can provide a listobject or a hypercube to its children.
 *
 * QGenericObject must have one and only one child. The child can be a React element (external layout mode) or a function that returns a React element (inline layout mode).
 *
 * See the example below for details
 */
const QGenericObject = (props, ref) => {
  const qObjectDef = props.qObjectDef,
        quickSelectionMode = props.quickSelectionMode;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isFocused = _useState2[0],
        setIsFocused = _useState2[1];

  const qObjectHandler = (0, _index.useQObjectReducer)(qObjectDef);
  const qObject = qObjectHandler.qObject;
  const qSelectionHandler = (0, _index.useQSelectionHandler)(qObjectHandler.qObject);
  const qLayoutHandler = (0, _index.useQLayoutReducer)(qObjectHandler, qSelectionHandler, isFocused);
  const moreThanOneChild = Array.isArray(props.children);
  (0, _react.useImperativeHandle)(ref, () => {
    return {
      getQObject: () => qObject
    };
  }, [qObject]);

  if (moreThanOneChild) {
    throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }

  return _react.default.isValidElement(props.children) ? _react.default.cloneElement(props.children, {
    props,
    qObjectHandler,
    qLayoutHandler,
    qSelectionHandler,
    qObjectDef,
    quickSelectionMode,
    setIsFocused
  }) : props.children({
    qObjectHandler,
    qLayoutHandler,
    qSelectionHandler,
    qObjectDef,
    quickSelectionMode
  });
};

const QGenericObjectWithRef = (0, _react.forwardRef)(QGenericObject);
QGenericObjectWithRef.propTypes = {
  /**
   * The definition of the qObject.
   * Check the following links for details
   * https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/genericobject.html
   */
  qObjectDef: _propTypes.default.object.isRequired,

  /**
   * If true the object will handle selections using Qlik Sense mode (user will have to accept selections)
   * If set to false the object will handle selections using QlikView mode (selection immediately applied)
   */
  quickSelectionMode: _propTypes.default.bool
};
QGenericObjectWithRef.defaultProps = {
  quickSelectionMode: true
};
var _default = QGenericObjectWithRef;
exports.default = _default;