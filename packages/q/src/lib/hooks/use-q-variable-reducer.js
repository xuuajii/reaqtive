import {useState, useEffect, useContext, useReducer} from 'react'
import {QDoc} from '../contexts/q-doc'


const getVariableByName = async (qDoc, variableName) => {
  try{
    const variable = qDoc.getVariableByName(variableName)
    return variable
  }catch(err){
    console.log(err)
    return err
  }
}

const getVariableById = async (qDoc, variableId) => {
  try{
    const variable = qDoc.getVariableById(variableId)
    return variable
  }catch(err){
    console.log(err)
    return err
  }
}

const initialState = {
  qVariable:null,
  qError:false,
  qErrorCounter:0,
  maxErrorCounter:10,
  rqtvMessage:null,
  qErrorObject:null,
  qLoading:true
}

const qVariableReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      const newErrorCounter = state.qErrorCounter + 1;
      return state.maxErrorCounter>=state.qErrorCounter ? {...initialState, qErrorCounter: newErrorCounter} : {...initialState, qLoading:false, qError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting layout'};
    case 'success':
      return {...initialState, qLoading:false, qVariable:action.qVariable};
    default:
      throw new Error();
  }
}

/**
 * @typedef {object} qVariableHandler - the object returned by useQLayoutReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qVariable from the engine
 * @property {object} qVariable - the object returned from the server to interact with the variable
 * @property {boolean} shouldUpdate - a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections)
 * @property {function} setShouldUpdate - a function to clean up the shouldupdate property after the needed effects have run
 */

 /**
  * @typedef {function} hook
  * @type {function}
  */

/**
  *@function useQVariableReducer
  *@description hook to retrieve a variable already available in the qDoc
  *@kind hook
  *@param {string} id - the name or id of the variable
  *@param {string} [idType=name] - tells to the variable reducer whether to use the name or id to retrieve the variable
  *@return {qVariableHandler} Returns the handler of the variable
*/

const useQVaraibleReducer = (id, idType='name') => {
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler&&qDocHandler.qDoc
  const [qPromiseHandler, dispatch] = useReducer(qVariableReducer, initialState);
  const [shouldUpdate, setShouldUpdate] = useState()
  const {errorCounter, qLoading, qError, qVariable} = qPromiseHandler
  useEffect(()=>{
    const runEffect = async () => {
      let getVariable;
      switch (idType) {
        case 'name':
          getVariable = getVariableByName
          break;
        case 'id':
          getVariable = getVariableById
          break;
        default:
          throw new Error();
      }
      if(qDoc){
        const result = await getVariable(qDoc,id)
        result instanceof Error?dispatch({type:'error', qError:result}):dispatch({type:'success', qVariable:result})
      }
    }
    if(qLoading){
      runEffect()
    }
  },[qDoc, id, idType, qLoading])

  useEffect(()=>{
    if(qLoading===false && qVariable!==null){
      setShouldUpdate(true)
      qVariable.on('changed', ()=>setShouldUpdate(true))
    }
    return () => qVariable&&qVariable.removeAllListeners()
  },[qLoading, qVariable])

  return ({
      ...qPromiseHandler,
      shouldUpdate,
      setShouldUpdate
    })
}

export default useQVaraibleReducer
