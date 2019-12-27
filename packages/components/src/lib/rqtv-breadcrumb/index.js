//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {useLocation, useHistory} from 'react-router-dom'
import {Breadcrumb, BreadcrumbItem} from '@reaqtive/layout'

const RqtvBreadcrumb = props =>{
  const location = useLocation()
  const history = useHistory()

  const goToPage = (page) => {
    history.push('/'+page)
  }

  const crumbs = location.pathname.endsWith('/')?location.pathname.slice(0, location.pathname.length-1).replace('//','/').split('/'):location.pathname.split('/')
  //console.log(crumbs)
  const checkIsActive = (crumb) => crumb===crumbs[crumbs.length-1]?true:false

  return(
    <Breadcrumb>
      {crumbs.map((crumb, index)=>
        <BreadcrumbItem
          key={index}
          label={crumb===''?props.homeLabel:props.pathnameBeautifier(crumb)}
          action={checkIsActive(crumb)?()=>false:()=>goToPage(crumb)}
          isActive={checkIsActive(crumb)}
        />
      )}
    </Breadcrumb>
  )
}

RqtvBreadcrumb.propTypes={
  homeLabel:PropTypes.string,
  pathnameBeautifier:PropTypes.func
}

RqtvBreadcrumb.defaultProps={
  homeLabel:'home',
  pathnameBeautifier:(pathname)=>pathname
}

export {RqtvBreadcrumb}
