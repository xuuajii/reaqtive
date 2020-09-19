"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _index = require("../index");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/modal/modal.js";

const Modal = props => {
  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        open = _useState2[0],
        setOpen = _useState2[1]; //console.log(open)


  const modalEl = (0, _react.useRef)();
  const system = (0, _react.useContext)(_index.System);
  (0, _react.useEffect)(() => {
    if (props.open === true) {
      // modalEl.current&&modalEl.current.classList.add('before-close')
      setOpen(props.open);
      system.hideOverflow();
    }

    return () => system.showOverflow();
  }, [props.open]);

  const closeModal = () => {
    setOpen(false);

    if (props.onClose) {
      props.onClose();
    }

    system.showOverflow();
  };

  const handleClick = e => {
    if (e.target === modalEl.current) {
      closeModal();
    }
  };

  const transitions = (0, _reactSpring.useTransition)(open, null, {
    from: {
      display: 'none',
      opacity: 0,
      transform: 'translateY(-30px)'
    },
    enter: {
      display: 'block',
      opacity: 1,
      transform: 'translateY(0px)'
    },
    leave: {
      opacity: 0,
      transform: 'translateY(-30px)'
    }
  });

  const children = _react.default.Children.toArray(props.children);

  return _react.default.createElement(_react.default.Fragment, null, transitions.map(({
    item,
    key,
    props
  }) => item && _react.default.createElement(_reactSpring.animated.div, {
    key: key,
    style: props,
    onClick: handleClick,
    ref: modalEl,
    className: "modal show ".concat(props.className ? props.className : ''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }, children.map(child => _react.default.cloneElement(child, {
    closeModal: closeModal
  })))), _react.default.createElement(_index.Backdrop, {
    show: open,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: void 0
  })); // return(
  //   open
  //   ?<>
  //     <div
  //       onClick={handleClick}
  //       ref={modalEl}
  //       className={`modal  ${open===true?' show':'hide'} ${props.className?props.className:''}`}
  //       style={{display:open===true?'block ':'none'}}
  //     >
  //       {children.map(child=>React.cloneElement(child, {closeModal:closeModal}))}
  //     </div>
  //     <Backdrop show={true}/>
  //   </>
  //   :<></>
  // )
};

Modal.propTypes = {
  open: _propTypes.default.bool.isRequired
};
var _default = Modal;
exports.default = _default;