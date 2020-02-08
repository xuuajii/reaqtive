import React from 'react'
import {usePagination} from '@reaqtive/q'
import {Button, ButtonGroup} from '@reaqtive/layout'

const Body = props =>{
  const { rqtvListObject, qSize, qDataPages, goToFirstPageAfterSelection } = props
  const {selectValue}=rqtvListObject

  const getScrollData = (qDisplayArea) =>{
    rqtvListObject.getDataPage(qDisplayArea)
  }

  const qArea = qDataPages&&{...qDataPages[0].qArea, qHeight:props.qDataPageHeight}

  const pagination = usePagination(qArea, qSize, getScrollData)

  const selectionCallback = () => {
    goToFirstPageAfterSelection&&pagination.setCurrentPage(1)
  }

  return(
    <ButtonGroup className="rqtv-button-bar">
      {pagination.currentPage!==1&&
        <Button type="button" className="rqtv-btn" onClick={()=>pagination.setCurrentPage(pagination.currentPage-1)}>
          {"<"}
        </Button>
      }
      {qDataPages&&qDataPages[0].qMatrix.map(item =>
          <Button
            key={item[0].qElemNumber}
            type="button"
            className={`rqtv-btn ${props.buttonSize} ${item[0].qState} `}
            onClick={()=>selectValue(item[0].qElemNumber, selectionCallback)}
          >
            {item[0].qText}
          </Button>
        )
      }
      {pagination.currentPage<pagination.lastPage&&
        <Button type="button" className="rqtv-btn" onClick={()=>pagination.setCurrentPage(pagination.currentPage+1)}>
          {">"}
        </Button>
      }
    </ButtonGroup>
  )
}

export default Body
