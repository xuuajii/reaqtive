import React from 'react'
import {RqtvPageHeader, RqtvNavbarCollapse, RqtvNavbarToggle, RqtvNavbarNav} from '@reaqtive/components'

const CollapsiblePageHeader = props => {
  return(
    <div className="container-fluid">
      <RqtvPageHeader>
        <RqtvNavbarToggle/>
        <RqtvNavbarCollapse>
          <RqtvNavbarNav>
            {props.children}
          </RqtvNavbarNav>
        </RqtvNavbarCollapse>
      </RqtvPageHeader>
    </div>
  )
}

export default CollapsiblePageHeader
