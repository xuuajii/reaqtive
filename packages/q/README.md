# **@reaqtive/q**

This package provides a set of hooks, contexts and components to interact with the [Qlik Engine APIs](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/EngineAPI/Content/introducing-engine-API.htm) and the [Qlik Capability APIs](https://help.qlik.com/en-US/sense-developer/June2018/Subsystems/EngineAPI/Content/introducing-engine-API.htm).
Its purpose is to simplify the interaction with the engine and provide a set of tested APIs to easily retrieve data and interfaces from the engine.



#### Installation
@reaqtive/q does not provide any layout components, it only allows you to interact with the Qlik engine. You can use it as a stand alone package and develop your layout components using its APIs, as described below.
```
npm install @reaqtive/q
```
Depending on your needs and you can install @reaqtive/components instead. It provides a set of ready to use layout components to build data visualization apps on top o Qlik APIs, and depends on @reaqtive/q.
```
npm install @reaqtive/components
```

###TABLE OF CONTENTS
- [REAQTIVE](#reaqtive) </br>
- [CONTEXTS](#contexts) </br>
- [COMPONENTS](#components) </br>
- [HOOKS](#hooks) </br>

## REAQTIVE
### **Reaqtive**



Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children.</br>
Provided contexts are:
- [QGlobal](#qglobal) </br>
- [QDoc](#qdoc) </br>
- [QCapabilityApi](#qcapabilityapi) </br>
- [QApp](#qapp) </br>


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__qCapabilityApiRequired__ | `Boolean` | `true` | :x: | if true Reaqtive downloads capability APIs from Qlik server and provides the qlik object and the qApp to its children
__qConfig__ | `Shape` |  | :white_check_mark: | qConfig is an object that provides reaqtive the params needed to connect to the Qlik server. params are: host, port, secure, prefix, appId: the id of the app reaqtive should connect to
__qConfig.appId__ | `String` |  | :white_check_mark: | appId: the id of the app reaqtive should connect to
__qConfig.host__ | `String` |  | :white_check_mark: | host: the ip address or domain of the Qlik SystemProvider
__qConfig.port__ | `Number` |  | :white_check_mark: | port: the port on which Qlik server is listening
__qConfig.prefix__ | `String` |  | :white_check_mark: | prefix: Qlik's virtual proxy path
__qConfig.secure__ | `Boolean` |  | :white_check_mark: | secure: true if the Qlik server uses https, false otherwise

**Example:** 
```javascript
import React from 'react'
import Reaqtive from '@reaqtive/q'
import {MyComponentWithQGlobal, MyComponentWithQDoc, MyComponentWithQCapabilityApi, MyComponentWithQApp, MyQGenericObject, MyQVariable} from './index'
import {MyRqtvListbox, MyRqtvDropdownFilter, MyRqtvButtonBar, MyRqtvModalListbox, MyRqtvSearchField, MyRqtvMultibox, MyQVizExamples, MyRqtvContainerExample,MyRqtvCurrentSelections, MyRqtvSearchObject} from '../components/index'

const MyReaqtiveComponent = props => {
  // This qConfig allows to connect to on Qlik Sense Desktop and open the app called Executive Dashboard
  const qConfig = {                                 //For QS Desktop
      host: '40.113.14.238',                        //localhost
      secure: true,                                 //false
      port: 443,                                    //4848
      prefix: '',                                   //''
      appId: '8aa3a035-0689-4aab-a920-d6722509ed51' //your app file name (e.g. 'Executive dashboard.qvf')
  };
  return (
    <Reaqtive
      qConfig={qConfig}
    >
      {/*
        Inside Reaqtive children you will have access to the contexts it provides.
        You can use them individually or combine them in your components
      */}
      <MyComponentWithQGlobal/>
      <MyComponentWithQDoc/>
      <MyComponentWithQCapabilityApi/>
      <MyComponentWithQApp/>
      <MyQGenericObject/>
      <MyQVariable/>
      <MyRqtvListbox/>
      <MyRqtvDropdownFilter/>
      <MyRqtvModalListbox/>
      <MyRqtvSearchField/>
      <MyRqtvListbox/>
      <MyRqtvMultibox/>
      <MyQVizExamples/>
      <MyRqtvContainerExample/>
      <MyRqtvCurrentSelections/>
      <MyRqtvSearchObject/>
    </Reaqtive>
  )
}

export default MyReaqtiveComponent

```
<br></br>


,## CONTEXTS
### **QGlobal**



QGlobal
This context provides a handler for the qGlobal provided by Qlik engine Api.
The handler is an object with 3 props:
qGlobal: the actual qGlobal provided by the qEngine. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if the promise for the qGlobal returns an error
qLoading: initially true, it is set to false when the promise to get the qGlobal is resolved
https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html



**Example:** 
```javascript
import React, {useContext} from 'react'
import {QGlobal} from '@reaqtive/q'

const MyComponentWithQGlobal = props => {
  const qGlobalHandler = useContext(QGlobal)
  console.log(qGlobalHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the qGlobal class and call its methods</div>
  )
}

export default MyComponentWithQGlobal

```
<br></br>



### **QDoc**



QDoc
This context provides a handler for the qDoc provided by Qlik engine Api.
The handler is an object with 3 props:
qDoc: the actual qDoc provided by the qEngine. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if the promise for the qDoc returns an error
qLoading: initially true, it is set to false when the promise to get the qDoc is resolved
https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html



**Example:** 
```javascript
import React, {useContext} from 'react'
import {QDoc} from '@reaqtive/q'

const MyComponentWithQDoc = props => {
  const qDocHandler = useContext(QDoc)
  console.log(qDocHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the qDoc class and call its methods</div>
  )
}

export default MyComponentWithQDoc

```
<br></br>



### **QCapabilityApi**



QCapabilityApi
This context provides a handler for the qlik object provided by Qlik Capability APIs.
The handler is an object with 5 props:
qLoadingRequireJS: initially true, it is set to false when the promise to get requireJS is resolved
qLoadingQlikJS: initially true, it is set to false when the promise to get qlikJS is resolved
qLoadingCss: initially true, it is set to false when the promise to get qlikCSS is resolved
qlik: the qlik provided by the qlik Capability APIs. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if one of the promises to load requireJS or the qlik object or the css fails



**Example:** 
```javascript
import React, {useContext} from 'react'
import {QCapabilityApi} from '@reaqtive/q'

const MyComponentWithQCapabilityApi = props => {
  const qCapabilityApiHandler = useContext(QCapabilityApi)
  console.log(qCapabilityApiHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the  qlik class provided by the qCapabilityApi and call its methods</div>
  )
}

export default MyComponentWithQCapabilityApi

```
<br></br>



### **QApp**



QApp
This context provides a handler for the application (qApp) object provided by Qlik Capability APIs.
The handler is an object with 3 props:
qLoading: initially true, it is set to false when the promise to get the qApp is resolved
qApp: the app provided by the qlik Capability APIs. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if the promise to get the qApp returns an error



**Example:** 
```javascript
import React, {useContext} from 'react'
import {QApp} from '@reaqtive/q'

const MyComponentWithQApp = props => {
  const qAppHandler = useContext(QApp)
  console.log(qAppHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the qApp class and call its methods</div>
  )
}

export default MyComponentWithQApp

```
<br></br>


,## COMPONENTS
### **QGenericObject**



QGenericObject
Creates a generic object and provides qObject and qLayout to its clid.
It expects only 1 child
It attaches an onChange event-listener to the qObject and automatically updates the layout when the event fires.
For example it can provide a listobject or a hypercube to its children.

QGenericObject must have one and only one child. The child can be a React element (external layout mode) or a function that returns a React element (inline layout mode).

See the example below for details


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__qObjectDef__ | `Object` |  | :white_check_mark: | The definition of the qObject. Check the following links for details https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/genericobject.html
__quickSelectionMode__ | `Boolean` | `true` | :x: | If true the object will handle selections using Qlik Sense mode (user will have to accept selections) If set to false the object will handle selections using QlikView mode (selection immediately applied)

**Example:** 
```javascript
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

```
<br></br>



### **QVariable**



QVariable
It provides a variable and its layout to its child.
It automatically aupdate layout everytime the variable is updated by the engine calculations.

QVariable must have one and only one child. The child can be a React element (external layout mode) or a function that returns a React element (inline layout mode).

See the example below for details


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__variableId__ | `String` |  | :x: | The id of the variable. It must not be provided if variableName is provided
__variableName__ | `String` |  | :x: | The name of the variable. It must not be provided if variableId is provided

**Example:** 
```javascript
import React from 'react'
import {QVariable} from '@reaqtive/q'

const MyQVariable = props => {
  const variableName = 'MonthNames';
  return(
    <div className="row">
      {/*Inline layout*/}
      <QVariable variableName={variableName}>
        {(qVariable)=>{
            console.log('variable', qVariable)
            return (
              <div className="col-md-6">
                <div>
                  <span>MyVariable name is: </span>
                  <span>{variableName}</span>
                </div>
                <span>MyVariable value is: </span>
                {qVariable.qLayoutHandler.qLayout&&<span>{qVariable.qLayoutHandler.qLayout.qText}</span>}
              </div>
            )
          }
        }
      </QVariable>
      {/*External layout*/}
      <QVariable variableName={variableName}>
        <Layout variableName={variableName}/>
      </QVariable>
    </div>
  )
}

const Layout = props =>
<div className="col-md-6">
  <div>
    <span>MyVariable name is: </span>
    <span>{props.variableName}</span>
  </div>
  <div>
    <span>MyVariable value is: </span>
    {props.qLayoutHandler.qLayout&&
      <span>{props.qLayoutHandler.qLayout.qText}</span>
    }
  </div>
</div>
export default MyQVariable

```
<br></br>


,## HOOKS
### **useQFieldReducer**

#### Description
a hook to retrieve a field from qDoc. if provided a defaulta value it selecte the value when it mounts and set the field to always one selected if isAlwaysOneSelected is set to true

#### Params
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qFieldName__ | string | | :white_check_mark: | the name of the field
__isAlwaysOneSelected__ | boolean | | :x: | flag to set isAlwaysOneSelected
__defaultValue__ | string | | :x: | the defaultValue to be selected before setting isAlwaysOneSelected to true
__resetOnUnmount__ | boolean | | :x: | if set to true it set isAlwaysOneSelected to false when unmount
#### Returns
It returns a **qfieldHandler**: the handler of the qlik field

name | type | description
---- | :----: | -------
__qLoading__ | boolean| if true the the handler is still waiting for response from the qlik server
__qError__ | boolean| if true there was an error retrieving the qField from the engine
__qField__ | object| the object returned from the server to interact with the field

### **useQLayoutReducer**

#### Description
a hook to create and retrieve a the layout of a qObject (tested with generic objects and variables)

#### Params
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qObjectHandler__ | qObjectHandler | | :white_check_mark: | the handler retrieved by useQObjectReducer
__qSelectionHandler__ | qSelectionHandler | | :x: | the handler that manages the selection state of the generic object, it is not needed if the qObject does not have a selection state to handle
#### Returns
It returns a **qLayoutHandler**: the handler of the qLayout

name | type | description
---- | :----: | -------
__qLoading__ | boolean| if true the the handler is still waiting for response from the qlik server
__qError__ | boolean| if true there was an error retrieving the qLayout from the engine
__qLayout__ | object| the object returned from the server which contains the layout returned from the qlik server
__setLayoutUpdater__ | function| a method that accept a function that can be defined inside the view using the layout. by default the layout updater is qObject.getLayout(). it could be useful to change the layout updater when the generic object is in selecting mode
__applyQLayoutPatch__ | function| a function that allow to change the shape of the layout from the view. it is inteneded to be used when the qDisplayArea changes: the view asks the server for a new data page and the apply the patch to the already existing layout

### **useQObjectReducer**

#### Description
a hook to create and retrieve a generic object from the qlik engine

#### Params
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qObjectDef__ | qObjectDef | | :white_check_mark: | The object that tells to the qlik engine what object you want
#### Returns
It returns a **qObjectHandler**: the handler of the newly created object

name | type | description
---- | :----: | -------
__qLoading__ | boolean| if true the the handler is still waiting for response from the qlik server
__qError__ | boolean| if true there was an error retrieving the qObject from the engine
__qObject__ | object| the object returned from the server
__reloadObject__ | function| a method to ask the qlik engine to recalculate the qObject
__shouldUpdate__ | boolean| a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections)
__setShouldUpdate__ | function| a function to clean up the shouldupdate property after the needed effects have run

### **useQVariableReducer**

#### Description
hook to retrieve a variable already available in the qDoc

#### Params
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__id__ | string | | :white_check_mark: | the name or id of the variable
__idType__ | string |name | :x: | tells to the variable reducer whether to use the name or id to retrieve the variable
#### Returns
It returns a **qVariableHandler**: the handler of the variable

name | type | description
---- | :----: | -------
__qLoading__ | boolean| if true the the handler is still waiting for response from the qlik server
__qError__ | boolean| if true there was an error retrieving the qVariable from the engine
__qVariable__ | object| the object returned from the server to interact with the variable
__shouldUpdate__ | boolean| a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections)
__setShouldUpdate__ | function| a function to clean up the shouldupdate property after the needed effects have run

### **useQVizHandler**

#### Description
a hook to retrieve a variable already available in the qDoc

#### Params
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qApp__ | object | | :white_check_mark: | the qApp object provided by the qApp context
__id__ | string | | :x: | if id is defined and chartProps are not, the useQVizHandler will ask for an already existing viz to the qApp
__chartProps__ | object | | :x: | if the chartProps is defined the useQVizHandler will create the visualization on the fly not considering an eventually provided id
#### Returns
It returns a **qVizHandler**: - handler to interact with the visualization retrieved from the qApp

name | type | description
---- | :----: | -------
__qVizLoading__ | boolean| if true the the handler is still waiting for response from the qlik server
__qViz__ | object| the interface to interact with the visualization (e.g. to export it in excel, to resize it, etc.)
