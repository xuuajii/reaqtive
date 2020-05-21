"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _qDoc = require("../contexts/q-doc");

var _index = require("../hooks/index");

const QComponent = props => {
  const qDoc = (0, _react.useContext)(_qDoc.QDoc);

  const _useState = (0, _react.useState)(true),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isMounted = _useState2[0],
        set = _useState2[1];

  (0, _react.useEffect)(() => {
    return () => set(false);
  }, []);
  const qObjectHandler = (0, _index.useQObjectHandler)(qDoc.qDoc, props.qObjectDef);
  const qLayoutHandler = (0, _index.useQLayoutHandler)(qObjectHandler.qObject, !isMounted); //, qLayoutPatch)
  // console.log(qLayoutHandler)

  (0, _react.useEffect)(() => {
    //qObjectHandler.qObject&&qObjectHandler.qObject.removeAllListeners()
    return qDoc.qDoc ? () => qDoc.qDoc.abortModal(false) : () => true;
  }, [qDoc.qDoc]); // const [children, setChildren] = useState()
  // useEffect(()=>{
  //   const childrenArray = React.Children.toArray(props.children)
  //   const enhancedChildren = childrenArray.map(child=>React.cloneElement(child, {qObjectHandler, qLayoutHandler, qObjectDef:props.qObjectDef}))
  //   setChildren(enhancedChildren)
  //   return ()=>setChildren(null)
  // },[qLayoutHandler, qObjectHandler, props.qObjectDef])

  const childrenArray = _react.default.Children.toArray(props.children);

  const enhancedChildren = childrenArray.map(child => _react.default.cloneElement(child, {
    qObjectHandler,
    qLayoutHandler,
    qObjectDef: props.qObjectDef
  }));
  return enhancedChildren ? enhancedChildren : null;
};

var _default = QComponent;
exports.default = _default;