"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../lib/index");

var _img_placeholder_italy = _interopRequireDefault(require("../../img_placeholder_italy.png"));

var _img_placeholder_world = _interopRequireDefault(require("../../img_placeholder_world.png"));

var _img_placeholder_contract = _interopRequireDefault(require("../../img_placeholder_contract.png"));

var _img_placeholder_direct = _interopRequireDefault(require("../../img_placeholder_direct.png"));

var _img_placeholder_kitchen = _interopRequireDefault(require("../../img_placeholder_kitchen.png"));

var _img_placeholder_generic = _interopRequireDefault(require("../../img_placeholder_generic.png"));

var _format = _interopRequireDefault(require("./format"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/icons/card.js";

const Card = props => {
  const data = props.data;
  const placeholders = {
    ITALIA: _img_placeholder_italy.default,
    ESTERO: _img_placeholder_world.default,
    CONTRACT: _img_placeholder_contract.default,
    DIRETTO: _img_placeholder_direct.default,
    PRODOTTO: _img_placeholder_kitchen.default,
    '-': _img_placeholder_generic.default
  }; // const formattedNumber = format(1000, '$ 0.00a', 'eu')

  return _react.default.createElement("div", {
    className: "card ".concat(data.category === '-' ? '' : data.category),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }, _react.default.createElement("img", {
    src: data.image === '-' ? placeholders[data.category] : data.image,
    className: "card-img-top",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }), _react.default.createElement("div", {
    className: "card-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, _react.default.createElement("h3", {
    className: "card-title",
    title: data.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }, data.title), _react.default.createElement("div", {
    className: "row flex-nowrap text-center",
    style: {
      overflowX: 'auto'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: void 0
  }, data.data.map((item, i) => _react.default.createElement("div", {
    className: "col kpi",
    key: i,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "card-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, item.label), _react.default.createElement("div", {
    className: "card-value",
    style: {
      color: item.color || null
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }, (0, _format.default)(item.value, Math.abs(item.value) > 1000 ? '$ 0.0a' : '$ 0a', 'eu'))))), _react.default.createElement("button", {
    onClick: () => props.goToDetail('Archinterni Arredamenti S.N.C.'),
    className: "btn fav ".concat(data.deltaPerc.color === '-' ? '' : data.deltaPerc.color),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "relative",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  }, data.deltaPerc.value.replace('-', '').replace('+', ''), _react.default.createElement("div", {
    className: "triangle",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement(_index.Icon, {
    type: data.deltaPerc.color === 'red' ? 'menuDown' : 'menuUp',
    size: 24,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: void 0
  }))))));
};

var _default = Card;
exports.default = _default;