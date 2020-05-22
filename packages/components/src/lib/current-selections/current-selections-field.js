import React, {useContext} from 'react'
import {useQFieldHandler} from '@reaqtive/q'
import {useIsMounted} from '@reaqtive/layout'
import {Icon, deleteForever, pencil} from '@reaqtive/layout'
import {RqtvAppContext} from '../index'


const CurrentSelectionsField = props => {
  const isMounted = useIsMounted()
  const appContext = useContext(RqtvAppContext)
  //console.log(1, appContext)
  const editFieldSelections = () => {
    //console.log(props.item.qField)
    const neverToggle = appContext.enhancedFieldList.filter((qField)=>qField.qName===props.item.qField)[0].neverToggle;
    if (isMounted===true) props.setActiveField({qFieldExpr:props.item.qField, toggle:!neverToggle})
  }

  const qFieldHandler = useQFieldHandler(props.item.qField)
  const qField = qFieldHandler.qField

  const clearFieldSlections = () => {
    qField&&qField.clear()
  }

  return(
    <li className="list-group-item">
      <div className="row no-gutters">
        <div className="col-8 selection-item-info">
          <div className="badge S">{props.item.qField}</div>
          <div>
            {props.item.qSelectedFieldSelectionInfo.map((value,index)=>
                <span key={index} className="value">
                  {`${value.qName}${props.item.qSelectedFieldSelectionInfo.length-1!==index?', ':' '}`}
                </span>
            )}
          </div>
        </div>
        <div className="col-4 selection-item-toolbar">
          <button className="btn" onClick={editFieldSelections}>
            <Icon type={pencil} />
          </button>
          {qField&&props.item.qOneAndOnlyOne!==true&&
          <button className="btn" onClick={clearFieldSlections}>
            <Icon type={deleteForever} />
          </button>
          }
        </div>
      </div>
    </li>
  )
}

export default CurrentSelectionsField
