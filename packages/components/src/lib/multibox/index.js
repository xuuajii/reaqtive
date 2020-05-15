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
  // console.log(props.fieldList)

  return(
    <Accordion className="rqtv-multibox" style={{width:props.width}}>
      {props.fieldList.map(field=>
        {
          const fieldExpr =((typeof field)==='string')?field:field.qFieldExpr
          // console.log(fieldExpr)
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
                height={props.fieldHeight}
                qFieldExpr={fieldExpr}
                qLabelExpr={`'${field.label||fieldExpr}'`}
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
  fieldHeight:PropTypes.number
}

RqtvMultibox.defaultProps = {
  fieldHeight:300
}

export default RqtvMultibox
