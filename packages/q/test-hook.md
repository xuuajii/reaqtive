### useQFieldReducer

a hook to retrieve a field from qDoc. if provided a defaulta value it selecte the value when it mounts and set the field to always one selected if isAlwaysOneSelected is set to true

#### **Params**
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qFieldName__ | ddd |ddd | :white_check_mark: | the name of the field
__isAlwaysOneSelected__ | ddd |ddd | :x: | flag to set isAlwaysOneSelected
__defaultValue__ | ddd |ddd | :x: | the defaultValue to be selected before setting isAlwaysOneSelected to true
__resetOnUnmount__ | ddd |ddd | :x: | if set to true it set isAlwaysOneSelected to false when unmount

### useQLayoutReducer

a hook to create and retrieve a the layout of a qObject (tested with generic objects and variables)

#### **Params**
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qObjectHandler__ | ddd |ddd | :white_check_mark: | the handler retrieved by useQObjectReducer
__qSelectionHandler__ | ddd |ddd | :x: | the handler that manages the selection state of the generic object, it is not needed if the qObject does not have a selection state to handle

### useQObjectReducer

a hook to create and retrieve a generic object from the qlik engine

#### **Params**
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qObjectDef__ | ddd |ddd | :white_check_mark: | The object that tells to the qlik engine what object you want

### useQSelectionHandler(

a hook to handle the selection state of an object

#### **Params**
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__qObject__ | ddd |ddd | :white_check_mark: | the qObject to apply the state to

### useQVariableReducer

hook to retrieve a variable already available in the qDoc

#### **Params**
param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
__id__ | ddd |ddd | :white_check_mark: | the name or id of the variable
__idType__ | ddd |1 | :x: | tells to the variable reducer whether to use the name or id to retrieve the variable
