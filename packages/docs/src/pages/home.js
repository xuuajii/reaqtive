//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useRef, useContext} from 'react'
import {RqtvPageHeader,Section} from '../example-components/index'
import {NavLink} from 'react-router-dom'
import {RqtvAppContext} from '@reaqtive/components'



const Home = (props) =>{
  const rqtvApp = useContext(RqtvAppContext)
  const maximizeElRef=useRef()
  return(
    rqtvApp&&
    <>
      <Section>
        <ul className="list-group">
          {rqtvApp.pages.map(page=>
            page.path!=='/'&&
            <li className="list-group-item" key={page.id}>
              <NavLink to={page.path}>
                {page.title}
              </NavLink>
            </li>
          )}
        </ul>
      </Section>
    </>
  )
}
export default Home
// <li className="list-group-item">
//   <NavLink to="/filters">
//     Filters
//   </NavLink>
// </li>
// <li className="list-group-item">
//   <NavLink to="/visualizations">
//     Visualizations
//   </NavLink>
// </li>
// <li className="list-group-item">
//   <NavLink to="/app_objects">
//     App Objects
//   </NavLink>
// </li>
// <li className="list-group-item">
//   <NavLink to="blank_template">
//     Blank Template
//   </NavLink>
// </li>
