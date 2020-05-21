import  {useEffect, useContext, useRef, useReducer} from 'react'
import {QDoc} from '../index'
import {getPatchedObject, replaceObjectProp} from '../helpers/helpers'

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
  qErrorCounter:0,
  qSearchResults:null
}

const qSearchResultsReducer = (state, action) => {
  switch(action.type){
    case 'success':
      return  {...initialSearchState, qSearchResults:action.qSearchResults, qLoading:false}
    break;
    case 'error':
      const newErrorCounter = state.qErrorCounter + 1;
      return state.maxErrorCounter>=state.qErrorCounter ? {...initialSearchState, qErrorCounter: newErrorCounter} : {...initialSearchState, qLoading:false, qError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting searchresults'};
    break;
    default:
      console.log('error searching')
      throw new Error();
  }
}

const searchQDoc = async (qDoc, searchObjectDef) => {
  try{
    const qSearchResults = qDoc.searchResults(searchObjectDef)
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
    dispatchDef({qTerms:searchString, type:'search'})
  },[searchString])

  useEffect(()=>{
    dispatchDef({qTerms:qItemOffSet, type:'scroll'})
  },[qItemOffSet])

  useEffect(()=>{
    const search = async () => {
      const res = await searchQDoc(qDocHandler.qDoc, qSearchObjectDef)
      return (res instanceof Error)
        ?dispatchResults({qErrorObject:res, type:'error'})
        :dispatchResults({qSearchResults:res, type:'success'})
    }
    search()
  }, [qSearchObjectDef])

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
      console.log('error accepting global search', qErr)
      setQEngineError({isError:true, errorMessage:qErr})
    });
  }

  return{ ...qSearchResults, selectSearchResults }
}

export default useQGlobalSearch
