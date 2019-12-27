//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {usePagination} from '@reaqtive/q'
import {Button} from '@reaqtive/layout'

const Body = props =>
{
  const qArea = props.data&&{...props.data.qArea, qHeight:props.qDataPageHeight}
  const getScrollData = (qDisplayArea) =>{
    if(props.rqtvListObject){
      props.rqtvListObject.getNewDataPage(qDisplayArea)
    }
  }
  const handleSelection = (value) => {
    const callback = (res) => {
      if(res===false){
        getScrollData(qArea)
      }
    }
    props.rqtvListObject.selectValue(Number(value), callback)
  }
  const pagination = usePagination(qArea, props.size, getScrollData)

  return(
    <>
      {pagination.currentPage!==1&&
        <Button type="button" className="rqtv-btn" onClick={()=>pagination.setCurrentPage(pagination.currentPage-1)}>
          {"<"}
        </Button>
      }
        {props.data&&props.data.qMatrix.map(record =>
          <Button key={record[0].qElemNumber} type="button" className={`rqtv-btn ${props.buttonSize} ${record[0].qState} `} onClick={()=>handleSelection(record[0].qElemNumber)}>
            {record[0].qText}
          </Button>
          )
        }
      {pagination.currentPage<pagination.lastPage&&
        <Button type="button" className="rqtv-btn" onClick={()=>pagination.setCurrentPage(pagination.currentPage+1)}>
          {">"}
        </Button>
      }
    </>
  )
}

export default Body
