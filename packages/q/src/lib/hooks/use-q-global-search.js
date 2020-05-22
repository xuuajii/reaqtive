import  {useEffect, useContext, useRef, useReducer, useCallback} from 'react'
import {QDoc} from '../index'
import {getPatchedObject, replaceObjectProp} from '../helpers/helpers'
import _ from 'lodash'

const searchObjectDefReducer = (state, action) => {
  switch(action.type){
    case 'search':
      const qTerms = Array.isArray(action.qTerms)?action.qTerms:[action.qTerms]
      return  {...state, qTerms:qTerms}
    break;
    case 'scroll':
      return {...state, qPage:{...state.qPage, qOffset:action.qOffset}}
    break;
    default:
      console.log('error searching')
      throw new Error();
  }
}

const initializeState = (fields, qItemCount, qMatchOffset, qMatchCount) => {
  return{
    qOptions:{
    qSearchFields:fields,
    qContext:'CONTEXT_CURRENT_SELECTIONS',
    qCharEncoding:'CHAR_ENCODING_UTF8'
    },
    qTerms:[],
    qPage:{
            qOffset:0,
            qCount:qItemCount,
            qGroupItemOptions:[{qGroupItemType:'FIELD',qOffset:qMatchOffset, qMatchCount:qMatchCount}]
        }
    }
  }

const initialSearchState = {
  qLoading:true,
  qEngineError:false,
  qErrorCounter:5,
  qSearchResults:null
}

const qSearchResultsReducer = (state, action) => {
  switch(action.type){
    case 'success':
      return  {...initialSearchState, qSearchResults:action.qSearchResults, qLoading:false}
    break;
    case 'error':
      const newErrorCounter = state.qErrorCounter + 1;
      return state.maxErrorCounter>state.qErrorCounter ? {...initialSearchState, qErrorCounter: newErrorCounter} : {...initialSearchState, qLoading:false, qEngineError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting searchresults'};
    break;
    default:
      console.log('error searching')
      throw new Error();
  }
}

const searchQDoc = async (qDoc, searchObjectDef) => {
  try{
    const qSearchResults = await qDoc.searchResults(searchObjectDef)
    return qSearchResults
  } catch(err){
    return err
  }
}

const useQGlobalSearch = (fields, searchString, qItemOffSet, qItemCount, qMatchOffset=0, qMatchCount=20) =>{
  //console.log(fields)
  const qDocHandler = useContext(QDoc)

  const initialSearchObjectDef = initializeState(fields, qItemCount, qMatchOffset, qMatchCount)
  const [qSearchObjectDef, dispatchDef] = useReducer(searchObjectDefReducer, initialSearchObjectDef);

  const [qSearchResults, dispatchResults] = useReducer(qSearchResultsReducer, initialSearchState)
  const currentOffset=useRef(0)
  useEffect(()=>{
    if(searchString){
      dispatchDef({qTerms:searchString, type:'search'})
    }
  },[searchString])

  useEffect(()=>{
    dispatchDef({qTerms:qItemOffSet, type:'scroll'})
  },[qItemOffSet])

  const search = useCallback(async (qSearchObjectDef) => {
    const res = await searchQDoc(qDocHandler.qDoc, qSearchObjectDef)
    if(res instanceof Error){
      dispatchResults({qErrorObject:res, type:'error'})
    }else{
      if(_.isEqual(res.qSearchTerms,qSearchObjectDef.qTerms)) dispatchResults({qSearchResults:res, type:'success'})
    }
  }, [qDocHandler.qDoc])

  useEffect(()=>{
    search(qSearchObjectDef)
  }, [qSearchObjectDef, qSearchResults.qErrorCounter])

  const selectSearchResults = (searchString, qId, callback) => {
    const selectSearchParams = replaceObjectProp(qInitialSearchParams, 'qPage', 'qMatchIx', qId);
    const patchedSelectSearchParams = getPatchedObject(selectSearchParams, 'qTerms', [searchString])
    // console.log(patchedSelectSearchParams)
    qDocHandler.qDoc.selectAssociations(patchedSelectSearchParams)
    .then(qResult=>{
        if(callback){
          callback()
        }
      })
    .catch(qErr=>{
      setQEngineError({isError:true, errorMessage:qErr})
    });
  }

  return{ ...qSearchResults, selectSearchResults, search:()=>search(qSearchObjectDef) }
}

export default useQGlobalSearch
