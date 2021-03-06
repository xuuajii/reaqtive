import React from 'react'
import { ListGroup, ListGroupItem } from '@reaqtive/layout'
import QScrollHandler from '../shared/q-scroll-handler'

const Body = props => {
  const {selectValue, qDataPages, qSize, getDataPage, height, bodyEl, listStyle, itemStyle}=props
  return(
    qDataPages&&
    <div className="rqtv-listbox-body">
      <QScrollHandler className="rqtv-listbox-body" qDataPages={qDataPages} qSize={qSize} visibleHeight={height} getDataPage={getDataPage} bodyEl={bodyEl}>
        <ListGroup style={listStyle}>
          {
            qDataPages&&qDataPages[0].qMatrix.map(item =>
              <ListGroupItem
                className={item[0].qState}
                key={item[0].qElemNumber}
                onClick={()=>selectValue(item[0].qElemNumber)}
                style={itemStyle}
              >
                <span title={item[0].qText}>{item[0].qText}</span>
              </ListGroupItem>
            )
          }
        </ListGroup>
      </QScrollHandler>
    </div>
  )
}

export default Body
