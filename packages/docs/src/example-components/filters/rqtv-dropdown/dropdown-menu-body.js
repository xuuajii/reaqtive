//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import { DropdownMenuItem } from '@reaqtive/layout'
import QScrollHandler from '../shared/q-scroll-handler'

const Body = props => {
  const {selectValue, qDataPages, qSize, getDataPage, height, width, hideHorizontalScrollbar}=props
  const overflowX=hideHorizontalScrollbar?'hidden':'auto';

  return(
    <QScrollHandler qDataPages={qDataPages} qSize={qSize} visibleHeight={height} getDataPage={getDataPage} style={{overflowX:overflowX}}>
      <div style={{height:height, maxHeight:height, minHeight:height, width:width, maxWidth:width, minwidth:width}}>
        {
          qDataPages[0].qMatrix.map(item =>
            <DropdownMenuItem className={item[0].qState} key={item[0].qElemNumber} onClick={()=>selectValue(item[0].qElemNumber)} toggleMenu={()=>false}>
              {item[0].qText}
            </DropdownMenuItem>
          )
        }
      </div>
    </QScrollHandler>
  )
}

export default Body
