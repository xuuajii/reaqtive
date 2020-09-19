import React, {useRef} from 'react'
import {Tabs, TabList, Tab, TabPanels} from '@reaqtive/layout'

import './tabs.scss'

const TabsExample = props => {
  const containerEl = useRef()
  return(
    <div className="container tabs-example" ref={containerEl}>
      <Tabs animatedTabs={true}>
        <TabList>
          <Tab className="customized-tabs" label="First Tab Moooolto lungo"/>
          <Tab className="customized-tabs" label="Second Tab Moooolto lungo"/>
          <Tab className="customized-tabs" label="Third Tab"/>
          <Tab className="customized-tabs" label="Fourth Tab Moooolto lungo"/>
          <Tab className="customized-tabs" label="Fifth Tab"/>
          <Tab className="customized-tabs" label="Sixth Tab Moooolto lungo"/>
          <ScrollSize containerEl={containerEl}/>
        </TabList>
        <TabPanels>
          <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1>
          <h1>4</h1>
          <h1>5</h1>
          <h1>6</h1>
        </TabPanels>
      </Tabs>
    </div>
  )
}

const ScrollSize = props => {
  const scrollEl = useRef()
  const {containerEl} = props
  console.log(containerEl.current&&containerEl.current.offsetWidth, scrollEl.current&&scrollEl.current.offsetWidth)
  return(
    <div style={{position:'absolute', left:0, width:'100%', height:0}} ref={scrollEl}/>
  )
}


const TabPanel = props =>
  <div>
    {props.children}
  </div>


export default TabsExample
