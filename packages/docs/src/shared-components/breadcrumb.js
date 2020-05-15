import React from 'react'
import {RqtvBreadcrumb} from '@reaqtive/components'

const Breadcrumb = props => {
  const pathnameBeautifier = (path) => path.replace(/-/g, " ");
  return <RqtvBreadcrumb pathnameBeautifier={pathnameBeautifier}/>
}

export default Breadcrumb
