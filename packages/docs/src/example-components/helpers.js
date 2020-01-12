//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

const normalizeExpression = (expression) => {
  return expression[0]==='='?expression:`[${expression}]`
}

export {normalizeExpression}
