//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

const normalizeExpression = (expression) => {
  return expression[0]==='='?expression:`[${expression}]`
}

export {normalizeExpression}

const extractSubNodes = (recursiveDimension, depth) =>{
  if(depth===0){
    const {qSubNodes, ...rest} = recursiveDimension
    return rest
  } else {
    return extractSubNodes(recursiveDimension.qSubNodes[0], depth-1)
  }
}

export {extractSubNodes}