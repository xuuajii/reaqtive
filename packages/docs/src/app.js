import React from 'react'
import {QShareCapabilityApi} from '@reaqtive/q'
import ReaqtiveExample from './examples/q/index'
import FirstApp from './examples/first-app'
import {MyComponentWithQGlobal, MyComponentWithQDoc, MyComponentWithQCapabilityApi, MyComponentWithQApp, MyQGenericObject, MyQVariable} from './examples/q/index'
import {MyRqtvNavbar, MyRqtvListbox, MyRqtvDropdownFilter, MyRqtvButtonBar, MyRqtvModalListbox, MyRqtvSearchField, MyRqtvMultibox, MyQVizExamples, MyRqtvContainerExample,MyRqtvCurrentSelections, MyRqtvSearchObject} from './examples/components/index'

const Example = props =>
  <ReaqtiveExample>
    {/*
      Inside Reaqtive children you will have access to the contexts it provides.
      You can use them individually or combine them in your components

    <MyComponentWithQGlobal/>
    <MyComponentWithQDoc/>
    <MyComponentWithQCapabilityApi/>
    <MyComponentWithQApp/>
    <MyQGenericObject/>
    <MyQVariable/>
    <MyRqtvListbox/>
    <MyRqtvModalListbox/>
    <MyRqtvSearchField/>
    <MyRqtvListbox/>
    <MyRqtvMultibox/>
    <MyRqtvContainerExample/>
    <MyRqtvCurrentSelections/>
    <MyRqtvSearchObject/>
    <Wrapper>
      <MyQVizExamples/>
    </Wrapper>
    <Wrapper>
      <MyRqtvSearchObject/>
    </Wrapper>
    <Wrapper>
      <MyRqtvListbox/>
    </Wrapper>
    <Wrapper>
      <MyRqtvDropdownFilter/>
    </Wrapper>
    <Wrapper>
      <MyRqtvSearchField/>
    </Wrapper>
    <MyRqtvNavbar/>
    */}
    <Wrapper>
      <MyQVizExamples/>
    </Wrapper>
    <Wrapper>
    <MyRqtvSearchObject/>
    </Wrapper>
    <Wrapper>
      <MyRqtvDropdownFilter/>
    </Wrapper>
    <Wrapper>
      <MyRqtvListbox/>
    </Wrapper>
    <Wrapper>
      <MyRqtvNavbar/>
    </Wrapper>
  </ReaqtiveExample>

const Wrapper = props => <div style={{marginBottom:'2rem'}}>{props.children}</div>

export default Example
