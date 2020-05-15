import React, {useState, useEffect, useContext} from 'react'
import  RqtvRenderer from './rqtv-renderer'
import {QDoc} from '@reaqtive/q'
import {QGlobal} from '@reaqtive/q'
import {QCapabilityApi} from '@reaqtive/q'
import {QApp} from '@reaqtive/q'
import RqtvAppLoading from './rqtv-app-loading'
import RqtvAppError from './rqtv-app-error'
//import {conditionalDelay} from '../../../helpers'

//export default
function conditionalDelay(delay){
   return (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_LOCAL_AS_PROD==='FALSE')?0:delay
}

const RqtvAppRenderer = props => {
  const appLauncher = useRqtvAppLauncher(props.qCapabilityApiRequired, props.triggerDone)
  return (
    <RqtvRenderer
      loading={appLauncher.loading}
      error={appLauncher.error}
      customLoading={<RqtvAppLoading value={appLauncher.progress*100} height={3}/>}
      customError={<RqtvAppError errorMessage={appLauncher.errorMessage}/>}
    >
      {props.children}
    </RqtvRenderer>
  )
}

const useRqtvAppLauncher = (qCapabilityApiRequired, triggersDone) =>{
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [progress, setProgress] = useState(0)
  const qDocHandler = useContext(QDoc)
  const qGlobalHandler = useContext(QGlobal)
  const qCapabilityApiHandlerContext = useContext(qCapabilityApiRequired===true?QCapabilityApi:{})
  const qAppHandlerContext = useContext(qCapabilityApiRequired===true?QApp:{})
  const qCapabilityApiHandler = qCapabilityApiHandlerContext?qCapabilityApiHandlerContext:{qLoading:false, qError:false}
  const qAppHandler = qAppHandlerContext?qAppHandlerContext:{qLoading:false, qError:false}
  const contextValues = {
    qCapabilityApi: qCapabilityApiRequired?0.3:0,
    qApp:qCapabilityApiRequired?0.3:0,
    qDoc:qCapabilityApiRequired?0.2:0.5,
    qGlobal:qCapabilityApiRequired?0.2:0.5
  }
  const updateProgress= (increment,context) => {
    const updatedProgress = !(context.qError)?progress+increment:progress+0.1;
    //console.log(updatedProgress)
    if(context.qError){
      setErrorMessage(context.qError.rqtvMessage)
    }
    const progressWithTrigger = triggersDone?updatedProgress:Math.min(0,updatedProgress-0.05)
    setProgress(updatedProgress)
  }
  useEffect(()=>{
    !(qDocHandler.qLoading) && updateProgress(contextValues.qDoc, qDocHandler)
  }, [qDocHandler.qLoading])
  useEffect(()=>{
    !(qGlobalHandler.qLoading) && updateProgress(contextValues.qGlobal, qGlobalHandler)
  }, [qGlobalHandler.qLoading])
  useEffect(()=>{
    !(qAppHandler.qLoading) && updateProgress(contextValues.qApp, qAppHandler)
  }, [qAppHandler.qLoading])
  useEffect(()=>{
    !(qCapabilityApiHandler.qLoading) && updateProgress(contextValues.qCapabilityApi, qCapabilityApiHandler)
  }, [qCapabilityApiHandler.qLoading])
  useEffect(()=>{
    //console.log(errorMessage)
    const hasError = qAppHandler.qError||qDocHandler.qError||qGlobalHandler.qError||qCapabilityApiHandler.qError?true:false
    const loadingComplete = progress===1||hasError?true:false;
    const set = ()=>{
      setTimeout(()=>setLoading(!loadingComplete), conditionalDelay(700))
      setError(hasError)
    }
    setTimeout(set, conditionalDelay(500))
  },[progress])
  return {progress, loading, error, errorMessage }
}

export default RqtvAppRenderer
