import React, {useState, useRef} from 'react'
import {NavItem} from '@reaqtive/layout'
import {RqtvBreadcrumb} from '@reaqtive/components'
import {SelectionSwitch, CollapsiblePageHeader} from '../../components/index'

const OverviewHeader = props => {
  return(
    <div className="container-fluid">
      <CollapsiblePageHeader>
        <NavItem>
          <SelectionSwitch label="Filter Core Competitors" qFieldExpr="Core Competitor LTR"/>
        </NavItem>
      </CollapsiblePageHeader>
      <RqtvBreadcrumb/>
    </div>
  )
}
export default OverviewHeader
