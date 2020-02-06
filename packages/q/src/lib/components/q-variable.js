//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React from 'react'
import PropTypes from 'prop-types'
import AirbnbPropTypes from 'airbnb-prop-types'
import useQVaraibleReducer from '../hooks/use-q-variable-reducer'
import useQLayoutReducer from '../hooks/use-q-layout-reducer'


/**
 * QVariable
 * It provides a variable and its layout to its child.
 * It automatically aupdate layout everytime the variable is updated by the engine calculations.
 * It expects no more than 1 child
 *
 */
const QVariable = (props) => {
  const qVariableHandler = useQVaraibleReducer('vCurrentYear')
  const qLayoutHandler = useQLayoutReducer(qVariableHandler)
  const moreThanOneChild = Array.isArray(props.children)
  if (moreThanOneChild){
      throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }
  return React.cloneElement(props.children, {props, qLayoutHandler, qVariableHandler})
}

const exclusivePropTypes = {
  variableName:PropTypes.string,
  variableId:PropTypes.string
}
const exclusiveProps = Object.keys(exclusivePropTypes)

QVariable.propTypes = {
  /**
   * The name of the variable. It must not be provided if variableId is provided
   */
   variableName:PropTypes.string,
   /**
    * The id of the variable. It must not be provided if variableName is provided
    */
   variableId:PropTypes.string,
  ...Object.fromEntries(exclusiveProps.map(exclusiveProp => [
    exclusiveProp,
    AirbnbPropTypes.and([
      exclusivePropTypes[exclusiveProp],
      (props, propName, componentName, ...rest) => {
        const propList = exclusiveProps.join(', ')
        const exclusivePropCount = Object.keys(props)
          .filter(prop => props[prop] != null)
          .reduce((count, prop) => (count + (exclusivePropTypes[prop] ? 1 : 0)), 0)
        if (exclusivePropCount > 1) {
          return new Error(`A ${componentName} cannot have more than one of these props: ${propList}. Both expect a sting`)
        }
        if (exclusivePropCount < 1) {
          return new Error(`A ${componentName} must have at least one of these props: ${propList}. Both expect a sting`)
        }
      }
    ])
  ]))
}

export default QVariable
