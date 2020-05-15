const normalizeExpression = (expression) => {
  return expression[0]==='='?expression:`[${expression}]`
}

export {normalizeExpression}
