## REAQTIVE
## Reaqtive

Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children
Provided contexts are: QGlobal, QDoc, QCapabilityApis, QApp and System.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**qCapabilityApiRequired** | `Boolean` | `true` | :x: | if true Reaqtive downloads capability APIs from Qlik server and provides the qlik object and the qApp to its children
**qConfig** | `Shape` |  | :white_check_mark: | qConfig is an object that provides reaqtive the params needed to connect to the Qlik server. params are: host, port, secure, prefix, appId: the id of the app reaqtive should connect to
**qConfig.appId** | `String` |  | :white_check_mark: | appId: the id of the app reaqtive should connect to
**qConfig.host** | `String` |  | :white_check_mark: | host: the ip address or domain of the Qlik SystemProvider
**qConfig.port** | `Number` |  | :white_check_mark: | port: the port on which Qlik server is listening
**qConfig.prefix** | `Number` |  | :white_check_mark: | prefix: Qlik's virtual proxy path
**qConfig.secure** | `Boolean` |  | :white_check_mark: | secure: true if the Qlik server uses https, false otherwise


<br/><br/>
## CONTEXTS
## QCapabilityApi

QCapabilityApi
This context provides a handler for the qlik object provided by Qlik Capability APIs.
the handler is an object with 5 props:
qLoadingRequireJS: initially true, it is set to false when the promise to get requireJS is resolved
qLoadingQlikJS: initially true, it is set to false when the promise to get qlikJS is resolved
qLoadingCss: initially true, it is set to false when the promise to get qlikCSS is resolved
qlik: the qlik provided by the qlik Capability APIs. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if one of the promises to load requireJS or the qlik object or the css fails





## QDoc

QDoc
This context provides a handler for the qDoc provided by Qlik engine Api.
the handler is an object with 3 props:
qDoc: the actual qDoc provided by the qEngine. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if the promise for the qDoc returns an error
qLoading: initially true, it is set to false when the promise to get the qDoc is resolved
https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html





## QGlobal

QGlobal
This context provides a handler for the qGlobal provided by Qlik engine Api.
the handler is an object with 3 props:
qGlobal: the actual qGlobal provided by the qEngine. It is initially null and it is set when the promis is resolved
qError: initially null it is set to true if the promise for the qGlobal returns an error
qLoading: initially true, it is set to false when the promise to get the qGlobal is resolved
https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html




<br/><br/>
## COMPONENTS
## QGenericObject

QGenericObject
Creates a generic object and provides qObject and qLayout to its clid.
It expects only 1 child
It attaches an onChange event-listener to the qObject and automatically updates the layout when the event fires.
For example it can provide a listobject or a hypercube to its children.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**qObjectDef** | `Object` |  | :white_check_mark: | The definition of the qObject. Check the following links for details https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/genericobject.html
**quickSelectionMode** | `Boolean` | `false` | :x: | If true the object will handle selections using Qlik Sense mode (user will have to accept selections) If set to false the object will handle selections using QlikView mode (selection immediately applied)



## QVariable

QVariable
It provides a variable and its layout to its child.
It automatically aupdate layout everytime the variable is updated by the engine calculations.
It expects no more than 1 child

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**variableId** | `String` |  | :x: | The id of the variable. It must not be provided if variableName is provided
**variableName** | `String` |  | :x: | The name of the variable. It must not be provided if variableId is provided


<br/><br/>
