import React from 'react'
import {RqtvBreadcrumb} from '@reaqtive/components'
import OverviewHeader from './overview-header'
import useOverviewCardDef from './use-overview-card-def'
import FieldSection from '../../components/field-section'
import {RqtvCards} from '../../components/card/index'

const marketAreasObjectDef = {
  qInfo:{
    qType:"tableData"
  },
  brandJSON:{
    qStringExpression:{
      qExpr:`concat(distinct '{"description":"'&[Market Area]&'"}', '|')`
    }
  }
}

const OverviewByCountry = props => {
  return(
    <>
      <OverviewHeader/>
      <RqtvBreadcrumb/>
      <FieldSection qObjectDef={marketAreasObjectDef}>
        {(marketArea) => <Layout key={marketArea.description} {...marketArea}/>}
      </FieldSection>
    </>
  )
}

const Layout = props => {
  const {description} = props
  const qObjectDef=useOverviewCardDef('market area', description)
  const gradient = 'linear-gradient(120deg, rgba(240,240,240,1) 0%, rgba(220,220,220,1) 40%, rgba(220,220,220,1) 60%, rgba(240,240,240,1) 100%)'
  return (
    <RqtvCards
      deckProps={{
        minDeckHeight:420,
        gradient:gradient,
        showHeader:true,
        title:description
      }}
      cardProps={{
        bodyRowLink:'/detail',
        displayGradient:false,
        width:270,
        flexItem:true,
        showAvatar:true,
        rowSelectionField:'Submodel Benchmark',
        cardSelectionField:'Country'
      }}
      cardObjectDef={qObjectDef}
    />
  )
}

export default OverviewByCountry
