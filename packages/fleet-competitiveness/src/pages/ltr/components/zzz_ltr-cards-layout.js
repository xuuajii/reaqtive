import React from 'react'
import {useHistory} from 'react-router-dom'
import {extractSubNodes, medalsImgFolder} from '../../../helpers'
import Card from '../../../components/card/Card'
import Avatar from '../../../components/avatar'

const LtrCardsLayout = props => {
  const {qLeft, qTop, qData, qMeasureInfo, qDimensionInfo} = props

  const cards = props.qLeft.map((basket, index)=>{
    return({
      key:extractSubNodes(qLeft[index], 0).qElemNo,
      value:extractSubNodes(qLeft[index], 0).qText,
      title:extractSubNodes(qLeft[index], 1).qText,
      cardImage:extractSubNodes(qLeft[index], 1).qAttrExps.qValues[0].qText,
      subTitle:extractSubNodes(qLeft[index], 1).qAttrExps.qValues[1].qText,
      cardBodyDimensionHeader:qLeft&&extractSubNodes(qLeft[index], 0).qAttrExps.qValues[0].qText,
      cardBodyMeasureHeaders:qMeasureInfo.map(measure=>measure.qFallbackTitle),
      cardBody:qTop.map((bodyRow, bodyRowIndex)=>{
        //console.log(extractSubNodes(qTop[bodyRowIndex], 0))
        return({
          key:extractSubNodes(qTop[bodyRowIndex], 0).qElemNo,
          label:extractSubNodes(qTop[bodyRowIndex], 0).qText,
          img:extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps.qValues[0].qText,
          imgPlacehoder: qTop&&extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps.qValues[1].qText,
          measures: qData&&qData[index].filter((bodyCell, bodyCellIndex) => {
            return (
              Math.floor(bodyCellIndex / qMeasureInfo.length) === bodyRowIndex
            );
          })
        })
      })
    })
  })
  return(
    cards.map((card, index)=>{
    //console.log(card.cardBodyDimensionHeader)
    return(
        <Card
          key={card.key}
          title={card.title}
          img={card.cardImage}
          text={card.subTitle}
          displayBody={false}
          flexItem={true}
          displayLogo={false}
          ovByProduct={true}
          imgHeight={"auto"}
          titlePaddingTop={"90px"}
          customBody={()=>
            <CardBody
              rows={card.cardBody}
              cardValue={card.value}
              measureHeaders={card.cardBodyMeasureHeaders}
              cardBodyDimensionHeader={card.cardBodyDimensionHeader}
            />}
          width={290}
        />
      )
    })
  )
}

const CardBody = props => {
  const history = useHistory()
  const goToDetail = (cardValue, bodyRowValue) => {
    const queryString = `?selections=Basket LTR:${cardValue}&selections=Country:${bodyRowValue}`;
    const link = `${history.location.pathname}/detail/${queryString}`
    setTimeout(()=>history.push(link), 100)
  }
  return(
    <div className="table-responsive">
    <table className="table table-striped table-sm table-hover">
      <thead>
        <tr>
          <th scope="col" colSpan="2">{props.cardBodyDimensionHeader}</th>
          {props.measureHeaders.map(header=><th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.rows.map(row=>
          <tr key={row.key} onClick={()=>goToDetail(props.cardValue, row.label)}>
            <td>
              <Avatar
                avatarPlaceHolder={row.imgPlacehoder}
                avatarUrl={row.img}
                isRounded={true}
                height={'auto'}
                style={{minWidth:'1.2rem'}}
              />
            </td>
            <td>{row.label}</td>
            {row.measures.map((cell, index)=>{
                const medalImage =
                  cell.qNum === 1
                  ?'gold'
                  :cell.qNum === 2
                  ?'silver'
                  :cell.qNum === 3
                  ? 'bronze'
                  :'no'
                return(
                  <td key={cell.qText+10*index}>
                    <div style={{
                      margin:'auto',
                      background:`url(${medalsImgFolder}/${medalImage}_medal_no_stripe.svg)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize:'auto 100%',
                      backgroundPosition: 'center',
                      lineHeight:'2rem',
                      minWidth:'2rem',
                      minHeight:'2rem',
                    }} >{cell.qText}</div>
                  </td>
                )
              })}
          </tr>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default LtrCardsLayout
