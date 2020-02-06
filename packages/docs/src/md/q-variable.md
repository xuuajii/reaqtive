## QVariable

QVariable
It provides a variable and its layout to its child.
It automatically aupdate layout everytime the variable is updated by the engine calculations.
It expects no more than 1 child

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**variableId** | `String` |  | :x: | variableId: the id of the variable. It must not be provided if variableName is provided
**variableName** | `String` |  | :x: | variableName: the name of the variable. It must not be provided if variableId is provided

