"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeExpression = void 0;

const normalizeExpression = expression => {
  return expression[0] === '=' ? expression : "[".concat(expression, "]");
};

exports.normalizeExpression = normalizeExpression;