import React, {useMemo} from 'react'
import { QGenericObject } from '@reaqtive/q'
import useOverviewObjectDef from '../use-overview-object-def'


const CountryCardDeck = props => {
  const  {marketArea} = props
  const marketAreaDeckObjectDef = useOverviewObjectDef(marketArea)
  return(
    <div>
      <QGenericObject qObjectDef={marketAreaDeckObjectDef}>
        <Layout/>
      </QGenericObject>
    </div>
  )
}

const Layout = props => {
  console.log(props)
  return <></>
}

export default CountryCardDeck
