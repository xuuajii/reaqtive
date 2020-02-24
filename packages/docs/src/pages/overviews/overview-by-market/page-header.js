import React, {useContext} from 'react'
import { RqtvPageContext, RqtvPageHeader } from '@reaqtive/components'

const PageHeader = props => {
  const rqtvPageContext = useContext(RqtvPageContext)

  const title = rqtvPageContext.qTitle||props.fallbackTitle
  return <RqtvPageHeader title={title} />
}

export default PageHeader
