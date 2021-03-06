"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const wildMatch = (string, rule) => {
  // "."  => Find a single character, except newline or line terminator
  // ".*" => Matches any string that contains zero or more characters
  rule = rule.split("*").join(".*"); // "^"  => Matches any string with the following at the beginning of it
  // "$"  => Matches any string with that in front at the end of it

  rule = "^" + rule + "$"; //Create a regular expression object for matching string

  var regex = new RegExp(rule); //Returns true if it finds a match, otherwise it returns false

  return regex.test(string);
};

var _default = wildMatch;
exports.default = _default;