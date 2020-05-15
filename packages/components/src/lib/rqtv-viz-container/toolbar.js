import React from 'react'
import PropTypes from 'prop-types'
import {Icon, arrowCollapse, arrowExpand, image, pdf, excel} from '@reaqtive/layout'

const RqtvVizContainerToolbar = props => {
  //console.log(props.exportToExcel)
  return(
    <div className="rqtv-viz-container-toolbar">
      <div className="btn-group" role="group">
        {props.showExportExcel&&props.exportExcel&&
          <button type="button" className="btn" onClick={props.exportExcel} style={{lineHeight:`${props.buttonFontSize+2}px`}}>
            <Icon type={excel} size={props.buttonFontSize} />
          </button>
        }
        {props.showExportPdf&&props.exportPdf&&
            <button type="button" className="btn" onClick={props.exportPdf} style={{lineHeight:`${props.buttonFontSize+2}px`}}>
              <Icon type={pdf} size={props.buttonFontSize} />
            </button>
        }
        {props.showExportImg&&props.exportImg&&
            <button type="button" className="btn" onClick={props.exportImg} style={{lineHeight:`${props.buttonFontSize+2}px`}}>
              <Icon type={image} size={props.buttonFontSize} />
            </button>
        }
        {props.showMaximize&&
          <button type="button" className="btn" onClick={props.toggleMaximize} style={{lineHeight:`${props.buttonFontSize+2}px`}}>
            {!(props.maximized)
              ?<Icon type={arrowExpand} size={props.buttonFontSize} />
              :<Icon type={arrowCollapse} size={props.buttonFontSize} />
            }
          </button>
        }
      </div>
    </div>
  )
}

RqtvVizContainerToolbar.propTypes = {
  showExportExcel:PropTypes.bool,
  showExportPdf:PropTypes.bool,
  showExportImg:PropTypes.bool,
  showMaximize:PropTypes.bool,
  buttonFontSize:PropTypes.number,
}

RqtvVizContainerToolbar.defaultProps = {
  showExportExcel:true,
  showExportPdf:true,
  showExportImg:true,
  showMaximize:true,
  buttonFontSize:18
}

export default RqtvVizContainerToolbar
