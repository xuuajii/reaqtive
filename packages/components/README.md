# **@reaqtive/components**

This package helps creating guided analytics using Qlik APIs. It provides a set of reusable react components to speed up mash up developments.



#### Installation

```
npm install @reaqtive/components
```

@reaqtive/q will be installed as well, it will help you interact with Qlik engine and Qlik Capability APIs

###TABLE OF CONTENTS
- [FILTERS](#filters) </br>
- [VISUALIZATIONS](#visualizations) </br>
- [APP OBJECTS](#app objects) </br>
- [APP](#App) </br>
- [STYLES](#Styles) </br>

## FILTERS
### **RqtvButtonBar**



RqtvButtonBar
it is a paginated listbox shaped as a buttonbar
It does not ask for selection confirmation, but just toggle the selection when a button is clicked

You can twek its behavuiour using props.

You can customize its styles using css or using props.


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__buttonSize__ | `String` | `'btn-sm'` | :x: | The bootstrap class to apply large (btn-lg), standard (btn) or small (btn-sm) size to a button.
__buttonsClassName__ | `String` | `''` | :x: | css classes applied to the buttons (it can be overwritten by selections color coding)
__buttonsStyle__ | `Object` | `{}` | :x: | style object to customize buttons style (it can be overwritten by selections color coding)
__goToFirstPageAfterSelection__ | `Boolean` | `true` | :x: | If true it resets pagination (back to first page) after a selection is made
__qDataPageHeight__ | `Number` | `5` | :x: | The number of records asked to the engine for each page
__qFieldExpr__ | `String` |  | :white_check_mark: | The expression which will be used in the listbox. It can be a fieldname or a valid expression
__qSortObject__ | `Shape` | `{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 1, qSortByLoadOrder: 0, qSortByExpression: 0 }` | :x: | An array that tells the engine how to sort listbox data. You can set only the relevant properties of the object to 1.
__qSortObject.qExpression__ | `Shape` |  | :x: | Sort by expression.
__qSortObject.qExpression.qv__ | `String` |  | :x: | 
__qSortObject.qSortByAscii__ | `Number` |  | :x: | Sorts the field by alphabetical order.
__qSortObject.qSortByExpression__ | `Number` |  | :x: | Sorts the field by expression.
__qSortObject.qSortByFrequency__ | `Number` |  | :x: | Sorts the field values by frequency (number of occurrences in the field).
__qSortObject.qSortByGreyness__ | `Number` |  | :x: | 
__qSortObject.qSortByLoadOrder__ | `Number` |  | :x: | Sorts the field values by the initial load order.
__qSortObject.qSortByNumeric__ | `Number` |  | :x: | Sorts the field values by numeric value.
__qSortObject.qSortByState__ | `Number` |  | :x: | Sorts the field values according to their logical state (selected, optional, alternative or excluded).
__toggle__ | `Boolean` | `true` | :x: | if true uses toggle select

**Example:** 
```javascript
import React from 'react'
import {RqtvButtonBar} from '@reaqtive/components'

const MyRqtvButtonBar = props =>
<RqtvButtonBar
  qFieldExpr = "$Field"
/>

export default MyRqtvButtonBar

```
<br></br>



### **RqtvDropdownFilter**



RqtvDropdownFilter
It is a listbox shaped as a dropdown.
It has the same responsive behaviour as bootstrap dropdown when wrapped in a collapse

You can twek its behavuiour using props.

You can customize its styles using css or using props.


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__align__ | `String` | `'left'` | :x: | It allows to align the dropdown menu to the left or to rhe right of the button
__buttonClassName__ | `String` | `'primary text-light'` | :x: | className for the dropdown button
__buttonStyle__ | `Object` | `{}` | :x: | style object to customize the dropdown button
__dropdownMenuHeight__ | `Number` | `300` | :x: | Height of the dropdown when is open
__dropdownMenuItemStyle__ | `Object` | `{}` | :x: | style object to customize the style of the dropdown menu items (it can be overwritten by selections color coding)
__dropdownMenuStyle__ | `Object` | `{}` | :x: | style object to customize the dropdown menu
__dropdownMenuWidth__ | `Number` | `265` | :x: | Width of the dropdown when is open
__hideHorizontalScrollbar__ | `Boolean` | `false` | :x: | Show/hide overflowX
__qFieldExpr__ | `String` |  | :white_check_mark: | The expression which will be used in the listbox. It can be a fieldname or a valid expression
__qFieldLabelExpr__ | `String` |  | :x: | The expression of the title used in the dropdown button (by default it shows the name of the field and the count distinct of that field or the selected value if there is only one selected value)
__qSortObject__ | `Shape` | `{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }` | :x: | 
__qSortObject.qExpression__ | `Shape` |  | :x: | Sort by expression.
__qSortObject.qExpression.qv__ | `String` |  | :x: | 
__qSortObject.qSortByAscii__ | `Number` |  | :x: | Sorts the field by alphabetical order.
__qSortObject.qSortByExpression__ | `Number` |  | :x: | Sorts the field by expression.
__qSortObject.qSortByFrequency__ | `Number` |  | :x: | Sorts the field values by frequency (number of occurrences in the field).
__qSortObject.qSortByGreyness__ | `Number` |  | :x: | 
__qSortObject.qSortByLoadOrder__ | `Number` |  | :x: | Sorts the field values by the initial load order.
__qSortObject.qSortByNumeric__ | `Number` |  | :x: | Sorts the field values by numeric value.
__qSortObject.qSortByState__ | `Number` |  | :x: | Sorts the field values according to their logical state (selected, optional, alternative or excluded).
__quickSelectionMode__ | `Boolean` | `false` | :x: | if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply), if false it uses Qlik View selection behaviour (apply selections immediately)
__showCaret__ | `Boolean` | `true` | :x: | Show/hide the caret in the dropdown button
__showSearch__ | `Boolean` | `true` | :x: | Show/hide the search input when the dropdown is open
__toggle__ | `Boolean` | `true` | :x: | if true uses toggle select

**Example:** 
```javascript
import React from 'react'
import {RqtvDropdownFilter} from '@reaqtive/components'

const MyRqtvDropdownFilter = props =>
<RqtvDropdownFilter
  qFieldExpr="$Table"
  dropdownMenuItemStyle={{textTransform:'uppercase'}}
/>

export default MyRqtvDropdownFilter

```
<br></br>



### **RqtvListbox**



RqtvListbox
It looks like a Qlik Sense listbox, but is always expanded (does'not turn into a drop down).
It will fill its container width

You can twek its behavuiour using props.

You can customize its styles using css or using props.


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__alwaysShowSearch__ | `Boolean` | `false` | :x: | if true the search input is alway shown
__focus__ | `Boolean` | `true` | :x: | if true the search input is automatically focused when mounted
__headerStyle__ | `Object` | `{}` | :x: | style object to customize listbox header
__height__ | `Number` | `500` | :x: | the height of the listbox
__itemStyle__ | `Object` | `{}` | :x: | style object to customize the style of the items displayed by the listbox  (it can be overwritten by selections color coding)
__listStyle__ | `Object` | `{}` | :x: | style object to customize the list that wraps the records
__qFieldExpr__ | `String` |  | :white_check_mark: | The expression which will be used in the listbox. It can be a fieldname or a valid expression
__qFieldLabelExpr__ | `String` |  | :x: | The expression shown in the header of the listbox
__qSortObject__ | `Shape` | `{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }` | :x: | An array that tells the engine how to sort listbox data. You can set only the relevant properties of the object to 1.
__qSortObject.qExpression__ | `Shape` |  | :x: | Sort by expression.
__qSortObject.qExpression.qv__ | `String` |  | :x: | 
__qSortObject.qSortByAscii__ | `Number` |  | :x: | Sorts the field by alphabetical order.
__qSortObject.qSortByExpression__ | `Number` |  | :x: | Sorts the field by expression.
__qSortObject.qSortByFrequency__ | `Number` |  | :x: | Sorts the field values by frequency (number of occurrences in the field).
__qSortObject.qSortByGreyness__ | `Number` |  | :x: | 
__qSortObject.qSortByLoadOrder__ | `Number` |  | :x: | Sorts the field values by the initial load order.
__qSortObject.qSortByNumeric__ | `Number` |  | :x: | Sorts the field values by numeric value.
__qSortObject.qSortByState__ | `Number` |  | :x: | Sorts the field values according to their logical state (selected, optional, alternative or excluded).
__quickSelectionMode__ | `Boolean` | `false` | :x: | if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply), if false it uses Qlik View selection behaviour (apply selections immediately)
__showHeader__ | `Boolean` | `true` | :x: | Show/hide listboxheader.
__showHeaderButtonbar__ | `Boolean` | `false` | :x: | Show/hide the buttons in listbox header (showHeader must be set to true to show the buttons)
__showListboxDropdownMenu__ | `Boolean` | `true` | :x: | Show/hide the listbox menu as a dropdown in listbox header
__titleAction__ | `Function` | `()=>false` | :x: | function called when clicking on the listbox title
__titleStyle__ | `Object` | `{}` | :x: | style object to customize listbox title
__toggle__ | `Boolean` | `true` | :x: | if true uses toggle select

**Example:** 
```javascript
import React from 'react'
import {RqtvListbox} from '@reaqtive/components'

const MyRqtvListbox = props => {
  return(
    <RqtvListbox
      qFieldExpr="$Field"
      qLabelExpr="=count(distinct Customer)"
      height={300}
    />
  )
}

export default MyRqtvListbox

```
<br></br>



### **RqtvModalListbox**



RqtvModalListbox
It allows you to wrap a listbox inside a modal: the listbox will be hidden and a button will be shown.
Clicking the button the listbox will appear inside a modal


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__buttonClassName__ | `String` | `'primary text-light'` | :x: | className for the dropdown button
__buttonStyle__ | `Object` | `{}` | :x: | style object to customize the dropdown button
__listboxProps__ | `Object` |  | :x: | the props which will be passed to the listbox
__qLabelExpr__ | `String` |  | :x: | The expression used in the listbox title and in the button that toggles the listbox

**Example:** 
```javascript
import React from 'react'
import {RqtvModalListbox} from '@reaqtive/components'

const MyRqtvModalListbox = props =>
<RqtvModalListbox
  listboxProps={{
    qFieldExpr:"$Table",
    height:300
  }}
/>

export default MyRqtvModalListbox

```
<br></br>



### **RqtvSearchField**



RqtvSearchField
It provides you an input field to search a listbox.
When the user starts typing a dropdown menu appears under the input field.

You can tweak its behaviour using props

You can customize style using props and css


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__dropdownMenuHeight__ | `Number` | `300` | :x: | Height of the dropdown when is open
__dropdownMenuWidth__ | `Number` | `265` | :x: | Width of the dropdown when is open
__hideHorizontalScrollbar__ | `Boolean` | `false` | :x: | Show/hide overflowX
__placeholder__ | `String` | `'Search'` | :x: | The text shown in the input field when not searching
__qFieldExpr__ | `String` |  | :white_check_mark: | The expression which will be used in the listbox. It can be a fieldname or a valid expression
__qSortObject__ | `Shape` | `{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }` | :x: | 
__qSortObject.qExpression__ | `Shape` |  | :x: | Sort by expression.
__qSortObject.qExpression.qv__ | `String` |  | :x: | 
__qSortObject.qSortByAscii__ | `Number` |  | :x: | Sorts the field by alphabetical order.
__qSortObject.qSortByExpression__ | `Number` |  | :x: | Sorts the field by expression.
__qSortObject.qSortByFrequency__ | `Number` |  | :x: | Sorts the field values by frequency (number of occurrences in the field).
__qSortObject.qSortByGreyness__ | `Number` |  | :x: | 
__qSortObject.qSortByLoadOrder__ | `Number` |  | :x: | Sorts the field values by the initial load order.
__qSortObject.qSortByNumeric__ | `Number` |  | :x: | Sorts the field values by numeric value.
__qSortObject.qSortByState__ | `Number` |  | :x: | Sorts the field values according to their logical state (selected, optional, alternative or excluded).
__quickSelectionMode__ | `Boolean` | `false` | :x: | if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply), if false it uses Qlik View selection behaviour (apply selections immediately)
__toggle__ | `Boolean` | `true` | :x: | if true uses toggle select

**Example:** 
```javascript
import React from 'react'
import {RqtvSearchField} from '@reaqtive/components'

const MyRqtvSearchField = props =>
<RqtvSearchField
  qFieldExpr="$Field"
  placeholder="Search"
/>
export default MyRqtvSearchField

```
<br></br>



### **RqtvMultibox**



RqtvMultibox

It returns an accordion that shows a list of fields.
A listbox is displayed for the active field. One field at a time can be active.


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__fieldHeight__ | `Number` | `300` | :x: | The height of the listbox of the active field
__fieldList__ | `Array` |  | :white_check_mark: | An array of fieldnames which will be displayed in the multibox

**Example:** 
```javascript
import React from 'react'
import {RqtvMultibox} from '@reaqtive/components'

const MyRqtvMultibox = props => {
  return(
    <RqtvMultibox
      fieldList={['$Table', '$Field']}
    />
  )
}

export default MyRqtvMultibox

```
<br></br>


,## VISUALIZATIONS
### **QViz**



QViz

It is a component that allows to retrieve Qlik visualizations.
Qlik visualizations can be retrieved by id (if they already exists in the Qlik Sense app) or
they can be created on the fly providing the properties to the engine.
QViz also provide an imperative handle to inteact with Qlik visualizazion.
To access the handle you have to provide a handle to the QViz component


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__chartProps__ | `Object` |  | :x: | the properties of the object to be created on the fly chartProps must be passed as: {'chartType':'string', 'columns':'array', 'rest':'object'} see this link for details https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm
__id__ | `String` |  | :white_check_mark: | the id of the visualization to be retrieved and of the div that will contain it
__showTitle__ | `Boolean` | `false` | :x: | show/hide the title in Qlik visualization

**Example:** 
```javascript
import React from 'react'
import {QViz} from '@reaqtive/components'

const MyQVizExamples = () =>
  <>
    <MyQVizFromApp/>
    <MyQVizOnTheFly/>
  </>


const MyQVizFromApp = props => {
  return(
    <QViz
      id="QYthJs"
      height={250}
    />
  )
}

const MyQVizOnTheFly = props =>{
  return(
    <QViz
      id="VizExample1"
      chartProps={{
        chartType:'barchart',
        chartColumns: [
          {
            "qDef":{
              "qFieldDefs": ["[Product Sub Group Desc]"],
               "qFieldLabels": ["Product Sub Group"],
               "qSortCriterias":[{qSortByExpression:1,qExpression:"=Sum([Sales Quantity]*[Sales Price])"}],
               "qReverseSort":true
             }
           },
          "Customer Type",
          {
            "qDef":{
              "qDef":"=Sum([Sales Quantity]*[Sales Price])",
              "qLabel":"Revenue"
            }
          }
        ],
        rest: {
          "showTitles": false,
          "title": "Revenue",
          "barGrouping":{grouping:"stacked"}
        }
      }}
      height={300}
    />
  )
}

export default MyQVizExamples

```
<br></br>



### **RqtvVizContainer**



RqtvVizContainer

It provides a container to a visualization. It accepts multiple children. In case i detects more tha one child,
it shows one child at a time and a dropdown menu to toggle the desired child.
If its children provide exports methods it automatically shows export buttons


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__className__ | `String` | `''` | :x: | Container css classes
__containerClassName__ | `String` | `''` | :x: | Container header css classes
__height__ | `Union<Number\|String>` | `300` | :x: | The height of the container pixels or % can be used
__height<1>__ | `Number` |  | :x: | 
__height<2>__ | `String` |  | :x: | 
__hideScrollWhenMaximized__ | `Boolean` | `true` | :x: | If true window scrollbar will be hidden when the container is maximized
__showExportExcel__ | `Boolean` | `true` | :x: | Show/hide export to excel button
__showExportImg__ | `Boolean` | `true` | :x: | Show/hide export to img button
__showExportPdf__ | `Boolean` | `true` | :x: | Show/hide export to pdf button

**Example:** 
```javascript
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

```
<br></br>


,## APP OBJECTS
### **RqtvCurrentSelections**



RqtvCurrentSelections

it is a toolbar that displays the current selection status and the buttons to go back, forward and clear current selections.
Clicking on the button displayin the number of current selections, a modal will appear showing the current selection box (fields and selected values)
It currently does not support alternate states. It always display the default state.
Styles can be customized via css (or scss)


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__alwaysShowToolbar__ | `Boolean` | `false` | :x: | if true the current selection toolbar is always shown even if no selection history exists (0 current, selection 0 back-count and 0 forward count)
__isResponsive__ | `Boolean` | `true` | :x: | when true it transform the toolbar into a fixed positioned floating button
__showModalToggler__ | `Boolean` | `true` | :x: | it allows to show/hide the modal toggler
__useCurrentSelectionModal__ | `Boolean` | `true` | :x: | it allows to turnoff the current selections box modal

**Example:** 
```javascript
import React from 'react'
import  {RqtvCurrentSelections} from '@reaqtive/components'

const MyRqtvCurrentSelections = props =>
    <RqtvCurrentSelections
      useCurrentSelectionModal={true}
      isResponsive={true}
      showModalToggler={true}
      alwayShowToolbar={true}
      hidePrefix={'%'}
    />

export default MyRqtvCurrentSelections

```
<br></br>



### **RqtvSearchObject**



RqtvSearchObject

It dispays a search object to search a single string in multiple fields.

If rendered inside the rqtv-navbar it will have fixed position and search results will colver the underlying page


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__alwaysExpanded__ | `Boolean` | `false` | :x: | If true the search input will always be displayed
__expandFrom__ | `Enum('right', 'left')` | `'left'` | :x: | The direction from which the input will expand if not always expanded
__onClose__ | `Function` |  | :x: | function fired after hiding the search input. (not called if alwaysExpanded is true)
__onOpen__ | `Function` |  | :x: | function fired after showing the search input. (not called if alwaysExpanded is true)
__searchFields__ | `Array` |  | :x: | the fields of the data model to search against
__width__ | `Union<String\|Number>` | `'100%'` | :x: | width of the component. It accept px or %
__width<1>__ | `String` |  | :x: | 
__width<2>__ | `Number` |  | :x: | 

**Example:** 
```javascript
import React from 'react'
import {RqtvSearchObject} from '@reaqtive/components'

const MyRqtvSearchObject =  props =>
   <RqtvSearchObject
      useBackdrop={false}
      alwaysExpanded={false}
      expandFrom='left'
      resultsWidth='100%'
      searchFields={[]}
      placeholder="Search"
    />

export default MyRqtvSearchObject

```
<br></br>



### **RqtvNavbar**



RqtvNavbar

It is a component that renders the top navbar of the reaqtive app. It is based on bootstrap navbar
Styles can be customized via css (or scss)


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__onToggleMenu__ | `Function` |  | :x: | function fired when clicking on the HamburgerMenu button
__showCurrentSelections__ | `Boolean` | `true` | :x: | show/hide the current selections toolbar
__showSideMenuToggle__ | `Boolean` | `true` | :x: | show/hide hamburger menu


<br></br>



### **RqtvSideMenu**



RqtvSideMenu

It returns toggleable fixed-positioned side menu displayed on the left of the page.
Default tabs are the list of pages of the app and a multibox with filters.
The open/close state has to be managed in parent component


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__additionalTabs__ | `Array[]<Shape>` |  | :x: | 
__additionalTabs[].icon__ | `ReactElement` |  | :x: | 
__additionalTabs[].label__ | `PropTypes.strig` |  | :x: | 
__additionalTabs[].tab__ | `ReactElement` |  | :x: | 
__isOpen__ | `Boolean` |  | :white_check_mark: | open/close the menu
__onClose__ | `Function` |  | :white_check_mark: | function to set isOpen to false
__useFieldList__ | `Boolean` | `true` | :x: | show hide the multibox
__usePageList__ | `Boolean` | `false` | :x: | show/hide the page list tab


<br></br>


,## APP
### **RqtvApp**



RqtvApp

It provides routing using react router and a context that allows you to store
app info to be available everywhere inside your app.


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__brand__ | `String` |  | :x: | the brand of the app displayed in the navbar. An image is expected: import it in the app and pass it as a prop
__brandStyle__ | `Object` |  | :x: | styles to be applied to the image container
__brandUrl__ | `String` |  | :x: | the url to redirect to when clicking on the brand
__hidePrefix__ | `String` | `'%'` | :x: | Prefix to hide a field in current selections modal. Hidden fields will be considered in selectins count and in back, forward actions
__searchFieldMatch__ | `Shape` | `{method:'include', mask:['**']}` | :x: | fields to be used in the search object in the navbar. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
__searchFieldMatch.mask__ | `Array[]<String>` |  | :x: | 
__searchFieldMatch.method__ | `Enum('include', 'exclude')` |  | :x: | 
__sideMenuFieldsMatch__ | `Shape` | `{method:'include', mask:['**']}` | :x: | fields to be displayed in the side menu. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
__sideMenuFieldsMatch.mask__ | `Array[]<String>` |  | :x: | 
__sideMenuFieldsMatch.method__ | `Enum('include', 'exclude')` |  | :x: | 
__title__ | `String` |  | :x: | the title of the app displayed in the navbar
__triggers__ | `Array[]<triggerType>` | `[]` | :x: | triggers to fire when opening the app (do not abuse triggers)
__useRouter__ | `Boolean` | `true` | :x: | if true the applicatin will be wrapped in react router and in a switch


<br></br>



### **RqtvPage**



RqtvPage

It is a container based on the Route component of the React Router.
It is a dummy component which provides a the RqtvPageContext and a QGenericObject with 2 experessions:
qTitleExpr --> providing the qTitle result
qConditionExpr --> providing the qCondition result
RqtvPage also accept triggers which are fired when the page mounts.
Like Routes RqtvPages can be nested. RqtvPage does not unMount when the route change.


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__exact__ | `Boolean` | `false` | :x: | shows the route only if the path match exactly with the addressbar. See the React Router docs for details
__fallbackPage__ | `String` |  | :x: | the page the user is redicrected to when the qConditionExpr returns false (0)
__linkName__ | `String` |  | :x: | the name of the page displayed in the side-menu of the app. If not set it will be equal to the path, replacing '-' with  ' '
__path__ | `String` |  | :white_check_mark: | the path to reach the page. See React Router for details
__qConditionExpr__ | `String` | `""` | :x: | a qlik espression that returns a value, used in combination with the fallback page prop, it redirects when false
__qTitleExpr__ | `String` | `"'My Reaqtive Page'"` | :x: | the expression that can be used to make the title dynamic as in Qlik Sense sheets
__triggers__ | `Array` | `[]` | :x: | triggers fired when the page is mounted see @reaqtive/q docs for details


<br></br>



### **RqtvStandardTemplate**



RqtvStandardTemplate

It is a component that allows you to use Reaqtive main components without having to declare them one by one.
Of course does not allow the same flexibility as recreating a template manually.
It includes the RqtvSideMenu, the RqtvNavbar and the RqtvPageHeader


**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__containerClassName__ | `String` |  | :x: | the css classes of the container wrapping the page
__containerStyle__ | `Object` |  | :x: | it allows to set the styles of the div conatining the page (the components you will develop)
__showSearch__ | `Boolean` | `true` | :x: | show/hide the search object in the navbar
__useContainerFluid__ | `Boolean` | `true` | :x: | it lets you choose between a bootstrap container or container-fluid to wrap the page
__usePageHeader__ | `Boolean` | `true` | :x: | show/hide the page header that would contain only the title of the page and can't be customized
__useSideMenu__ | `Boolean` | `true` | :x: | show/hide the side menu


<br></br>


,## STYLES
