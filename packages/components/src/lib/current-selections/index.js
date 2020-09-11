import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import {QGenericObject} from '@reaqtive/q'
import {RqtvAppContext} from '../index'
import RqtvCurrentSelectionsObject from './rqtv-current-selections-object'
import Layout from './layout'

const qCurrentSelectionsObjectDef = {
  "qInfo": {
    "qId": "",
    "qType": "SessionLists"
  },
  "qSelectionObjectDef": {} ,
	qSelections: null,
	qFields: null
}

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
  return(
    <div className="rqtv-current-selections" hidden={props.hidden}>
      <QGenericObject qObjectDef={qCurrentSelectionsObjectDef}>
        <RqtvCurrentSelectionsObject>
              <Layout
                isResponsive={props.isResponsive}
                showModalToggler={props.showModalToggler}
                useCurrentSelectionModal={props.useCurrentSelectionModal}
                hidePrefix={props.hidePrefix}
                alwayShowToolbar={props.alwayShowToolbar}
                customLoading={props.customLoading}
                breakPoint={props.breakPoint}
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
  hidePrefix:PropTypes.string

}

RqtvCurrentSelections.defaultProps={
  useCurrentSelectionModal:true,
  isResponsive:true,
  showModalToggler:true,
  alwaysShowToolbar:false,
  breakPoint:'lg'
}

export default RqtvCurrentSelections
