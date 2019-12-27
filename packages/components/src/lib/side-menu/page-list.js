//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import {NavLink, useHistory, } from 'react-router-dom'
//import {useHistory} from 'react-router'
import {LuiIcon} from '@reaqtive/layout'
import {SideMenuContext} from '@reaqtive/layout'

const PageList = props => {
  return(
    <ul className="list-group page-list">
      {props.pages.map(page => <PageLink key={page.id} page={page}/>)}
    </ul>
  )
}

const PageLink = props => {
  const sideMenuContext = useContext(SideMenuContext)
  const { page } = props

  const handleClick = () => {
    if(sideMenuContext.config.staticMain===true){
        sideMenuContext.closeSideMenu()
      }
  }
  return(
    <NavLink to={page.path} activeClassName="active" exact={true}>
    <li className="list-group-item" onClick={handleClick}>
        { page.path==='/'
          ?<LuiIcon iconType="home" style={{marginRight:'0.5rem'}}/>
          :<LuiIcon iconType="sheet" style={{marginRight:'0.5rem'}}/>
        }
        {page.title}
    </li>
    </NavLink>
  )
}

export default PageList
