import React from 'react'
import {QVariable} from '@reaqtive/q'

const MyQVariable = props => {
  const variableName = 'MonthNames';
  return(
    <div className="row">
      {/*Inline layout*/}
      <QVariable variableName={variableName}>
        {(qVariable)=>{
            console.log('variable', qVariable)
            return (
              <div className="col-md-6">
                <div>
                  <span>MyVariable name is: </span>
                  <span>{variableName}</span>
                </div>
                <span>MyVariable value is: </span>
                {qVariable.qLayoutHandler.qLayout&&<span>{qVariable.qLayoutHandler.qLayout.qText}</span>}
              </div>
            )
          }
        }
      </QVariable>
      {/*External layout*/}
      <QVariable variableName={variableName}>
        <Layout variableName={variableName}/>
      </QVariable>
    </div>
  )
}

const Layout = props =>
<div className="col-md-6">
  <div>
    <span>MyVariable name is: </span>
    <span>{props.variableName}</span>
  </div>
  <div>
    <span>MyVariable value is: </span>
    {props.qLayoutHandler.qLayout&&
      <span>{props.qLayoutHandler.qLayout.qText}</span>
    }
  </div>
</div>
export default MyQVariable
