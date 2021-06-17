import {useState, useEffect, useCallback, useContext} from 'react'
import {QDoc} from '../index'
import React from 'react'

const qBeginSelections = async (qObject, path) => {
  try{
    const result = qObject.beginSelections([path])
    return result
  } catch(err){
    return err
  }
}

const qEndSelections = async (qObject, qAccept) => {
  try{
    const isQAccepting=qAccept==='1'||qAccept===1||qAccept===true?true:false
    const result = qObject.endSelections(isQAccepting)
    return result
  } catch(err){
    return err
  }
}

const abortModal = (qDoc, isSelecting) => {
  if(QDoc && isSelecting){
    qDoc&&qDoc.abortModal(false)
  }
}

/**
 * @typedef {object} qSelectionHandler - the object returned by useQLayoutReducer
 * @property {boolean} isSelecting - a boolen that tells you if the object is in selection state
 * @property {function} handleSelections
 * @property {function} endSelections
 */

 /**
  * @typedef {object} qObject - the interface provided by the qlik engine
  */

 /**
  * @typedef {function} hook
  * @type {function}
  */

/**
  *@function useQSelectionHandler
  *@description a hook to handle the selection state of an object
  *@kind hook
  *@param {qObject} qObject - the qObject to apply the state to
  *@return {qSelectionHandler} qSelectionHandler an object with the current selection state (isSelecting) and the method to manage it
*/

const useQSelectionHandler = (qObject) => {
  const [isSelecting, setIsSelecting] = useState(false)
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler.qDoc
  useEffect(()=>{
    return () => abortModal(qDoc, isSelecting)
  }, [qDoc, isSelecting])

  const beginSelections = useCallback((path, callback) => {
    const fn = async () => {
      try{
        const result = await qBeginSelections(qObject, path)
        //console.log('res',result)
      } catch(err){
        console.log(err)
        setIsSelecting(false)
      } finally {
        if (typeof callback==='function') callback();
      }
    }
    setIsSelecting(true)
    fn(qObject)
  }, [qObject])

  /**
    *@function endSelections(callback, quickSelectionMode=false) - if quickSelectionMode is set to false it set the selection state to true, and call the callback, otherwise it just call the callback
    *@param {boolean} qAccept it tells the qLik engine whether the users accpet the selections (keep the current selection state) or reject the selections (go back to the selection state before the selection began)
    *@param {function} callaback - a function to be called after ending slections (can be usefule to set scroll-position or to hide dropdowns)
  */
  const endSelections = useCallback((qAccept, callback) => {
    const result = qEndSelections(qObject, qAccept)
    if(!(result instanceof Error)){
      //console.log('end')
      setIsSelecting(false);
      if (typeof callback==='function') callback();
    }
  }, [qObject])

  /**
    *@function handleSelections(callback, quickSelectionMode=false) - if quickSelectionMode is set to false it set the selection state to true, and call the callback, otherwise it just call the callback
    *@param {function} callaback - the function to be called. It should be a selection method provided by the qObject (e.g. qSelectValue, qSelectDimensionValue, ecc.)
    *@param {boolean} quickSelectionMode if true the generic object will use Qlik Sense like selections, otherwise QlikView like
  */
  const handleSelections = useCallback((path, callback, quickSelectionMode=false)=>{
    if(quickSelectionMode===false && isSelecting===false){
      beginSelections(path, callback)
    } else {
      //console.log('else')
      callback()
    }
  }, [isSelecting, qObject])

  return { isSelecting, handleSelections, endSelections, beginSelections}
}

export default useQSelectionHandler
