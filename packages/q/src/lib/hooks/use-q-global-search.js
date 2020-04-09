//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import  {useState, useEffect, useContext, useMemo, useCallback} from 'react'
import {QDoc} from '../index'
import {getPatchedObject, replaceObjectProp} from '../helpers/helpers'

const useQGlobalSearch = (fields, searchString, qItemOffSet, qItemCount, qMatchOffset=0, qMatchCount=20) =>{
  //console.log(fields)

  const qInitialSearchParams = useMemo(()=> {
    return{
      qOptions:{
      qSearchFields:fields,
      qContext:'CONTEXT_CURRENT_SELECTIONS',
      qCharEncoding:'CHAR_ENCODING_UTF8'
      },
      qTerms:[],
      qPage:{
              qOffset:qItemOffSet,
              qCount:qItemCount,
              qGroupItemOptions:[{qGroupItemType:'FIELD',qOffset:qMatchOffset, qMatchCount:20}]
          }
    }
  },[fields, qItemOffSet, qMatchOffset, qItemCount])
  const qDocHandler = useContext(QDoc)
  //const [qSearchParams, setQSearchParams] = useState(qInitialSearchParams)
  const [qSearchResults, setQSearchResults] = useState(null)
  const intialQEngineError = {qError:false};
  const [qLoading, setQLoading] = useState(true)
  const [qEngineError, setQEngineError] = useState(intialQEngineError)
  const [qErrorCount, setQErrorCount] = useState(0)

  const search = useCallback((searchString) => {
    const patchedParams = getPatchedObject(qInitialSearchParams, 'qTerms', [searchString])
    patchedParams&&searchString&&qDocHandler.qDoc&&qDocHandler.qDoc.searchResults(patchedParams)
    .then(qResults => {
      setQSearchResults(qResults)
      setQEngineError(intialQEngineError)
      setQErrorCount(0)
      setQLoading(false)
    })
    .catch(qErr=>{
      qErrorCount>=10&&console.log(qErr)
      setQErrorCount(qErrorCount=>qErrorCount+1)
    })
  },[qInitialSearchParams])

  useEffect(()=>{
    if(qErrorCount>=10){
      console.log('error searching', qErrorCount)
      setQEngineError({qError:true, rqtvMessage:'error getting global search results'})
      setQSearchResults(null)
      setQLoading(false)
    } else {
      search(searchString)
    }
  }, [qErrorCount, searchString])



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

  useEffect(()=>{
    const resetSearch = () => {
      setQSearchResults()
      setQLoading(true)
      setQEngineError(intialQEngineError)
    }
    searchString?search(searchString):resetSearch()
  },
    [searchString,qItemOffSet])

  return{ qSearchResults, qLoading, qEngineError, selectSearchResults, search }
}

export default useQGlobalSearch
