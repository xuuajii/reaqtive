//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import _ from 'lodash'

function getPatchedObject(objectToBePatched, path, patch){
  const pointSeparatedPath = path.split('/').join('.')
  const reducedPath = pointSeparatedPath.indexOf('qLayout')===0?pointSeparatedPath.replace('qLayout.',''):pointSeparatedPath;
  const patchedObject = _.clone(objectToBePatched, true)
  _.set(patchedObject, reducedPath, patch)
  return patchedObject
}


//safely replace object properties by path
function replaceObjectProp(object, oldProp, newPropName, newPropValue){
  // console.log(object)
  const objectToMutate = _.omit(object, [oldProp])//_.clone(object, true)
  objectToMutate[newPropName]=newPropValue
  return objectToMutate
}

export {getPatchedObject, replaceObjectProp}
