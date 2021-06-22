import React,{useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import {QGenericObject} from '@reaqtive/q'
import {RqtvAppContext} from '../index'
import RqtvCurrentSelectionsObject from './rqtv-current-selections-object'
import Layout from './layout'

const useQCurrentSelectionsObjectDef = (qState) => useMemo(()=>{
  return (
    {
      "qInfo": {
        "qId": "",
        "qType": "SessionLists"
      },
      "qSelectionObjectDef": {
        "qStateName":qState
      } ,
    	qSelections: null,
    	qFields: null
    }
  )
},[qState])

/**
 * RqtvCurrentSelections
 *
 * it is a toolbar that displays the current selection status and the buttons to go back, forward and clear current selections.
 * Clicking on the button displayin the number of current selections, a modal will appear showing the current selection box (fields and selected values)
 * It currently does not support alternate states. It always display the default state.
 * Styles can be customized via css (or scss)
 *
 */

const RqtvCurrentSelections = (props) => {
  const appData = useContext(RqtvAppContext)
  const hidePrefix = props.hidePrefix?props.hidePrefix:appData.hidePrefix
  const excludeHidden = props.excludeHidden?props.excludeHidden:appData.excludeHidden
  const qCurrentSelectionsObjectDef=useQCurrentSelectionsObjectDef(props.qState)
  return(
    <div className="rqtv-current-selections" hidden={props.hidden}>
      <QGenericObject qObjectDef={qCurrentSelectionsObjectDef}>
        <RqtvCurrentSelectionsObject>
              <Layout
                isResponsive={props.isResponsive}
                showModalToggler={props.showModalToggler}
                useCurrentSelectionModal={props.useCurrentSelectionModal}
                excludeHidden={excludeHidden}
                hidePrefix={hidePrefix}
                alwaysShowToolbar={props.alwaysShowToolbar}
                customLoading={props.customLoading}
                breakPoint={props.breakPoint}
                qState={props.qState}
              />
        </RqtvCurrentSelectionsObject>
      </QGenericObject>
    </div>
  )
}

RqtvCurrentSelections.propTypes={
  /**
   * it allows to turnoff the current selections box modal
   */
  useCurrentSelectionModal:PropTypes.bool,
  /**
   * when true it transform the toolbar into a fixed positioned floating button
   */
  isResponsive:PropTypes.bool,
  /**
   * screentype from which current selections are responsive
   */
  breakPoint:PropTypes.oneOf(['xl','lg', 'md', 'sm']),
  /**
   * it allows to show/hide the modal toggler
   */
  showModalToggler:PropTypes.bool,
  /**
   * if true the current selection toolbar is always shown even if no selection history exists (0 current, selection 0 back-count and 0 forward count)
   */
  alwaysShowToolbar:PropTypes.bool,
  /**
   * prefix of the fields to be hidden from current selections modal
   */
  hidePrefix:PropTypes.string,
  /**
   * if true field hidden from current selections are not considered in selection count
   */
  excludeHidden:PropTypes.bool,
  /**
    * the alternate state from which to display current selections
    */
  qState:PropTypes.string,

}

RqtvCurrentSelections.defaultProps={
  useCurrentSelectionModal:true,
  isResponsive:true,
  showModalToggler:true,
  alwaysShowToolbar:false,
  breakPoint:'lg',
  qState:''
}

export default RqtvCurrentSelections
