"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QGlobalProvider = exports.QGlobal = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\q\\src\\lib\\contexts\\q-global.js";

const enigma = require('enigma.js');

const schema = require('enigma.js/schemas/12.20.0.json');

const SenseUtilities = require('enigma.js/sense-utilities');

const QGlobal = _react.default.createContext();
/**
 * QGlobal
 * This context provides a handler for the qGlobal provided by Qlik engine Api.
 * The handler is an object with 3 props:
 * qGlobal: the actual qGlobal provided by the qEngine. It is initially null and it is set when the promis is resolved
 * qError: initially null it is set to true if the promise for the qGlobal returns an error
 * qLoading: initially true, it is set to false when the promise to get the qGlobal is resolved
 * https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html
 */


exports.QGlobal = QGlobal;

const QGlobalProvider = props => {
  const initialQGlobalHandler = {
    qGlobal: null,
    qError: null,
    qLoading: true
  };

  const _useState = (0, _react.useState)(initialQGlobalHandler),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qGlobalHandler = _useState2[0],
        setQGlobalHandler = _useState2[1];

  (0, _react.useEffect)(() => {
    const connectToQEngine = () => {
      const url = SenseUtilities.buildUrl(props.qConfig);
      const session = enigma.create({
        schema,
        url
      });
      return new Promise(resolve => {
        resolve(session.open());
      });
    };

    connectToQEngine().then(qGlobal => {
      setQGlobalHandler({
        qError: null,
        qLoading: false,
        qGlobal: qGlobal
      });
    }).catch(qError => setQGlobalHandler({
      qGlobal: null,
      qLoading: false,
      qError: (0, _objectSpread2.default)({}, qError, {
        rqtvMessage: 'error loading qGlobal'
      })
    }));
  }, [props.qConfig]);
  return _react.default.createElement(QGlobal.Provider, {
    value: qGlobalHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, props.children);
};

exports.QGlobalProvider = QGlobalProvider;