import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { QGenericObject } from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import {useMapPropsToDef} from '../helpers/index'
import Layout from './layout'

/**
 * RqtvSearchField
 * It provides you an input field to search a listbox.
 * When the user starts typing a dropdown menu appears under the input field.
 *
 * You can tweak its behaviour using props
 *
 * You can customize style using props and css
 */
const RqtvSearchField = props =>{
  //const {qFieldExpr, qSortObject, qState, qObjectDef} = props
  const qObjectDef = useMapPropsToDef(props)
  const [show, setShow] = useState()
  return(
    <div className={`dropdown ${true ? 'show' : ''} rqtv-dropdown`}>
      <QGenericObject
        qObjectDef={qObjectDef}
        quickSelectionMode={props.quickSelectionMode}
      >
        <RqtvListObject {...props}>
          <Layout {...props} show={show} setShow={setShow}/>
        </RqtvListObject>
      </QGenericObject>
    </div>
  )
}

RqtvSearchField.propTypes={
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr:PropTypes.string.isRequired,
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
   * Height of the dropdown when is open
   */
  dropdownMenuHeight:PropTypes.number,
  /**
   * Width of the dropdown when is open
   */
  dropdownMenuWidth:PropTypes.number,
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
    * The text shown in the input field when not searching
  */
  placeholder:PropTypes.string,
  /**
   * if true uses toggle select
   */
  toggle:PropTypes.bool,
  /**
   * if true selections are accepted when clicking away from the listbox in selection mode
   */
  clickAwayAccept:PropTypes.bool,
}

RqtvSearchField.defaultProps={
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  quickSelectionMode:false,
  qState:"",
  dropdownMenuHeight:300,
  dropdownMenuWidth:265,
  hideHorizontalScrollbar:false,
  placeholder:'Search',
  toggle:true,
  clickAwayAccept:false,
}


export default RqtvSearchField
