"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar-collapse.js";

const NavbarCollapse = props => {
  return _react.default.createElement("div", {
    class: "collapse navbar-collapse show",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: void 0
  }, props.children);
};

var _default = NavbarCollapse; // const NavbarCollapse = props => {
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

exports.default = _default;