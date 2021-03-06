import React from 'react'
import PropTypes from 'prop-types'
import  {Accordion, Collapse, CollapseHeader, CollapseBody} from '@reaqtive/layout'
import  {RqtvListbox} from '../index'

/**
 * RqtvMultibox
 *
 * It returns an accordion that shows a list of fields.
 * A listbox is displayed for the active field. One field at a time can be active.
 */
const RqtvMultibox = props => {
  
  return(
    <Accordion className="rqtv-multibox" style={{width:props.width}}>
      {props.fieldList&&props.fieldList.map(field=>
        {
          const fieldExpr =((typeof field)==='string')?field:field.qFieldExpr
          const toggle = ((typeof field)==='object')&&('toggle' in field)?field.toggle:true
          const quickSelectionMode = ((typeof field)==='object')&&('quickSelectionMode' in field)?field.quickSelectionMode:false
          return(
          <Collapse key={fieldExpr}>
            <CollapseHeader
              hideTitleWhenExpanded={true}
            >
              {field.hasSelections===true&&<span className="selection-indicator"/>}
              {field.label||fieldExpr}
            </CollapseHeader>
            <CollapseBody height={props.fieldHeight} hideTitleWhenExpanded={true}>
              <RqtvListbox
                qState={props.qState}
                height={props.fieldHeight}
                qFieldExpr={fieldExpr}
                qLabelExpr={`'${field.label||fieldExpr}'`}
                toggle={toggle}
                quickSelectionMode={quickSelectionMode}
                clickAwayAccept={props.clickAwayAccept}
              />
            </CollapseBody>
          </Collapse>
        )}
      )}
    </Accordion>
  )
}


RqtvMultibox.propTypes = {
  /**
   * An array of fieldnames which will be displayed in the multibox
   */
  fieldList:PropTypes.array.isRequired,
  /**
   * The height of the listbox of the active field
   */
  fieldHeight:PropTypes.number,
  /**
   * The state of the multibox which will be passed to its listboxes
   */
  qState:PropTypes.string,
  /**
   * if true selections are accepted when clicking away from an active listbox in selection mode
   */
  clickAwayAccept:PropTypes.bool,
}

RqtvMultibox.defaultProps = {
  fieldHeight:300,
  clickAwayAccept:false,
}

export default RqtvMultibox
