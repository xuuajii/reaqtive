import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import { RqtvPage, RqtvStandardTemplate } from '@reaqtive/components'
import LtrOverview from './ltr-overview'
import LtrDetail from './ltr-detail'
import {Footer} from '../../components/index'

const Ltr = props => {
  const match = useRouteMatch()
  return(
    <div className="ltr">
      <LtrDetail path={match.path + "/detail"} fallbackPage={match.path}/>
      <LtrOverview path={match.path}/>
      <Footer/>
    </div>
  )
}

export default Ltr
