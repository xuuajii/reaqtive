//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import RqtvCurrentSelectionsToolbar from './rqtv-current-selections-toolbar'
import RqtvCurrentSelectionsModal from './rqtv-current-selections-modal'
import {RqtvRenderer} from '../loading/index'

const Layout = props => {
  //console.log(props)
  const [currentSelectionModalOpen, setCurrentSelectionModalOpen] = useState(false)
  const qLayoutHandler = props.qLayoutHandler
  const qLayout = qLayoutHandler&&qLayoutHandler.qLayout
  const qSelectionObject = qLayout&&qLayout.qSelectionObject
  // console.log(qSelectionObject)
  const closeCurrentSelectionsModal = () => {
    setCurrentSelectionModalOpen(false)
  }

  const openCurrentSelectionsModal = () => {
    setCurrentSelectionModalOpen(true)
  }

  const [rendererProps, setRendererProps] = useState({
    loading:qLayoutHandler.qLoading,
    error:qLayoutHandler.qError,
    reload:props.qObjectHandler.reloadObject
  })
  useEffect(()=>{
    const rendererProps = {
      loading:qLayoutHandler.qLoading,
      error:qLayoutHandler.qError,
      reload:props.qObjectHandler.reloadObject
    }
    setRendererProps(rendererProps)
  },[qLayoutHandler.qLoading, qLayoutHandler.qError])

  return(
    <RqtvRenderer {...rendererProps}>
        <RqtvCurrentSelectionsToolbar
          qBackCount={props.rqtvCurrentSelectionsObject.qBackCount}
          qForwardCount={props.rqtvCurrentSelectionsObject.qForwardCount}
          qSelectionsCount={props.rqtvCurrentSelectionsObject.qSelectionsCount}
          clearAll={props.rqtvCurrentSelectionsObject.clearAll}
          back={props.rqtvCurrentSelectionsObject.back}
          forward={props.rqtvCurrentSelectionsObject.forward}
          openCurrentSelectionsModal={openCurrentSelectionsModal}
          isResponsive={props.isResponsive}
          showModalToggler={props.showModalToggler}
          alwaysShowToolbar={props.alwaysShowToolbar}
        />
        {
          props.useCurrentSelectionModal&&
          <RqtvCurrentSelectionsModal
            open={currentSelectionModalOpen}
            close={closeCurrentSelectionsModal}
            currentSelections={qSelectionObject&&qSelectionObject.qSelections||[]}
            hidePrefix={props.hidePrefix}
            toolbarProps={{
              qBackCount:props.rqtvCurrentSelectionsObject.qBackCount,
              qForwardCount:props.rqtvCurrentSelectionsObject.qForwardCount,
              qSelectionsCount:props.rqtvCurrentSelectionsObject.qSelectionsCount,
              clearAll:props.rqtvCurrentSelectionsObject.clearAll,
              back:props.rqtvCurrentSelectionsObject.back,
              forward:props.rqtvCurrentSelectionsObject.forward,
            }}
          />
        }
    </RqtvRenderer>
  )
}

export default Layout
