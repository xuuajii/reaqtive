import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import {RqtvPage, RqtvStandardTemplate} from '@reaqtive/components'
import PurchasingOverview from './purchasing-overview'
import PurchasingDetail from './purchasing-detail'
import {Footer} from '../../components/index'
const Purchasing = props => {
  const match = useRouteMatch()
  return(
    <>
      <PurchasingDetail path={match.path+'/detail'} fallbackPage={match.path}/>
      <PurchasingOverview path={match.path} />
      <Footer/>
    </>
  )
}

export default Purchasing
