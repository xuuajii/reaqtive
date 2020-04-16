import React from 'react'
import {RqtvRenderer, RqtvPage} from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'
import {brandListObjectDef, extractBrandObject} from '../../helpers'
import PurchasingCards from './purchasing-cards'

const PurchasingOverview = props => {
  return (
    <RqtvPage path={props.path} exact={true}>
      <QGenericObject qObjectDef={brandListObjectDef}>
        {(qGenericObject)=>{
          const {qLoading, qError, qLayout} = qGenericObject.qLayoutHandler
          const brands = qLayout&&extractBrandObject(qLayout)
          return(
            <RqtvRenderer
              loading={qLoading}
              error={qError}
              noData={qLoading===false&&!brands}
            >
              {brands&&brands.map(brand=>
                isNaN(brand.description)&&
                  <PurchasingCards
                    key={brand.description}
                    brand={brand.description}
                    brandImage={brand.brandImage}
                    bodyRowLink={'/'}
                  />
                )}
            </RqtvRenderer>
          )
        }}
      </QGenericObject>
    </RqtvPage>
  )
}

export default PurchasingOverview
