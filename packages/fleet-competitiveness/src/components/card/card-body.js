import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../avatar'
import {useHistory} from 'react-router-dom'
const CardBody = props => {
  const history = useHistory()
  const goToDetail = (cardValue, bodyRowValue) => {
    const queryString = `?selections=${props.cardSelectionField}:${cardValue}&selections=${props.rowSelectionField}:${bodyRowValue}`;
    const link = `${history.location.pathname}${props.bodyRowLink}/${queryString}`
    setTimeout(()=>props.bodyRowLink&&history.push(link), 100)
  }

  const {headers, rows, rowsAreMeasures} = props.bodyTable
  const {showAvatar} = props
  const stdTableClassName='table table-sm table-hover'
  const tableClassName = rowsAreMeasures?`${stdTableClassName} measure-table`:`${stdTableClassName} table-striped`
  return(
    <div className="table-responsive">
    <table className={tableClassName}>
      <thead>
        <tr>
          {showAvatar&&<th scope="col" />}
          {headers.map((header,index)=><th key={header} scope="col">{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row=>
          <tr key={row.key} onClick={()=>goToDetail(props.cardValue, row.label)}>
            <td>
              {showAvatar&&
                <Avatar
                  avatarPlaceHolder={row.imgPlacehoder}
                  avatarUrl={row.img}
                  isRounded={true}
                  height={'auto'}
                  style={{minWidth:'1.2rem'}}
                />
              }
            </td>
            <td>{row.label}</td>
            {row.cells.map((cell, index)=>{
                const img = cell.qAttrExps&&cell.qAttrExps.qValues[0].qText
                return(
                  <td key={cell.qText+10*index}>
                    <div style={{
                      margin:'auto',
                      background:`url(${img})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize:'auto 100%',
                      backgroundPosition: 'center',
                      lineHeight:props.cellHeight==='auto'?'1rem':props.cellWidth,
                      minWidth:props.cellWidth,
                      minHeight:props.cellHeight,
                    }} >
                      {cell.qText}
                    </div>
                  </td>
                )
              })}
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default CardBody
