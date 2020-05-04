import React, {useState, useEffect, useRef} from 'react'
import {RqtvVizContainer, QViz, RqtvMaximizePortalEl} from '@reaqtive/components'

const MyRqtvContainer = props =>
<RqtvVizContainer
  height={'300px'}
  showExportExcel={true}
  showExportPdf={true}
  showExportImg={true}
  maximizeElRef={props.maximizeElRef}
  onMaximize={props.onMaximize}
>
  <QViz id="nRxXG" title="bar chart"/>
</RqtvVizContainer>

const MyMultiVizRqtvContainer = props =>
<RqtvVizContainer
  style={{height:'300', maxHeight:'300'}}
  maximizeElRef={props.maximizeElRef}
  onMaximize={props.onMaximize}
>
  <QViz key="pDKRhr" id="pDKRhr" title="scatter chart"/>
  <QViz key="nvqpV" id="nvqpV" title="line chart"/>
</RqtvVizContainer>

const MyRqtvContainerExample = props => {
  const maximizeElRef = useRef()
  /**
    * HTML overflow is handled by RqtvApp if the RqtvMaximizePortalEl and RqtvVizContainer
    * are inside it, otherwise you will have to handle it in your code, below an example
    */

  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(()=>{
    const html = document.getElementsByTagName("html")[0];
    const maximize = () => {
      html.style.overflow ='hidden'
      html.scrollTop=0
    }
    const minimize = () => {
      html.style.overflow ='auto'
    }
    isMaximized?maximize():minimize()
  }, [isMaximized])

  const onMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return(
    <>
      <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
      <MyRqtvContainer
        maximizeElRef={maximizeElRef}
        onMaximize={onMaximize}
      />
      <MyMultiVizRqtvContainer
        maximizeElRef={maximizeElRef}
        onMaximize={onMaximize}
      />
    </>
  )
}
export default MyRqtvContainerExample
