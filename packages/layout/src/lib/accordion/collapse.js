import React, {useState, useRef} from 'react'

const AccordionItem = (props, accordionHandler) =>{
  const [isExpandedState, setIsExpandedState] = useState()
  const collapseHeaderEl = useRef()
  //console.log(props.onChange)
  const isExpanded=props.isExpanded!==undefined?props.isExpanded:isExpandedState
  const handleChange = event => {
    if(props.onChange){
      props.onChange(event, !isExpanded)
    } else {
      setIsExpandedState(!isExpanded)
    }
  }
  const children = React.Children.toArray(props.children)
  const hideTitleWhenExpanded = children&&children[0].props.hideTitleWhenExpanded
  return(
    <div className={`collapse show ${isExpanded?'expanded':'  '}`} style={{overflow:'hidden'}}>
      {children.map(child=>
        React.cloneElement(child, {handleChange, isExpanded, collapseHeaderEl, hideTitleWhenExpanded})
      )}
    </div>
  )
}

export default AccordionItem
