# **@reaqtive/components**

This package helps creating guided analytics using Qlik APIs. It provides a set of reusable react components to speed up mash up developments.
You can choose to use stand alone components and build your own navigation and routing functionalities or you can use [RqtvApp](#rqtvapp) and [RqtvPage](#rqtvpage) for built-in page navigation functionalities.



#### Installation

```
npm install @reaqtive/components
```

[@reaqtive/q](https://github.com/xuuajii/reaqtive/tree/master/packages/q) will be installed as well, since @reaqtive/components depends on it. [@reaqtive/q](https://github.com/xuuajii/reaqtive/tree/master/packages/q)  will help you interact with Qlik engine and Qlik Capability APIs

### PROVIDED FEATURES
- [FILTERS](#filters) </br>
- [VISUALIZATIONS](#visualizations) </br>
- [APP OBJECTS](#app-objects) </br>
- [APP](#app) </br>
- [TRIGGERS](#triggers) </br>
- [STYLES](#styles) </br>

## FILTERS
### **RqtvButtonBar**



RqtvButtonBar
it is a paginated listbox shaped as a buttonbar
It does not ask for selection confirmation, but just toggle the selection when a button is clicked

You can twek its behavuiour using props.

You can customize its styles using css or using props.


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

<br></br>



### **RqtvDropdownFilter**



RqtvDropdownFilter
It is a listbox shaped as a dropdown.
It has the same responsive behaviour as bootstrap dropdown when wrapped in a collapse

You can twek its behavuiour using props.

You can customize its styles using css or using props.


**Example:** 
```javascript
import React from 'react'
import {RqtvDropdownFilter} from '@reaqtive/components'

const MyRqtvDropdownFilter = props =>
<RqtvDropdownFilter
  qFieldExpr="Customer"
  dropdownMenuItemStyle={{textTransform:'uppercase'}}
/>

export default MyRqtvDropdownFilter

```
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

<br></br>



### **RqtvListbox**



RqtvListbox
It looks like a Qlik Sense listbox, but is always expanded (does'not turn into a drop down).
It will fill its container width

You can twek its behavuiour using props.

You can customize its styles using css or using props.


**Example:** 
```javascript
import React from 'react'
import {RqtvListbox} from '@reaqtive/components'

const MyRqtvListbox = props => {
  return(
    <RqtvListbox
      qFieldExpr="Customer"
      qLabelExpr="=count(distinct Customer)"
      height={300}
    />
  )
}

export default MyRqtvListbox

```
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

<br></br>



### **RqtvModalListbox**



RqtvModalListbox
It allows you to wrap a listbox inside a modal: the listbox will be hidden and a button will be shown.
Clicking the button the listbox will appear inside a modal


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
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__buttonClassName__ | `String` | `'primary text-light'` | :x: | className for the dropdown button
__buttonStyle__ | `Object` | `{}` | :x: | style object to customize the dropdown button
__listboxProps__ | `Object` |  | :x: | the props which will be passed to the listbox
__qLabelExpr__ | `String` |  | :x: | The expression used in the listbox title and in the button that toggles the listbox

<br></br>



### **RqtvSearchField**



RqtvSearchField
It provides you an input field to search a listbox.
When the user starts typing a dropdown menu appears under the input field.

You can tweak its behaviour using props

You can customize style using props and css


**Example:** 
```javascript
import React from 'react'
import {RqtvSearchField} from '@reaqtive/components'

const MyRqtvSearchField = props =>
<RqtvSearchField
  qFieldExpr="Customer"
  placeholder="Search"
/>
export default MyRqtvSearchField

```
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

<br></br>



### **RqtvMultibox**



RqtvMultibox

It returns an accordion that shows a list of fields.
A listbox is displayed for the active field. One field at a time can be active.


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
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__fieldHeight__ | `Number` | `300` | :x: | The height of the listbox of the active field
__fieldList__ | `Array` |  | :white_check_mark: | An array of fieldnames which will be displayed in the multibox

<br></br>



## VISUALIZATIONS
### **QViz**



QViz

It is a component that allows to retrieve Qlik visualizations.
Qlik visualizations can be retrieved by id (if they already exists in the Qlik Sense app) or
they can be created on the fly providing the properties to the engine.
QViz also provide an imperative handle to inteact with Qlik visualizazion.
To access the handle you have to provide a handle to the QViz component


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
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__chartProps__ | `Object` |  | :x: | the properties of the object to be created on the fly chartProps must be passed as: {'chartType':'string', 'columns':'array', 'rest':'object'} see this link for details https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm
__id__ | `String` |  | :white_check_mark: | the id of the visualization to be retrieved and of the div that will contain it
__showTitle__ | `Boolean` | `false` | :x: | show/hide the title in Qlik visualization

<br></br>



### **RqtvVizContainer**



RqtvVizContainer

It provides a container to a visualization. It accepts multiple children. In case i detects more tha one child,
it shows one child at a time and a dropdown menu to toggle the desired child.
If its children provide exports methods it automatically shows export buttons


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

<br></br>



## APP OBJECTS
### **RqtvCurrentSelections**



RqtvCurrentSelections

it is a toolbar that displays the current selection status and the buttons to go back, forward and clear current selections.
Clicking on the button displayin the number of current selections, a modal will appear showing the current selection box (fields and selected values)
It currently does not support alternate states. It always display the default state.
Styles can be customized via css (or scss)


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
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__alwaysShowToolbar__ | `Boolean` | `false` | :x: | if true the current selection toolbar is always shown even if no selection history exists (0 current, selection 0 back-count and 0 forward count)
__isResponsive__ | `Boolean` | `true` | :x: | when true it transform the toolbar into a fixed positioned floating button
__showModalToggler__ | `Boolean` | `true` | :x: | it allows to show/hide the modal toggler
__useCurrentSelectionModal__ | `Boolean` | `true` | :x: | it allows to turnoff the current selections box modal

<br></br>



### **RqtvSearchObject**



RqtvSearchObject

It dispays a search object to search a single string in multiple fields.

If rendered inside the rqtv-navbar it will have fixed position and search results will colver the underlying page


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
      placeholder="Search"
    />

export default MyRqtvSearchObject

```
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

<br></br>



### **RqtvNavbar**



RqtvNavbar

It is a component that renders the top navbar of the reaqtive app and add spacing to the top of the page if the navbar is fixed top.
It includes the [RqtvCurrentSelections](#rqtvcurrentselections) component and the [RqtvSearchObject](#rqtvsearchobject) component.
It is based on bootstrap navbar, its styles can be customized using navbarClassName prop which will be passed to the navbar itself or via sass/css


**Example:** 
```javascript
import React from 'react'
import {RqtvNavbar} from '@reaqtive/components'

const MyRqtvNavbar = props => {
  return(
  <>
    <div className="border border-primary">
      <RqtvNavbar
        showSideMenuToggle={false}
        title="RqtvNavbar"
        fixedTop={false}
      />
      <div className="container py-5">
        <p>Below your content</p>
      </div>
    </div>
  </>
  )

}

export default MyRqtvNavbar

```
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__brandImgStyle__ | `Object` |  | :x: | 
__brandImgUrl__ | `String` |  | :x: | 
__brandUrl__ | `String` |  | :x: | 
__fixedTop__ | `Boolean` | `true` | :x: | if true the navbar would be fix positioned at the top of the page
__navbarClassName__ | `String` | `''` | :x: | css classes that will be passed to the navbar div
__onToggleMenu__ | `Function` |  | :x: | function fired when clicking on the HamburgerMenu button
__searchResultsHeight__ | `Union<String\|Number>` | `500` | :x: | 
__searchResultsHeight<1>__ | `String` |  | :x: | 
__searchResultsHeight<2>__ | `Number` |  | :x: | 
__showCurrentSelections__ | `Boolean` | `true` | :x: | show/hide the current selections toolbar
__showSearch__ | `Boolean` | `true` | :x: | show/hide the global search-object
__showSideMenuToggle__ | `Boolean` | `true` | :x: | show/hide hamburger menu

<br></br>



### **RqtvSideMenu**



RqtvSideMenu

It returns toggleable fixed-positioned side menu displayed on the left of the page.
Default tabs are the list of pages of the app and a multibox with filters.
The open/close state has to be managed in parent component


**Example:** 
```javascript
import React, {useState} from 'react'
import {RqtvSideMenu, RqtvSideMenuMain} from '@reaqtive/components'

const MyRqtvSideMenu = props => {
  const [open, setOpen] = useState(false)

  const toggleSideMenu = () => {
    setOpen(!open)
  }

  const closeSideMenu = () => {
    setOpen(false)
  }

  return(
    <div style={{position:'relative'}}>
      <RqtvSideMenu
        isOpen={open}
        onClose={closeSideMenu}
      >
        <div className="text-light text-center">Here you can display your content</div>
      </RqtvSideMenu>
      <RqtvSideMenuMain isOpen={open}>
        <div className="container-fluid border border-primary">
          <div className="my-2">
            <button className="btn btn-primary" onClick={toggleSideMenu}>Toggle Menu</button>
          </div>
          <div className="py-2">Your content Here</div>
        </div>
      </RqtvSideMenuMain>
    </div>
  )
}

export default MyRqtvSideMenu

```
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__additionalTabs__ | `Array[]<Shape>` |  | :x: | additional tabs to display after pages and filters
__additionalTabs[].icon__ | `ReactElement` |  | :x: | 
__additionalTabs[].label__ | `String` |  | :x: | 
__additionalTabs[].tab__ | `ReactElement` |  | :x: | 
__alwaysShowBackdrop__ | `Boolean` | `false` | :x: | if tru backdrop is always shown when RqtvSideMenu is open
__isOpen__ | `Boolean` |  | :white_check_mark: | open/close the menu
__onClose__ | `Function` |  | :white_check_mark: | function to set isOpen to false
__useFieldList__ | `Boolean` | `false` | :x: | show hide the multibox
__usePageList__ | `Boolean` | `false` | :x: | show/hide the page list tab
__useTabs__ | `Boolean` | `false` | :x: | if true it uses the the tabs to display different views in the side menu, if false it just shows its children

<br></br>



## APP
Components described in this section are supposed to work together: it is suggested to use RqtvApp if you want to use the other components describe here.

### **RqtvApp**



RqtvApp

It provides routing using react router and a context that allows you to store
app info to be available everywhere inside your app.


**Example:** 
```javascript
import React from 'react'
import {RqtvApp} from '@reaqtive/components'
import {HomePage, FirstPage, SecondPage} from './rqtv-page'

const MyRqtvApp = (props) => {
  return(
    <RqtvApp title="Example App" >
        <FirstPage path="/first-page"/>
        <SecondPage path="/second-page"/>
        <HomePage path="/" linkName="HOME"/>
    </RqtvApp>
  )
}

export default MyRqtvApp

```
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__brand__ | `String` |  | :x: | the brand of the app displayed in the navbar. An image is expected: import it in the app and pass it as a prop
__brandStyle__ | `Object` |  | :x: | styles to be applied to the image container
__brandUrl__ | `String` |  | :x: | the url to redirect to when clicking on the brand
__hidePrefix__ | `String` | `'%'` | :x: | Prefix to hide a field in current selections modal. Hidden fields will be considered in selectins count and in back, forward actions
__neverToggleFieldsMatch__ | `Shape` |  | :x: | matching fields will have toggle set to false and quickSelectionMode set to true in when appearing in side menu and in current selections box.
__neverToggleFieldsMatch.mask__ | `Array[]<String>` |  | :x: | 
__neverToggleFieldsMatch.method__ | `Enum('include', 'exclude')` |  | :x: | 
__pages__ | `Array[]<Shape>` |  | :x: | 
__pages[].exactActiveMatch__ | `Boolean` |  | :x: | 
__pages[].linkName__ | `String` |  | :x: | 
__pages[].path__ | `PropTypes.path` |  | :x: | 
__searchFieldsMatch__ | `Shape` | `{method:'exclude', mask:['**']}` | :x: | fields to be used in the search object in the navbar. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
__searchFieldsMatch.mask__ | `Array[]<String>` |  | :x: | 
__searchFieldsMatch.method__ | `Enum('include', 'exclude')` |  | :x: | 
__sideMenuFieldsMatch__ | `Shape` | `{method:'include', mask:['**']}` | :x: | fields to be displayed in the side menu. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
__sideMenuFieldsMatch.mask__ | `Array[]<String>` |  | :x: | 
__sideMenuFieldsMatch.method__ | `Enum('include', 'exclude')` |  | :x: | 
__title__ | `String` |  | :x: | the title of the app displayed in the navbar
__triggers__ | `Array[]<triggerType>` | `[]` | :x: | triggers to fire when opening the app (do not abuse triggers)
__useRouter__ | `Boolean` | `true` | :x: | if true the applicatin will be wrapped in react router and in a switch

<br></br>



### **RqtvPage**



RqtvPage

It is a container based on the Route component of the React Router. It can't be used outside RqtvApp.
It is a dummy component which provides a the RqtvPageContext and a QGenericObject with 2 experessions:
qTitleExpr --> providing the qTitle result
qConditionExpr --> providing the qCondition result
When navigating among RqtvPages you can use query strings to select values in fields. Here an example of a query string: ?selections=Customer:Benedict;Zocalo&selections=Account:61099 . Place your query string at the end of the url you are navigating to.
RqtvPage also accept triggers which are fired when the page mounts.
Like Routes RqtvPages can be nested. RqtvPage does not unMount when the route change, to force unmount add a key prop (it has to be unique among pages).


**Example:** 
```javascript
import React from 'react'
import {RqtvStandardTemplate, RqtvPage, RqtvDropdownFilter} from '@reaqtive/components'
import {useRouteMatch, NavLink} from 'react-router-dom'
import MyRqtvStandardTemplate from './rqtv-standard-template'
import MyRqtvContainerExample from './rqtv-viz-container'
const HomePage = props =>
<RqtvPage {...props} exact={true} qTitleExpr="'Homepage'">
  <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Product*']}}>
    <div>Home Page</div>
    <MyRqtvContainerExample/>
  </RqtvStandardTemplate>
</RqtvPage>

const FirstPage = props =>{
  return(
    <RqtvPage {...props}>
      <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Customer*', 'Account*']}}>
        <MyFirstNestedPage/>
      </RqtvStandardTemplate>
    </RqtvPage>
  )
}


const MyFirstNestedPage = props =>{
  const { path, url } = useRouteMatch();
  return(
    <>
      <RqtvPage
        path={`${path}/with-condition`}
        qConditionExpr={'=count(distinct Customer)=1'}
        fallbackPage={`${path}`}
      >
        <div>this is a nested page with a condition</div>
        <MyRqtvContainerExample/>
      </RqtvPage>
      <RqtvPage path={`${path}`} exact={true}>
        <div>this is a nested page with no condition</div>
        <div>
          <NavLink to={`${url}/with-condition/?selections=Customer:Benedict&selections=Account:61099`}><button>go to page with condition</button></NavLink>
          <MyRqtvContainerExample/>
        </div>
      </RqtvPage>
    </>
  )
}

const SecondPage = props =>
<RqtvPage {...props} qTitleExpr="'Revenue is: '&Sum([Sales Quantity]*[Sales Price])" exactActiveMatch={false}>
  <MyRqtvStandardTemplate/>
</RqtvPage>

export {HomePage, FirstPage, SecondPage}

```
**Props**: 

  prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
__exact__ | `Boolean` | `false` | :x: | shows the route only if the path match exactly with the addressbar. See the React Router docs for details
__fallbackPage__ | `String` |  | :x: | the page the user is redicrected to when the qConditionExpr returns false (0)
__linkName__ | `String` |  | :x: | the name of the page displayed in the side-menu of the app. If not set it will be equal to the path, replacing '-' with  ' '
__loadingComponent__ | `ReactElement` |  | :x: | the component displayed while triggers fired
__path__ | `String` |  | :white_check_mark: | the path to reach the page. See React Router for details
__qConditionExpr__ | `String` | `""` | :x: | a qlik espression that returns a value, used in combination with the fallback page prop, it redirects when false
__qTitleExpr__ | `String` | `"'My Reaqtive Page'"` | :x: | the expression that can be used to make the title dynamic as in Qlik Sense sheets
__triggers__ | `Array` | `[]` | :x: | triggers fired when the page is mounted see @reaqtive/q docs for details

<br></br>



### **RqtvStandardTemplate**



RqtvStandardTemplate

It is a component that allows you to use Reaqtive main components without having to declare them one by one.
Of course does not allow the same flexibility as recreating a template manually.
It includes the RqtvSideMenu, the RqtvNavbar and the RqtvPageHeader.
It is suggested to use this component inside the RqtvApp


**Example:** 
```javascript
import React from 'react'
import {RqtvStandardTemplate, RqtvPage} from '@reaqtive/components'


const MyRqtvStandardTemplate = props => {
  return(
    <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Customer*', 'Account*']}}>
      <div>Standard Template Example</div>
    </RqtvStandardTemplate>
  )
}

export default MyRqtvStandardTemplate

```
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



## TRIGGERS
RqtvApp and RqtvPage accept arrays of triggers as props. They are fired before rendering the app or the page. This is still an experimental feature, but data structures are very unlikely to change. Below you can find the types of triggers you can use described as PropTypes

```javascript

/*Select one value of one field*/
const fieldSelectionTrigger = PropTypes.shape({
    type: 'fieldSelection',
    params: PropTypes.shape({
      fieldName:PropTypes.string,
      value:PropTypes.string,
    })
  })

/*Select multiple values of one field*/
const fieldSelectionsTrigger = PropTypes.shape({
  type: 'fieldSelections',
  params: PropTypes.shape({
    fieldName:PropTypes.string,
    value:PropTypes.arrayOf(PropTypes.shape({
      qText: PropTypes.string,
      qIsNumeric: PropTypes.bool,
      qNumber: PropTypes.number
    })),
  })
})

/*Clear one field*/
const clearFieldTrigger =  PropTypes.shape({
  type: 'clearField',
  params: PropTypes.shape({
    fieldName:PropTypes.string,
  })
})

const triggerType = PropTypes.oneOf([clearFieldTrigger,fieldSelectionsTrigger,fieldSelectionTrigger])

```


## STYLES
Styles are based on bootstrap classes and components.
In reaqtive components plain boostrap classes have been used and they are scoped using the name of the Reaqtive components they are used into. For example the wrapper div of a RqtvListbox has rqtv-listbox class, the RqtvSideMenu a rqtv-side-menu class.
You can customize the styles the components referring to these classes in your scss files.
Moreover you can customize Reaqtive theme by including a theme file and changing theme variables values. You can add your theme creating an index.scss file and a theme.scss file. Below an example.

*theme.scss*
```sass
...
$primary: #5C88DA;
$side-menu-field-list-border-color:rgba(0,0,0,0);
$navbar-bg:#fff;
$navbar-color:$primary;
...
```


*index.scss*
```sass
// import files with this order otherwise Reaqtive theme will overwrite yours
@import "./styles/theme.scss";
@import "~@reaqtive/components/dist/index.scss";
...
```

*index.js*
```javascript
...
import './index.scss'
...
```

You can find the complete list of Reaqtive theme variable [here](#https://github.com/taan11/reaqtive/blob/master/packages/components/src/lib/styles/theme.scss) and the complete list of Bootstrap variables [here](#https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss)


