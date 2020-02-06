## Reaqtive

Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children
Provided contexts are: QGlobal, QDoc, QCapabilityApis, QApp and System.

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**qCapabilityApiRequired** | `Boolean` | `true` | :x: | if true Reaqtive downloads capability APIs from Qlik server and provides the qlik object and the qApp to its children
**qConfig** | `Shape` |  | :white_check_mark: | qConfig is an object that provides reaqtive the params needed to connect to the Qlik server. params area: host: the ip address or domain of the Qlik SystemProvider port: the port on which Qlik server is listening secure: true if the Qlik server uses https, false otherwise prefix: Qlik's virtual proxy path appId: the id of the app reaqtive should connect to
**qConfig.appId** | `String` |  | :x: | 
**qConfig.host** | `String` |  | :x: | 
**qConfig.port** | `Number` |  | :x: | 
**qConfig.secure** | `Boolean` |  | :x: | 

