import React from 'react'
import { DropdownMenuItem } from '@reaqtive/layout'
import QScrollHandler from '../shared/q-scroll-handler'

const Body = props => {
  const {selectValue, qDataPages, qSize, getDataPage, height, width, hideHorizontalScrollbar, dropdownMenuItemStyle}=props
  const overflowX=hideHorizontalScrollbar?'hidden':'auto';

  return(
    qDataPages&&
    <QScrollHandler qDataPages={qDataPages} qSize={qSize} visibleHeight={height} getDataPage={getDataPage} style={{overflowX:overflowX}}>
        {
          qDataPages[0].qMatrix.map(item =>
            <DropdownMenuItem
              className={item[0].qState} key={item[0].qElemNumber}
              onClick={()=>selectValue(item[0].qElemNumber)}
              toggleMenu={()=>false}
              style={dropdownMenuItemStyle}
            >
              {item[0].qText}
            </DropdownMenuItem>
          )
        }
    </QScrollHandler>
  )
}

export default Body
