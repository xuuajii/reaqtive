import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import { RqtvPage, RqtvStandardTemplate } from '@reaqtive/components'
import LtrOverview from './ltr-overview'
import LtrDetail from './ltr-detail'

const Ltr = props => {
  const match = useRouteMatch()
  return(
    <>
      <LtrDetail path={match.path + "/detail"} fallbackPage={match.path}/>
      <LtrOverview path={match.path}/>
    </>
  )
}

export default Ltr
