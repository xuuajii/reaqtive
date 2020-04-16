import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardLogo, CardImage, CardHeaderText, CardBody} from './index'

const RqtvCard = props => {
  const cardClassName = `rqtv-card ${props.cardClassName}`
  const cardHeaderClassName = `${props.cardHeaderClassName}`
  const cardStyle={width:props.width, minWidth:props.width, ...props.cardStyle}
  const cardHeaderStyle={width:'100%', minWidth:'100%',...props.cardHeaderStyle}
  const {displayLogo, logoProps, bodyRowLink} = props
  return(
    <Card className={cardClassName} flexItem style={cardStyle}>
      <CardHeader className={cardHeaderClassName} style={cardHeaderStyle}>
        {displayLogo&&<CardLogo {...logoProps} imgUrl={props.cardBrandImg} placeHolder={props.cardBrandText}/>}
        <CardImage imgUrl={props.cardImage} displayGradient={props.displayGradient}/>
        <CardHeaderText title={props.title} subTitle={props.subTitle} style={{bottom:0, position:'absolute', ...props.style}}/>
      </CardHeader>
      {
        props.cardBody&&
        <CardBody
          cardValue={props.title}
          bodyTable={props.cardBody}
          cellWidth={props.cellWidth}
          rowHeight={props.rowHeight}
          showAvatar
          bodyRowLink={bodyRowLink}
          cardSelectionField={props.cardSelectionField}
          rowSelectionField={props.rowSelectionField}
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
