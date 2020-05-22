import React, {useState, useEffect, useRef, useMemo} from 'react'
import {Modal,ModalDialog,ModalHeader,ModalBody,ModalFooter} from '@reaqtive/layout'
import {Carousel, CarouselPanel} from '@reaqtive/layout'
import {RqtvListbox} from '../index'
import CurrentSelectionsField from './current-selections-field'
import {LuiIcon, Icon, chevronLeft} from '@reaqtive/layout'
import RqtvCurrentSelectionsToolbar from './rqtv-current-selections-toolbar'


const RqtvCurrentSelectionsModal = props =>{

  const modalBodyEl = useRef()

  const [activeField, setActiveField] = useState('')

  const [filteredSelections, setFilteredselections] = useState(props.currentSelections)
  //const isMounted = useIsMounted()
  useEffect(()=>{
    const hideSelections = (selectionField) => selectionField.qField.indexOf(props.hidePrefix)!==0;
    setFilteredselections(props.currentSelections.filter(hideSelections))
    //console.log(filteredSelections)
  }, [props.currentSelections, props.hidePrefix])

  const activFieldListbox = useMemo(
    () => {
      return activeField===''
             ?<></>
             :<RqtvListbox
                title={activeField.qFieldExpr}
                focus={false}
                qFieldExpr={activeField.qFieldExpr}
                height={(modalBodyEl.current&&modalBodyEl.current.offsetHeight)*0.875}
                showHeaderButtonbar={activeField.toggle}
                alwaysShowSearch={true}
                toggle={activeField.toggle}
                quickSelectionMode={!activeField.toggle}
                qId={'cs'}
              />
    },
    [activeField]
  );

  const clearAll = () => {
    props.clearAll()
    props.close()
  }
  return(
    <div className="rqtv-current-selections-modal">
      <Modal open={props.open} onClose={()=>{
        setActiveField('')
        props.close()
      }}>
        <ModalDialog>
          <ModalHeader title="Current Selections" close={props.close}/>
          <ModalBody modalBodyEl={modalBodyEl}>
            {/* (activeField==='')
              ?<CurrentSelectionsList currentSelections={filteredSelections} setActiveField={setActiveField}/>
              :<CurrentSelectionsListbox backToFieldList={()=>setActiveField('')}>
                  {activFieldListbox}
                </CurrentSelectionsListbox>*/
            }
            <Carousel index={activeField===''?0:1}>
              <CurrentSelectionsList currentSelections={filteredSelections} setActiveField={setActiveField}/>
              <CurrentSelectionsListbox backToFieldList={()=>setActiveField('')}>
                  {activFieldListbox}
                </CurrentSelectionsListbox>
            </Carousel>

          </ModalBody>
          <ModalFooter showDismiss={false} dismissLabel="Cancel" close={props.close}>
            <RqtvCurrentSelectionsToolbar
              className={"in-modal"}
              isResponsive={false}
              showModalToggler={false}
              inModal={true}
              {...props.toolbarProps}
              alwayShowToolbar={true}
            />
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </div>
  )
}

const CurrentSelectionsList = props =>{
  return(
    props.currentSelections.length>0
    ?<ul className="list-group current-selections-list">
      {props.currentSelections.map((currentSelectionField,index)=>
        <CurrentSelectionsField item={currentSelectionField} key={index} setActiveField={props.setActiveField}/>
      )}
    </ul>
    :<div style={{textAlign:'center', minHeight:'80px', verticalAlign:'middle'}}>
      <h4 style={{textAlign:'center', fontSize:"1.2rem"}}>
        <LuiIcon iconType="info" className="lui-icon--large"/> No Selections
      </h4>
    </div>
  )
}

const CurrentSelectionsListbox = props =>
<div className="current-selections-listbox d-flex align-items-center" style={{height:'100%'}}>
  <div style={{margin:'0 1rem 0 0'}}>
    <button className="btn primary ripple back" onClick={()=>props.backToFieldList()}>
      <Icon type={chevronLeft}/>
    </button>
  </div>
  <div style={{flexGrow:1, height:'100%'}}>
    {props.children}
  </div>
</div>




export default RqtvCurrentSelectionsModal
