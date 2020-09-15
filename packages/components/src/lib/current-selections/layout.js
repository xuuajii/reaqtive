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

  const [filteredSelections, setFilteredselections] = useState([])
  //const isMounted = useIsMounted()
  useEffect(()=>{
    const hideSelections = (selectionField) => selectionField.qField.indexOf(props.hidePrefix)!==0;
    const filteredArray = qSelectionObject?qSelectionObject.qSelections.filter(hideSelections):[]
    qSelectionObject?setFilteredselections(filteredArray):setFilteredselections([])
  }, [qSelectionObject, props.hidePrefix])

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
          qSelectionsCount={props.excludeHidden?filteredSelections.length:props.rqtvCurrentSelectionsObject.qSelectionsCount}
          clearAll={props.rqtvCurrentSelectionsObject.clearAll}
          back={props.rqtvCurrentSelectionsObject.back}
          forward={props.rqtvCurrentSelectionsObject.forward}
          openCurrentSelectionsModal={openCurrentSelectionsModal}
          isResponsive={props.isResponsive}
          showModalToggler={props.showModalToggler}
          alwaysShowToolbar={props.alwaysShowToolbar}
          breakPoint={props.breakPoint}
        />
        {
          props.useCurrentSelectionModal&&
          <RqtvCurrentSelectionsModal
            open={currentSelectionModalOpen}
            close={closeCurrentSelectionsModal}
            currentSelections={filteredSelections}
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
