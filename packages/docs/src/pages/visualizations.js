import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import { RqtvVizContainer, QViz, RqtvMaximizePortalEl, RqtvPageHeader} from '@reaqtive/components'
import {Example,Section, Code} from '../example-components/index'


const examples=[
  `<QViz id="QYthJs" height={'250px'}/>`,
  `<QViz
    id="VizExample1"
    chartProps={{
      chartType:'barchart',
      chartColumns: [
        {
          "qDef":{
            "qFieldDefs": ["[Product Sub Group Desc]"],
             "qFieldLabels": ["Product Sub Group"],
             "qSortCriterias":[{qSortByExpression:1,qExpression:"=Sum([Sales Quantity]*[Sales Price])"}],
             "qReverseSort":true
           }
         },
        "Customer Type",
        {
          "qDef":{
            "qDef":"=Sum([Sales Quantity]*[Sales Price])",
            "qLabel":"Revenue"
          }
        }
      ],
      rest: {
        "showTitles": false,
        "title": "Revenue",
        "barGrouping":{grouping:"stacked"}
      }
    }}
    height={'300px'}
  />`,
  `
    <div ref={maximizeElExample} style={{position:'absolute', top:0, left:0, height:'100%', width:'100%', zIndex:300, maxHeight:'100%'}}/>
    <div style={{height:'300px', minHeight:'300px'}}>
      <RqtvVizContainer height={'300px'}  showExportExcel={true} showExportPdf={true} showExportImg={true} maximizeElRef={maximizeElExample}>
        <QViz id="nRxXG" title="bar chart"/>
      </RqtvVizContainer>
    </div>
  `,
  `
    <RqtvVizContainer style={{height:'300', maxHeight:'300'}} maximizeEl={maximizeEl}>
      <QViz key="pDKRhr" id="pDKRhr" title="scatter chart"/>
      <QViz key="nvqpV" id="nvqpV" title="line chart"/>
    </RqtvVizContainer>
  `
]

const Visualizations = props => {
  const maximizeElRef=useRef()
  const maximizeElExample=useRef()
  return(
    <>
    <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
      <p className="bd-lead">
        Documentation and examples for visualizations components. We have 2 types of visualizations: the first one is based on Qlik capability APIs while the second is developed with React.
        Both types can be wrapped in visualization containers.
      </p>
      <Section title="QViz - basic viz">
        <p>
          Visualizations based on Qlik capability APIs can be used via the QViz component.
          Below a basic example of QViz: if provided with the id of an existing Qlik Sense visualization, the component retrievs it from the server and displays it in the page.
          You can' embed the same visualization more then once in the same page.
          You also have to tell Qlik the height of the element into which the chart will be embedded.
          You can find the id of the object you want to embed in the Qlik DevHub single configurator or installing this
          <a href="https://chrome.google.com/webstore/detail/add-sense/bbiljflfafkaejgdebbnmcohpidgkejj?hl=en"> extension </a>for Chrome
        </p>
        <Example codeString={examples[0]}>
          <QViz id="QYthJs" height={'300px'}/>
        </Example>
      </Section>
      <Section title="QViz - basic viz created on the fly">
        <p>
          Qlik visualizations can also be created on the fly (we recommend this approach which will help to mantain the code).
          To create a visualization on the fly you have to provide QViz component with a chartProps object.
          You can find more details about how to create a chartProps object looking at Qlik <a href="https://help.qlik.com/en-US/sense-developer/September2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm"> Visualization API </a> documentation
          If chartProps are set, QViz will ignore the id prop.
        </p>
        <Example codeString={examples[1]}>
          <QViz
            id="VizExample1"
            chartProps={{
              chartType:'barchart',
              chartColumns: [
                {
                  "qDef":{
                    "qFieldDefs": ["[Product Sub Group Desc]"],
                     "qFieldLabels": ["Product Sub Group"],
                     "qSortCriterias":[{qSortByExpression:1,qExpression:"=Sum([Sales Quantity]*[Sales Price])"}],
                     "qReverseSort":true
                   }
                 },
                "Customer Type",
                {
                  "qDef":{
                    "qDef":"=Sum([Sales Quantity]*[Sales Price])",
                    "qLabel":"Revenue"
                  }
                }
              ],
              rest: {
                "showTitles": false,
                "title": "Revenue",
                "barGrouping":{grouping:"stacked"}
              }
            }}
            height={'300px'}
          />
        </Example>
      </Section>
      <Section title="RqtvVizContainer - single viz with container">
        <p>
          Basic Viz can be wrapped inside a container. The container allows you to display a title and provides additional functionalities to the chart.
          In particular it allows to export data (in csv format) or to download the image of the chart or a pdf slide of the chart.
          You can hide each button setting the respective prop to false. By default , if the inner chart provides these methods, export methods props are set to true.
          RqtvVizContainer also provides a
        </p>
        <Example codeString={examples[2]}>
          <div ref={maximizeElExample} style={{position:'absolute', top:0, left:0, height:'100%', width:'100%', zIndex:300, maxHeight:'100%'}}/>
          <div style={{height:'300px', minHeight:'300px'}}>
            <RqtvVizContainer height={'300px'}  hideScrollWhenMaximized={false} showExportExcel={true} showExportPdf={true} showExportImg={true} maximizeElRef={maximizeElExample}>
              <QViz id="nRxXG" title="bar chart"/>
            </RqtvVizContainer>
          </div>
        </Example>
      </Section>
      <Section title="RqtvVizContainer - multiple viz with container">
        <p>
          If 2 or more children are included in one container it will automatically show the first and present a dropdown menu instead of the title to allow the user to change the
          displayed visualiztion.
        </p>
        <Example codeString={examples[3]}>
          <RqtvVizContainer maximizeElRef={maximizeElRef} height={500}>
            <QViz key="pDKRhr" id="pDKRhr" title="scatter chart"/>
            <QViz
              key="VizExample2"
              id="VizExample2"
              chartProps={{
                chartType:'barchart',
                chartColumns: [
                  {
                    "qDef":{
                      "qFieldDefs": ["[Product Sub Group Desc]"],
                       "qFieldLabels": ["Product Sub Group"],
                       "qSortCriterias":[{qSortByExpression:1,qExpression:"=Sum([Sales Quantity]*[Sales Price])"}],
                       "qReverseSort":true
                     }
                   },
                  "Customer Type",
                  {
                    "qDef":{
                      "qDef":"=Sum([Sales Quantity]*[Sales Price])",
                      "qLabel":"Revenue"
                    }
                  }
                ],
                rest: {
                  "showTitles": false,
                  "title": "Revenue",
                  "barGrouping":{grouping:"stacked"}
                }
              }}
            />
          </RqtvVizContainer>
        </Example>
      </Section>
    </>
  )
}

export default Visualizations
