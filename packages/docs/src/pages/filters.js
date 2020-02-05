import React from 'react'
import {
  RqtvListbox,
  RqtvDropdownFilter,
  RqtvSearchField,
  RqtvModalListbox,
  RqtvButtonBar,
  RqtvMultibox,
  RqtvPageHeader
} from '@reaqtive/components'
import {QVariable} from '@reaqtive/q'
import {Section, Example} from '../app-components/index'

const examples = {
  rqtvListbox:`
    // You do not have to right not required props unless you do not want to change the default value (is the one shown below)
    <RqtvListbox
      qFieldExpr='Customer'                 //required prop
      qId={filter-customer-listbox-1}
      qLabelExpr={\`=if(count(distinct Customer)=1, only(Customer), count(distinct Customer))\`}
      height={400}
      title='Customer'
      qSortObject={{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }},
      showHeader={true}
      showHeaderButtonbar={false}
      showListboxDropdownMenu={true}
      alwaysShowSearch={false}
      headerStyle={{}}
      titleStyle={{}}
      listStyle={}
      itemStyle={}
      alwaysOneSelected={false}            //could fail depending on the selections status, usage of triggers is suggested
      defaultValue={null}                  //if not set when alaway one selected is true will pick the first value (in load order)
      toggle={true}
      quickSelectMode={false}
      onSelect={()=>true}
      onBeginSelections={()=>true}
      onEndSelections={()=>true}
    />`,
  rqtvDropdownFilter:`
    // You do not have to right not required props unless you do not want to change the default value (is the one shown below)
    <RqtvDropdownFilter
      qFieldExpr='Line Desc 1'    //required prop
      quickSelectMode={false}
      qLabelExpr={\`
        'Line Desc 1 '&if(getSelectedCount([Line Desc 1])>0,
            if(count(distinct [Line Desc 1])=1 and getSelectedCount([Line Desc 1])=1,
            only([Line Desc 1]),
            getSelectedCount([Line Desc 1])&' selected'
          )
        )
      \`}                             //default label expression: it is not necessary to set this prop
      showSearch={true}
      qId={'Line_Desc_1-filters'}
      qSortObject={{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }},
      dropdownMenuHeight={300}
      showCaret={true}
      buttonColor='primary'
      buttonFontColor='light'
      buttonStyle={{}}
      dropdownMenuStyle={{}}
      dropdownMenuItemStyle={{}}
      alwaysOneSelected={false}            //could fail depending on the selections status, usage of triggers is suggested
      defaultValue={null}                  //if not set when alaway one selected is true will pick the first value (in load order)
      toggle={true}
      quickSelectMode={false}
      onSelect={()=>true}
      onBeginSelections={()=>true}
      onEndSelections={()=>true}
    />
  `,
  rqtvButtonBar:`
    // You do not have to right not required props unless you do not want to change the default value
    <div>
      <RqtvButtonBar
        qFieldExpr='Product Type Desc' //required prop
        qSortObject={{qSortByState:1}} // default value is: qSortObject:{ qSortByState: 0, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 1, qSortByLoadOrder: 0, qSortByExpression: 0 },
        buttonSize:'btn-sm',
        qDataPageHeight:5
      />
    </div>
  `,
  rqtvModalListbox:`
    <RqtvModalListbox
      listboxProps={{qFieldExpr:'SegmentDesc'}} //support all RqtvListbox props
      qLabelExpr={\`
        'SegmentDesc '&if(getSelectedCount([SegmentDesc])>0,
            if(count(distinct [SegmentDesc])=1 and getSelectedCount([SegmentDesc])=1,
            only([SegmentDesc]),
            getSelectedCount([SegmentDesc])&' selected'
          )
        )
      \`}                             //default label expression for the button: it is not necessary to set this prop
    />
  `,
  rqtvMultibox:`
    // you can provide an array of fieldExpr
    <RqtvMultibox fieldList={['Customer', 'Product Type Desc']}/>
  `,
  rqtvSearchField:`
    //accept a subset of RqtvDropdownFilter props
    <RqtvSearchField
      qFieldExpr='Line Desc 1'    //required prop
      quickSelectMode={false}
      qId={'Line_Desc_1-filters'}
      qSortObject={{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }},
      dropdownMenuHeight={300}
      dropdownMenuStyle={{}}
      dropdownMenuItemStyle={{}}
      quickSelectMode={false}
      onSelect={()=>true}
      onBeginSelections={()=>true}
      onEndSelections={()=>true}
    />
  `
}

const Filters = props =>
<>
  <QVariable>
    <div>AZZ</div>
  </QVariable>
  <Section title='RqtvListbox'>
    <Example codeString={examples['rqtvListbox']}>
      <RqtvListbox qFieldExpr='Customer' qLabelExpr={`=if(count(distinct Customer)=1, only(Customer), count(distinct Customer)) `} height={400}/>
    </Example>
  </Section>
  <Section title="RqtvDropdownFilter">
    <Example codeString={examples['rqtvDropdownFilter']}>
      <RqtvDropdownFilter qFieldExpr='Line Desc 1' quickSelectMode={false} showSearch={true} qId={2} qLabelExpr={`'Line Desc 1 '&if(getSelectedCount([Line Desc 1])>0,
        if(count(distinct [Line Desc 1])=1 and getSelectedCount([Line Desc 1])=1,
          only([Line Desc 1]),
          getSelectedCount([Line Desc 1])&' selected'
        )
      )`}/>
    </Example>
  </Section>
  <Section title="RqtvButtonBar">
    <Example codeString={examples['rqtvButtonBar']}>
      <div>
        <RqtvButtonBar qFieldExpr='Product Type Desc' qSortObject={{qSortByState:1}}/>
      </div>
    </Example>
  </Section>
  <Section>
    <Example codeString={examples['rqtvModalListbox']}>
      <RqtvModalListbox listboxProps={{qFieldExpr:'SegmentDesc'}}/>
    </Example>
  </Section>
  <Section title="RqtvMultibox">
    <Example codeString={examples['rqtvMultibox']}>
      <RqtvMultibox fieldList={['Customer', 'Product Type Desc']}/>
    </Example>
  </Section>
  <Section title="RqtvSearchField" style={{marginBottom:'300px'}}>
    <Example codeString={examples['rqtvSearchField']} >
      <RqtvSearchField qFieldExpr='Product Type Desc' alwaysShowSearch={true}/>
    </Example>
  </Section>
</>
export default Filters
