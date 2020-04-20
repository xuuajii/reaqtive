import React, {useState, useRef} from 'react'
import { RqtvBreadcrumb } from '@reaqtive/components'
import { NavItem } from '@reaqtive/layout'
import {SelectionSwitch, CollapsiblePageHeader} from '../../components/index'

const PurchasingHeader = props => {
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
export default PurchasingHeader
