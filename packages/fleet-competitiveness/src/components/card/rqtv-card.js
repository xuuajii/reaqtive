import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardLogo, CardImage, CardHeaderText, CardBody, CardKpi } from './index'

const RqtvCard = props => {
  const cardClassName = `rqtv-card ${props.cardClassName}`
  const cardHeaderClassName = `${props.cardHeaderClassName}`
  const cardStyle={width:props.width, minWidth:props.width, ...props.cardStyle}
  const cardHeaderStyle={width:'100%', minWidth:'100%',...props.cardHeaderStyle}
  const {
    displayLogo, logoProps, bodyRowLink,
    cardImage, displayGradient, cardBrandImg, cardBrandText, cardKpis,
    subTitle, title, cardBody, cellWidth, rowHeight, cardSelectionField, rowSelectionField,
    minKpiValue, kpiRange
  } = props
  return(
    <Card className={cardClassName} flexItem style={cardStyle}>
      <CardHeader className={cardHeaderClassName} style={cardHeaderStyle}>
        {displayLogo&&<CardLogo {...logoProps} imgUrl={cardBrandImg} placeHolder={cardBrandText}/>}
        <CardImage imgUrl={cardImage} displayGradient={displayGradient}/>
        <CardHeaderText title={title} subTitle={subTitle} style={{bottom:0, position:'absolute'}}/>
      </CardHeader>
      {
        cardKpis&&
          <div className="d-flex w-100 justify-content-around mb-3">
          {cardKpis.map(kpi=>{
            return<CardKpi key={kpi.label} value={kpi.qText} textLabel={kpi.label} minValue={minKpiValue} range={kpiRange}/>
          })}
          </div>
      }
      {
        cardBody&&
        <CardBody
          cardValue={title}
          bodyTable={cardBody}
          cellWidth={cellWidth}
          rowHeight={rowHeight}
          showAvatar
          bodyRowLink={bodyRowLink}
          cardSelectionField={cardSelectionField}
          rowSelectionField={rowSelectionField}
        />
      }
    </Card>
  )
}

export default RqtvCard

RqtvCard.propTypes = {
  cardClassName:PropTypes.string,
  cardHeaderClassName:PropTypes.string,
  cardStyle:PropTypes.object,
  cardHeaderStyle:PropTypes.object,
  displayLogo:PropTypes.bool,
  logoProps:PropTypes.object,
  cellWidth:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellHeight:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

RqtvCard.defaultProps = {
  cardClassName:' ',
  cardHeaderClassName:' ',
  cardStyle:{},
  cardHeaderStyle:{},
  displayLogo:true,
  logoProps:{
    right:0,
    top:5
  },
  cellWidth:'auto',
  cellHeight:'auto',
}
