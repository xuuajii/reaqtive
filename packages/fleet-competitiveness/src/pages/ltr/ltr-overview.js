import React from 'react'
import {RqtvPage, RqtvStandardTemplate, RqtvPageHeader, RqtvBreadcrumb, RqtvRenderer} from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'
import LtrCards from './components/ltr-cards'
import {brandListObjectDef} from '../../helpers'
import LtrHeader from './components/ltr-header'

const LtrOverview = props => {
  return(
    <RqtvPage
      path={props.path}
      exact={true}
      qTitleExpr ="'LTR Ranking '&$(lastMonthLabel)"
    >
      <LtrHeader/>
      <RqtvBreadcrumb/>
      <QGenericObject qObjectDef={brandListObjectDef}>
        {(qGenericObject)=>{
          const {qError, qLoading, qLayout} = qGenericObject.qLayoutHandler

          const brands = qLayout && qLayout.brandJSON!==''&&qLayout.brandJSON.split("|").map(brand=>JSON.parse(brand))
          const noData=brands===null?false:brands.length===0
          return (
            <RqtvRenderer
              loading={qLoading||qLayout && qLayout.brandJSON===''}
              error={qError}
              noData={noData}
            >
                  {brands&&brands.map( brand => {
                    return isNaN(Number(brand.description))?
                    <LtrCards key={brand.description} brand={brand.description} brandImage={brand.brandImage}/>
                    :null
                  } )}
            </RqtvRenderer>
            )
          }
        }
      </QGenericObject>
    </RqtvPage>
  )
}

export default LtrOverview
