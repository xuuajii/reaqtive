import React from 'react'
import {usePagination} from '@reaqtive/q'
import {Button, ButtonGroup} from '@reaqtive/layout'

const Body = props =>{
  const { rqtvListObject, qSize, qDataPages, goToFirstPageAfterSelection, buttonSize, buttonsClassName, buttonsStyle} = props
  const {selectValue}=rqtvListObject

  const getScrollData = (qDisplayArea) =>{
    rqtvListObject.getDataPage(qDisplayArea)
  }

  const qArea = qDataPages&&qDataPages&&qDataPages.length>0&&{...qDataPages[0].qArea, qHeight:props.qDataPageHeight}

  const pagination = usePagination(qArea, qSize, getScrollData)

  const selectionCallback = () => {
    goToFirstPageAfterSelection&&pagination.setCurrentPage(1)
  }
  const className=`rqtv-btn ${buttonSize} ${buttonsClassName}`
  return(
    <ButtonGroup className="rqtv-button-bar">
      {pagination.currentPage!==1&&
        <Button type="button" className={className} onClick={()=>pagination.setCurrentPage(pagination.currentPage-1)} style={buttonsStyle}>
          {"<"}
        </Button>
      }
      {qDataPages&&qDataPages[0].qMatrix.map(item =>
          <Button
            key={item[0].qElemNumber}
            type="button"
            className={`${className} ${item[0].qState} `}
            onClick={()=>selectValue(item[0].qElemNumber, selectionCallback)}
            style={buttonsStyle}
          >
            <span title={item[0].qText}>{item[0].qText}</span>
          </Button>
        )
      }
      {pagination.currentPage<pagination.lastPage&&
        <Button type="button" className={className} onClick={()=>pagination.setCurrentPage(pagination.currentPage+1)} style={buttonsStyle}>
          {">"}
        </Button>
      }
    </ButtonGroup>
  )
}

export default Body
