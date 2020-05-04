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
