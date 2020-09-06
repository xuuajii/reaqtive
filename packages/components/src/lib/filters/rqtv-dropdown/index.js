import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types';
import { QGenericObject } from '@reaqtive/q'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'
import RqtvDropdownButton from '../../buttons/rqtv-dropdown-button'
import RqtvListObject from '../rqtv-list-object'

/**
 * RqtvDropdownFilter
 * It is a listbox shaped as a dropdown.
 * It has the same responsive behaviour as bootstrap dropdown when wrapped in a collapse
 *
 * You can twek its behavuiour using props.
 *
 * You can customize its styles using css or using props.
 */
const RqtvDropdownFilter = props =>{
  const [show, setShow] = useState(false)
  const [justHidden, setJustHidden] = useState()
  const dropdownEl = useRef();
  const toggleShow = () => {
    setShow(!show)
  }
  const handleClick = () => {
    if(!justHidden){
      toggleShow()
    }
  }

  const hideDropdownMenu = (e) => {
    setJustHidden(true)
    setShow(false)
    setTimeout(()=>setJustHidden(false),500)
  }

  //const {qFieldExpr, qSortObject, qLabelExpr, showCaret, buttonStyle, buttonClassName,qState} = props
  const {showCaret, buttonStyle, buttonClassName, isNavItem} = props
  const qObjectDef = useMapPropsToDef(props)
  const qButtonLabelExpr = props.qLabelExpr?props.qLabelExpr:qObjectDef.label.qStringExpression.qExpr
    return(
      <div className={`dropdown ${show ? 'show' : ''} rqtv-dropdown`} ref={dropdownEl}>
        <RqtvDropdownButton
          onClick={handleClick}
          show={show}
          qLabelExpr={qButtonLabelExpr}
          showCaret={showCaret}
          style={buttonStyle}
          className={buttonClassName}
          isNavItem={isNavItem}
        />
        {show&&
          <QGenericObject qObjectDef={qObjectDef} quickSelectionMode={props.quickSelectionMode}>
            <RqtvListObject {...props}>
              <Layout {...props} show={show } hideDropdownMenu={hideDropdownMenu}/>
            </RqtvListObject>
          </QGenericObject>
        }
      </div>
  )
}

RqtvDropdownFilter.propTypes={
  /**
   * It allows to align the dropdown menu to the left or to rhe right of the button
   */
  align:PropTypes.string,
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr:PropTypes.string.isRequired,
  /**
   * The expression of the title used in the dropdown button (by default it shows the name of the field and the count distinct of that
   * field or the selected value if there is only one selected value)
   */
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.shape({
    /**
     * Sorts the field values according to their logical state (selected, optional, alternative or excluded).
     */
    qSortByState:PropTypes.number,
    /**
     * Sorts the field values by frequency (number of occurrences in the field).
     */
    qSortByFrequency:PropTypes.number,
    /**
     * Sorts the field values by numeric value.
     */
    qSortByNumeric:PropTypes.number,
    /**
     * Sorts the field by alphabetical order.
     */
    qSortByAscii:PropTypes.number,
    /**
     * Sorts the field values by the initial load order.
     */
    qSortByLoadOrder:PropTypes.number,
    /**
     * Sorts the field by expression.
     */
    qSortByExpression:PropTypes.number,
    /**
     * Sort by expression.
     */
    qExpression:PropTypes.shape({qv:PropTypes.string}),
    qSortByGreyness:PropTypes.number
  }),
  /**
   * state of the listbox
  */
  qState:PropTypes.string,
  /**
   * Show/hide the search input when the dropdown is open
   */
  showSearch:PropTypes.bool,
  /**
   * Height of the dropdown when is open
   */
  dropdownMenuHeight:PropTypes.number,
  /**
   * Width of the dropdown when is open
   */
  dropdownMenuWidth:PropTypes.number,
  /**
   * Show/hide the caret in the dropdown button
   */
  showCaret:PropTypes.bool,
  /**
   * style object to customize the dropdown button
   */
  buttonStyle:PropTypes.object,
  /**
   * className for the dropdown button
   */
  buttonClassName:PropTypes.string,
  /**
   * style object to customize the dropdown menu
   */
  dropdownMenuStyle:PropTypes.object,
  /**
   * style object to customize the style of the dropdown menu items (it can be overwritten by selections color coding)
   */
  dropdownMenuItemStyle:PropTypes.object,
  /**
   * Show/hide overflowX
   */
  hideHorizontalScrollbar:PropTypes.bool,
  /**
   * if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply),
   * if false it uses Qlik View selection behaviour (apply selections immediately)
   */
  quickSelectionMode:PropTypes.bool,
  /**
   * if true uses toggle select
   */
  toggle:PropTypes.bool
}

RqtvDropdownFilter.defaultProps={
  align:'left',
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  qState:"",
  showSearch:true,
  dropdownMenuHeight:300,
  dropdownMenuWidth:265,
  showCaret:true,
  buttonStyle:{},
  buttonClassName:'primary text-light',
  dropdownMenuStyle:{},
  dropdownMenuItemStyle:{},
  hideHorizontalScrollbar:false,
  quickSelectionMode:false,
  toggle:true
}
export default RqtvDropdownFilter
