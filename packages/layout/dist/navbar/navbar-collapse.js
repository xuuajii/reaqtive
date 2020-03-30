"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar-collapse.js";

const NavbarCollapse = props => {
  const system = (0, _react.useContext)(_index.System);
  const verticalNavbar = system.windowWidth < system.breakPoints[props.breakPoint] ? true : false;
  return verticalNavbar === false ? _react.default.createElement("div", {
    className: "collapse navbar-collapse show ".concat(props.className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.Children.toArray(props.children).map(child => _react.default.cloneElement(child, {
    verticalNavbar
  }))) : _react.default.createElement(_index.AnimatedCollapseDiv, {
    className: "navbar-collapse ".concat(props.className),
    show: props.showCollapse,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  }, _react.default.Children.toArray(props.children).map(child => _react.default.cloneElement(child, {
    verticalNavbar
  })));
};

var _default = NavbarCollapse;
exports.default = _default;
NavbarCollapse.propTypes = {
  className: _propTypes.default.string,
  breakPoint: _propTypes.default.string
};
NavbarCollapse.defaultProps = {
  className: '',
  breakPoint: 'lg'
}; // const NavbarCollapse = props => {
//
//   const collapseEl=useRef()
//   const getRefHeight = (ref) => {
//     return ref.current?ref.current.getBoundingClientRect().height:0
//   }
//
//   //((console.log( collapseEl.current&&collapseEl.current.offsetHeight )
//   const transitions = useTransition(props.show, null, {
//     enter: ()=> async next =>{
//       const height= getRefHeight(collapseEl)
//       //console.log(height)
//       if(height){
//         await next({height:height, overflow:'hidden'})
//         await next({  height:"auto", overflow:'visible'})
//       }
//     },
//     leave:()=>async next=>{
//       const height= getRefHeight(collapseEl)
//       //console.log(height)
//       if(height){
//         await next({  height:height, overflow:'hidden'})
//         await next({height:0, overflow:'hidden'})
//       }
//     },
//     from:{  height:0, overflow:'hidden'},
//     unique:true
//     })
//     return transitions.map(({ item, props:animatedProps, key }) =>
//       item&&
//       <animated.div className="collapse navbar-collapse show" key={key} style={{...animatedProps}} >
//           <div ref={collapseEl}>{props.children}</div>
//       </animated.div>
//     )
//
// }