import React from 'react'
import PropTypes from 'prop-types';
import { QGenericObject } from '@reaqtive/q'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'
import RqtvListObject from '../rqtv-list-object'

/**
 * RqtvButtonBar
 * it is a paginated listbox shaped as a buttonbar
 * It does not ask for selection confirmation, but just toggle the selection when a button is clicked
 *
 * You can twek its behavuiour using props.
 *
 * You can customize its styles using css or using props.
 */

const RqtvButtonBar = props => {
  const {qFieldExpr, qSortObject, qLabelExpr, qDataPageHeight, buttonsClassName, buttonsStyle} = props
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qLabelExpr, qDataPageHeight})
  return(
    <QGenericObject qObjectDef={qObjectDef} quickSelectionMode={true} toggle={props.toggle}>
      <RqtvListObject {...props} >
        <Layout {...props} />
      </RqtvListObject>
    </QGenericObject>
  )
}

RqtvButtonBar.propTypes={
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr:PropTypes.string.isRequired,
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
   * The bootstrap class to apply large (btn-lg), standard (btn) or small (btn-sm) size to a button.
   */
  buttonSize:PropTypes.string,
  /**
   * The number of records asked to the engine for each page
   */
  qDataPageHeight:PropTypes.number,
  /**
   * If true it resets pagination (back to first page) after a selection is made
   */
  goToFirstPageAfterSelection:PropTypes.bool,
  /**
   * css classes applied to the buttons (it can be overwritten by selections color coding)
   */
  buttonsClassName:PropTypes.string,
  /**
   * style object to customize buttons style (it can be overwritten by selections color coding)
   */
  buttonsStyle:PropTypes.object
}

RqtvButtonBar.defaultProps={
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 1, qSortByLoadOrder: 0, qSortByExpression: 0 },
  buttonSize:'btn-sm',
  qDataPageHeight:5,
  toggle:true,
  goToFirstPageAfterSelection:true,
  buttonsClassName:'',
  buttonsStyle:{}
}

export default RqtvButtonBar
