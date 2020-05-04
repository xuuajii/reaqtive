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
