//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import { ListGroup, ListGroupItem } from '@reaqtive/layout'
import QScrollHandler from '../shared/q-scroll-handler'

const Body = props => {
  const {selectValue, qDataPages, qSize, getDataPage, height}=props
  console.log(height)
  return(
    <QScrollHandler qDataPages={qDataPages} qSize={qSize} visibleHeight={height} getDataPage={getDataPage}>
      <ListGroup>
        {
          qDataPages[0].qMatrix.map(item =>
            <ListGroupItem className={item[0].qState} key={item[0].qElemNumber} onClick={()=>selectValue(item[0].qElemNumber)}>
              {item[0].qText}
            </ListGroupItem>
          )
        }
      </ListGroup>
    </QScrollHandler>
  )
}

export default Body
