"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPatchedObject = getPatchedObject;
exports.replaceObjectProp = replaceObjectProp;

var _lodash = _interopRequireDefault(require("lodash"));

function getPatchedObject(objectToBePatched, path, patch) {
  const pointSeparatedPath = path.split('/').join('.');
  const reducedPath = pointSeparatedPath.indexOf('qLayout') === 0 ? pointSeparatedPath.replace('qLayout.', '') : pointSeparatedPath;

  const patchedObject = _lodash.default.clone(objectToBePatched, true);

  _lodash.default.set(patchedObject, reducedPath, patch);

  return patchedObject;
} //safely replace object properties by path


function replaceObjectProp(object, oldProp, newPropName, newPropValue) {
  // console.log(object)
  const objectToMutate = _lodash.default.omit(object, [oldProp]); //_.clone(object, true)


  objectToMutate[newPropName] = newPropValue;
  return objectToMutate;
}