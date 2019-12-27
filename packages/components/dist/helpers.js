"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeExpression = void 0;

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const normalizeExpression = expression => {
  return expression[0] === '=' ? expression : "[".concat(expression, "]");
};

exports.normalizeExpression = normalizeExpression;