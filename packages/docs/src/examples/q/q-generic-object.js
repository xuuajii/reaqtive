import React from 'react'
import {QGenericObject} from '@reaqtive/q'

const qObjectDef = {
  "qInfo": { "qId": "", "qType": "FieldList" },
  "qFieldListDef": {
    "qShowSystem": false,
    "qShowHidden": false,
    "qShowSemantic": true,
    "qShowSrcTables": true
  }
}

const MyQGenericObject = props => {
  return (
    <div className="row">
      {/*Externallayout mode*/}
      <QGenericObject qObjectDef={qObjectDef}>
        {
         /**
          *You can define the view of your generic object in a separate component that we call Layout as a convention.
          *The Layout will received the interfaces provided by the QGenericObject as props.
          */
        }
        <Layout/>
      </QGenericObject>

      {/*Inline layout mode*/}
      <QGenericObject qObjectDef={qObjectDef}>
        {
          /**
           *You can define the view of your generic object in line using a function.
           *The function accept one argument which is an object that contains all the interfaces provided by the QGenericObject.
           *You will have access to the interfaces in the body of the function.
           */}
        {(qGenericObject)=>{
          console.log('inline layout', qGenericObject)
          return (
            <div className="col-md-6">
              <div>My Generic Object - Inline layout mode</div>
              <div style={{maxHeight:300, overflowY:'auto'}}>
                <ul className="list-group">
                  {
                    qGenericObject.qLayoutHandler.qLayout&&qGenericObject.qLayoutHandler.qLayout.qFieldList.qItems.map(item=>
                      <li key={item.qName} className="list-group-item">{item.qName}</li>
                    )
                  }
                </ul>
              </div>
            </div>
          )
        }}
      </QGenericObject>
    </div>
  )
}

const Layout = props => {
  console.log('external layout', props)
  return (
    <div className="col-md-6">
      <div>My Generic Object - External layout mode</div>
      <div style={{maxHeight:300, overflowY:'auto'}}>
        <ul className="list-group">
          {
            props.qLayoutHandler.qLayout&&props.qLayoutHandler.qLayout.qFieldList.qItems.map(item=>
              <li key={item.qName} className="list-group-item">{item.qName}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default MyQGenericObject
