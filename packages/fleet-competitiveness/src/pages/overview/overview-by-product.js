import React from 'react'
import OverviewHeader from './overview-header'
import useOverviewCardDef from './use-overview-card-def'
import FieldSection from '../../components/field-section'
import {brandListObjectDef, setBackgroundGradientByBrand} from '../../helpers'
import {RqtvCards} from '../../components/card/index'

const OverviewByProduct = props => {
  return(
    <>
      <OverviewHeader/>
      <FieldSection qObjectDef={brandListObjectDef}>
        {(brand) => <Layout key={brand.description} {...brand}/>}
      </FieldSection>
    </>
  )
}

const Layout = props => {
  const {description, brandImage} = props
  const qObjectDef=useOverviewCardDef('brand', description)
  const gradient = setBackgroundGradientByBrand(description)
  return (
    <RqtvCards
      deckProps={{
        minDeckHeight:420,
        gradient:gradient,
        showHeader:true,
        title:description,
        logo:brandImage
      }}
      cardProps={{
        bodyRowLink:'/detail',
        displayGradient:true,
        width:250,
        flexItem:true,
        showAvatar:true,
        rowSelectionField:'Country',
        cardSelectionField:'Submodel Benchmark'
      }}
      cardObjectDef={qObjectDef}
    />
  )
}

export default OverviewByProduct
