import React from 'react'
import {RqtvRenderer} from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'

const FieldSection = props => {
  return(
    <QGenericObject qObjectDef={props.qObjectDef}>
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
              //console.log(brand)
              return isNaN(Number(brand.description))?
                typeof props.children==='function'?props.children(brand):props.children
              :null
            } )}
          </RqtvRenderer>
        )
      }
      }
    </QGenericObject>
  )
}

export default FieldSection
