import React from 'react'
import PropTypes from 'prop-types'
import { QGenericObject, QListObject } from '@reaqtive/q'
import { RqtvSpinner } from '@reaqtive/components'
import BasketAnalysisCardsLayout from './basket-analysis-cards-layout'


const BasketAnalysisCards = props =>{
  return(
    <QGenericObject qObjectDef={props.qHypercubeDef}>
      {(qGenericObject)=>{
        const isLayoutLoaded = qGenericObject.qLayoutHandler.qLayout && qGenericObject.qLayoutHandler.qLayout;
        const hypercube = isLayoutLoaded && qGenericObject.qLayoutHandler.qLayout.qHyperCube
        const basket = hypercube && hypercube.qPivotDataPages[0].qLeft[0].qText;
        isLayoutLoaded&&props.showCharts()
        return (
          <div>
            {isLayoutLoaded ? (
              <>
                <BasketAnalysisCardsLayout hypercube={hypercube} />
              </>
            ) : (
              <RqtvSpinner isSticky={true} />
            )}
          </div>
        );
      }}
    </QGenericObject>
  )
}

//const Layout = props => {

//   const isLayoutLoaded = props.qLayoutHandler.qLayout && props.qLayoutHandler.qLayout;
//   const hypercube = isLayoutLoaded && props.qLayoutHandler.qLayout.qHyperCube
//   const basket = hypercube && hypercube.qPivotDataPages[0].qLeft[0].qText;
//   isLayoutLoaded&&props.showCharts()
//   return (
//     <div>
//       {isLayoutLoaded ? (
//         <>
//           <BasketAnalysisCards hypercube={hypercube} />
//         </>
//       ) : (
//         <RqtvSpinner isSticky={true} />
//       )}
//     </div>
//   );
// };

export default BasketAnalysisCards;
