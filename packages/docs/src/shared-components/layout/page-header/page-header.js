import React, {useContext} from 'react'
import {RqtvPageContext} from '@reaqtive/components'
import {Navbar} from '@reaqtive/layout'

const PageHeader = props => {
  const rqtvPage=useContext(RqtvPageContext)
  const {pageData} = rqtvPage
  return(
    <Navbar
      className={`page-header ${props.className?props.className:''}`}
      style={{...props.style}}
    >
      <div className={`navbar-brand`}>
        <h3>{props.title||pageData.title}</h3>
      </div>
      {props.children}
    </Navbar>
  )
}

export default PageHeader;
