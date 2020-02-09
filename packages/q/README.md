# **@reaqtive/q**
***
This package provides a set of hooks, contexts and components to interact with the [Qlik Engine APIs](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/EngineAPI/Content/introducing-engine-API.htm) and the [Qlik Capability APIs](https://help.qlik.com/en-US/sense-developer/June2018/Subsystems/EngineAPI/Content/introducing-engine-API.htm).
Its purpose is to simplify the interaction with the engine and provide a set of tested APIs to easily retrieve data and interfaces from the engine.
@reaqtive/q provides 4 types of APIs which are listed below.
</br>

- [Reaqtive](#reaqtive)
- [Contexts](#contexts)
- [Components](#components)
- [Hooks](#hooks)


#### Installation
@reaqtive/q does not provide any layout components, it only allows you to interact with the Qlik engine. You can use it as a stand alone package and develop your layout components using its APIs, as described below.
```
npm install @reaqtive/q
```
Depending on your needs and you can install @reaqtive/components instead. It provides a set of ready to use layout components to build data visualization apps on top o Qlik APIs, and depends on @reaqtive/q.
```
npm install @reaqtive/components
```
***
## REAQTIVE
***
### **Reaqtive**



Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children.</br>
Provided contexts are:
- [QGlobal](#qglobal) </br>
- [QDoc](#qdoc) </br>
- [QCapabilityApi](#qcapabilityapi) </br>
- [QApp](#qapp) </br>


**Example:** 
```javascript
import React from 'react'
import Reaqtive from '@reaqtive/q'
import {MyComponentWithQGlobal, MyComponentWithQDoc, MyComponentWithQCapabilityApi, MyComponentWithQApp} from './index'

const MyReaqtiveComponent = props => {
  // This qConfig allows to connect to on Qlik Sense Desktop and open the app called Executive Dashboard
  const qConfig = {
      host: 'localhost',    //or your Qlik Sense Enterprise host
      secure: false,        //true if you wanto to connect to your QS Enterprise host
      port: 4848,           //443 if you wanto to connect to your QS Enterprise host
      prefix: '',           //the virtual proxy tou want to use on your QS Enterprise host
      appId: 'Executive Dashboard.qvf' //the id of your app on QS Enterprise
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
    </Reaqtive>
  )
}

export default MyReaqtiveComponent
```
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


<br/><br/>

## CONTEXTS
***
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


<br/><br/>

## COMPONENTS
***
### **QGenericObject**



QGenericObject
Creates a generic object and provides qObject and qLayout to its clid.
It expects only 1 child
It attaches an onChange event-listener to the qObject and automatically updates the layout when the event fires.
For example it can provide a listobject or a hypercube to its children.



**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__qObjectDef__ | `Object` |  | :white_check_mark: | The definition of the qObject. Check the following links for details https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/genericobject.html
__quickSelectionMode__ | `Boolean` | `false` | :x: | If true the object will handle selections using Qlik Sense mode (user will have to accept selections) If set to false the object will handle selections using QlikView mode (selection immediately applied)



### **QVariable**



QVariable
It provides a variable and its layout to its child.
It automatically aupdate layout everytime the variable is updated by the engine calculations.
It expects no more than 1 child



**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__variableId__ | `String` |  | :x: | The id of the variable. It must not be provided if variableName is provided
__variableName__ | `String` |  | :x: | The name of the variable. It must not be provided if variableId is provided


<br/><br/>

## HOOKS
***
<br/><br/>
