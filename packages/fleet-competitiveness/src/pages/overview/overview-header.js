import React, {useState, useRef} from 'react'
import { RqtvPage, RqtvPageHeader, RqtvNavbarCollapse, RqtvNavbarToggle, RqtvNavbarNav, RqtvBreadcrumb, QViz, RqtvVizContainer, RqtvMaximizePortalEl } from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'
import {Switch, NavItem} from '@reaqtive/layout'
import SelectionSwitch from '../../components/selection-switch'

const OverviewHeader = props => {
  return(
    <div className="container-fluid">
      <RqtvPageHeader>
        <RqtvNavbarToggle/>
        <RqtvNavbarCollapse>
          <RqtvNavbarNav>
            <NavItem>
              <SelectionSwitch label="Filter Core Competitors" qFieldExpr="Core Competitor LTR"/>
            </NavItem>
          </RqtvNavbarNav>
        </RqtvNavbarCollapse>
      </RqtvPageHeader>
    </div>
  )
}
  export default OverviewHeader
