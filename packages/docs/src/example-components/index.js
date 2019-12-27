//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import Code from './code'

const Section = props =>
<div className={`section`} style={{...props.style}}>
  <h4>{props.title}</h4>
  {props.children}
</div>

const Example = props =>{
  return (
      <div
        className={`card ${props.codeAbove?'code-above':'code-below'}`}
        style={{padding:props.codeAbove?'0 1rem 1rem 1rem':'1rem 1rem 0 1rem'}}
      >
        {props.codeAbove===true&&props.codeString&&<CodeSnippet codeString={props.codeString}/>}
        {props.children}
        {props.codeAbove===false&&<CodeSnippet codeString={props.codeString}/>}
      </div>
  )
}

Example.propTypes={
  codeAbove:PropTypes.bool
}

Example.defaultProps={
  codeAbove:true
}

const CodeSnippet = props =>
<div className="row">
  <div className="col">
    <Code codeString={props.codeString}/>
  </div>
</div>
export {Section, Code, Example}
