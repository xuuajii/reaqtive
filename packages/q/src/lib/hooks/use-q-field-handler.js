import {useState, useEffect, useContext} from 'react'
import {QDoc} from '../index'

const useQFieldHandler = (qFieldName, isAlwaysOneSelected, defaultValue) => {
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler.qDoc
  const [qLoading, setQLoading] = useState(true)
  const [qError, setQError] = useState(false)
  const [qField, setQField] = useState()
  const [nxProperties, setNxProperties] = useState(null)
  const [updatingNxProperties, setUpdatingNxProperties] = useState()

  //Effect: getField and setNxProperties on qlikEngine every time inputs change
  useEffect(()=>{
    function selectDefaultAndSetNx(qField, defaultValue){
      qField.select(defaultValue)
      .then(qResult=>qField.setNxProperties({ "qOneAndOnlyOne": true })
        .then(qResult=>console.log(qResult))
        .catch(qErr => {
          setQError({qError:true, rqtvMessage:`error setting ${qFieldName} alwaysOneSelected`})
          console.log(`error setting ${qFieldName} alwaysOneSelected`, qErr)
        })
      )
      .catch(qErr=>{
        setQError({qError:true, rqtvMessage:`error selecting ${defaultValue} in ${qFieldName} and setting alwaysOneSelected`})
        console.log(`error selecting ${defaultValue} in ${qFieldName} and setting alwaysOneSelected`, qErr)
      })
    }
    //console.log(qFieldName)
    qDoc&&qFieldName&&qFieldName.substring(0,1)!=='='&&qDoc.getField(qFieldName)
    .then(qField=> {
      setQField(qField)
      setQLoading(false)
      if(isAlwaysOneSelected){
        selectDefaultAndSetNx(qField, defaultValue)
      } else {
        setNxProperties({})
      }
    })
    .catch(qErr=>{
      setQError({qError:true, rqtvMessage:`error getting qField${qFieldName} `})
      console.log('error getting qField', qErr)
    })
  },[qFieldName, isAlwaysOneSelected, defaultValue, qDoc])

  //
  const [isMounted, setIsMounted] = useState(true)
  useEffect(()=>{
    return ()=>setIsMounted(false)
  },[])

  //Effect: read field nxProps from qlikEngine and update state nxProps, everytime qField changes
  useEffect(() => {
    setUpdatingNxProperties(true)
    if(qField){
     if(nxProperties===null){
       qField.getNxProperties()
        .then(nxProperties=>{
          //console.log(nxProperties)
           setNxProperties(nxProperties)
           setUpdatingNxProperties(false)
        })
        .catch(qErr=>{
          setUpdatingNxProperties(false)
          setQError({qError:true, rqtvMessage:`setting fieldNxProps`})
        })
     }
     qField.on('changed',()=> qField.getNxProperties()
      .then(nxProperties=>{
        //console.log(nxProperties)
        if(isMounted===true){
         setNxProperties(nxProperties)
         setUpdatingNxProperties(false)
        }
      })
      .catch(qErr=>{
        setUpdatingNxProperties(false)
        console.log('error getting qField', qErr)
      }))
     return () => qField.removeAllListeners()
    }
  },
  [qField]);
  return {qField, nxProperties, updatingNxProperties, qLoading, qError}
}

export default useQFieldHandler;
