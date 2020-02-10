import {useState, useEffect} from 'react'
import queryString from 'query-string'


const parseSelection = (selection) => {

  const formatSelection = (value) => {
    const qIsNumeric = isNaN(Number(value))?false:true
    return qIsNumeric ? {
      qIsNumeric: qIsNumeric,
      qNumber: Number(value)
    }:{
      qText:value
    }
  }

  return {
    type:'fieldSelections',
    params:{
    fieldName:`[${selection.substring(0,selection.indexOf(':'))}]`,
    values:selection.substring(selection.indexOf(':')+1, selection.length).split(';').map(value=>formatSelection(value))
    }
  }
}

const useQueryString = (search) => {
  const [triggers, setTriggers] = useState()
  useEffect(()=>{
    const values = queryString.parse(search)
    const selectionsArray = Array.isArray(values.selections)?values.selections:[values.selections]
    const parsedTriggers = search?selectionsArray.map(selection=>parseSelection(selection)):[]
    setTriggers(parsedTriggers)
  },[search])
  return triggers
}

export default useQueryString
