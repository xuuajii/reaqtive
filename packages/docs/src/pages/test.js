//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'
import {useQObjectReducer, useQLayoutReducer, QGenericObject, QListObject} from '@reaqtive/q'
import { Button } from '@reaqtive/layout'
import { RqtvPageHeader } from '@reaqtive/components'
import {useOutsideEventListener} from '@reaqtive/layout'
import {RqtvListbox, RqtvDropdownFilter, RqtvSearchField} from '../example-components/filters/index'

const Test = props =>{
  const [mounted, setMounted] = useState(true)
  return(
    <div>
      <RqtvPageHeader>
        <div>
          <Button className="btn-primary" onClick={()=>setMounted(true)}>
            MOUNT
          </Button>
          <Button className="btn-primary" onClick={()=>setMounted(false)}>
            UNMOUNT
          </Button>
        </div>
      </RqtvPageHeader>
      <div style={{marginTop:20, marginBottom:20}}>
      {
        mounted&&
        <RqtvListbox
          qFieldExpr="Customer"
          qId="1"
          Key="1"
        />
      }
      </div>
      <br></br>
      <RqtvDropdownFilter
        qFieldExpr='Line Desc 1'
        hideHorizontalScrollbar={true}
        quickSelectionMode={true}
        qId="2"
        Key="2"
      />
      <br></br>
      <RqtvSearchField
        qFieldExpr="Sales Rep Name"
        qId="2"
        Key="2"
      />
      <RqtvListbox
        qFieldExpr="Line Desc 1"
        qId="3"
        Key="3"
      />
    </div>
  )
}

export default Test
