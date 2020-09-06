import React from 'react'
import PropTypes from 'prop-types'
import { QGenericObject } from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import {useMapPropsToDef} from '../helpers/index'
import Layout from './layout'

/**
 * RqtvListbox
 * It looks like a Qlik Sense listbox, but is always expanded (does'not turn into a drop down).
 * It will fill its container width
 *
 * You can twek its behavuiour using props.
 *
 * You can customize its styles using css or using props.
 */
const RqtvListbox = props =>{
  //const {qFieldExpr, qSortObject, qLabelExpr,qState} = props
  const qObjectDef = useMapPropsToDef(props)
  return(
    <QGenericObject
      qObjectDef={qObjectDef}
      quickSelectionMode={props.quickSelectionMode}
    >
      <RqtvListObject {...props}>
        <Layout {...props}/>
      </RqtvListObject>
    </QGenericObject>
  )
}

RqtvListbox.propTypes={
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr:PropTypes.string.isRequired,
  /**
   * The expression shown in the header of the listbox
   */
  qFieldLabelExpr:PropTypes.string,
  /**
   * An array that tells the engine how to sort listbox data. You can set only the relevant properties of the object to 1.
   */
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
   * Show/hide listboxheader.
   */
  showHeader:PropTypes.bool,
  /**
   * Show/hide the buttons in listbox header (showHeader must be set to true to show the buttons)
   */
  showHeaderButtonbar:PropTypes.bool,
  /**
   * Show/hide the listbox menu as a dropdown in listbox header
   */
  showListboxDropdownMenu:PropTypes.bool,
  /**
   * if true the search input is alway shown
   */
  alwaysShowSearch:PropTypes.bool,
  /**
   * the height of the listbox
   */
  height:PropTypes.number,
  /**
   * function called when clicking on the listbox title
   */
  titleAction:PropTypes.func,
  /**
   * style object to customize listbox header
   */
  headerStyle:PropTypes.object,
  /**
   * style object to customize listbox title
   */
  titleStyle:PropTypes.object,
  /**
   * style object to customize the list that wraps the records
   */
  listStyle:PropTypes.object,
  /**
   * style object to customize the style of the items displayed by the listbox  (it can be overwritten by selections color coding)
   */
  itemStyle:PropTypes.object,
  /**
   * if true the search input is automatically focused when mounted
   */
  focus:PropTypes.bool,
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

RqtvListbox.defaultProps={
  showHeader:true,
  showHeaderButtonbar:false,
  showListboxDropdownMenu:true,
  alwaysShowSearch:false,
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  qState:"",
  height:500,
  focus:true,
  titleAction:()=>false,
  headerStyle:{},
  titleStyle:{},
  listStyle:{},
  itemStyle:{},
  quickSelectionMode:false,
  toggle:true
}

export default RqtvListbox
