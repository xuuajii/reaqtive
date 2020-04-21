//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import { useState, useEffect } from 'react'
import React from 'react'

/**
 * @typedef {object} qVizHandler - the object returned by useQLayoutReducer
 * @property {boolean} qVizLoading - if true the the handler is still waiting for response from the qlik server
 * @property {object} qViz - the interface to interact with the visualization (e.g. to export it in excel, to resize it, etc.)
 */

 /**
  * @typedef {function} hook
  * @type {function}
  */

/**
  *@function useQVizHandler
  *@description a hook to retrieve a variable already available in the qDoc
  *@kind hook
  *@param {object} qApp - the qApp object provided by the qApp context
  *@param {string} [id=] - if id is defined chartProps are not, the useQVizHandler will ask for an already existing viz to the qApp
  *@param {object} [chartProps=] -  if the object is defined the useQVizHandler will create the visualization on the fly not considering an eventually provided id
  *@return {qVizHandler} - handler to interact with the visualization retrieved from the qApp
*/

const useQVizHandler = (qApp, id, chartProps) => {
  const qVizInitialState = {qVizLoading:true, qViz:null}
  const [qVizHandler, setQVizHandler] = useState(qVizInitialState)
  const [vizId, setVizId] = useState(null)

  useEffect(()=>{
    if(chartProps && vizId===null ){//qVizHandler.qVizLoading===true && qVizHandler.qViz===null && qApp!==null && qApp !== undefined){
      qApp&&qApp.visualization.create(
        chartProps.chartType,
        chartProps.chartColumns,
        chartProps.rest
      )
      .then(qViz => {
        setVizId(qViz.id)
      })
      .catch(qErr=>console.log(qErr))
    }
    if(id && !(chartProps)){
      setVizId(id)
    }

    if(vizId!==null && qVizHandler.qVizLoading===true){
      qApp&&qApp.visualization.get(vizId)
      .then(qViz => setQVizHandler({qVizLoading:false, qViz:qViz}))
      .catch(qErr=>console.log(qErr))
    }
  },[qApp, chartProps, vizId, id, qVizHandler.qVizLoading])

  useEffect(()=>{
      if(qVizHandler.qViz){
        qVizHandler.qViz.show(vizId)
      }
      return ()=>{
        if(qVizHandler.qViz!==null){
          qApp&&qApp.destroySessionObject(vizId)
        }
      }
    }, [qVizHandler, vizId])
    return({...qVizHandler, vizId})
  }

export default useQVizHandler
