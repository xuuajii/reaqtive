//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {useQFieldHandler} from '@reaqtive/q'

const RqtvListObject = props => {
  const {isSelecting, setIsSelecting} = props.qLayoutHandler
  const qLayout=props.qLayoutHandler&&props.qLayoutHandler.qLayout
  const qDimensionInfo = qLayout&&qLayout.qListObject.qDimensionInfo
  const [isMounted, setIsMounted] = useState(true)
  useEffect(()=>{
    return ()=>setIsMounted(false)
  },[])
  useEffect(()=>{
    if(isSelecting===true){
      props.onBeginSelections&&props.onBeginSelections()
    }
    if(isSelecting===false){
      props.onEndSelections&&props.onEndSelections()
    }
  },[isSelecting])

  const [isSearching, setIsSearching] = useState(false)
  const [isGettingScrollData, setIsGettingScrollData] = useState(false)
  const [errorGettingScrollData, setErrorGettingScrollData] = useState(false)
  const qFieldName = qLayout&&qDimensionInfo.qGroupFieldDefs[qLayout&&qDimensionInfo.qGroupPos]
  const activeField = useQFieldHandler(qFieldName, props.alwaysOneSelected, props.defaultValue)
  const [qTop, setQTop] = useState(0)
  const qObject = props.qObjectHandler&&props.qObjectHandler.qObject
  //console.log(isSelecting)

  const scroll = (qDisplayArea, callback) => {
    qObject.getListObjectData('/qListObjectDef',[qDisplayArea])
    .then(qNewDataPage=>{
      props.qLayoutHandler.applyQLayoutPatch('qLayout/qListObject/qDataPages', qNewDataPage)
      callback()
    })
    .catch(qErr=>{
      console.log(qErr)
      callback()
    })
  }
  const updateDisplayArea = (qObject, qDisplayArea) => {
    setIsGettingScrollData(true)
    scroll(qDisplayArea, ()=>setIsGettingScrollData(false))
  }
  useEffect(()=>{
    const qDisplayArea = qLayout&&qLayout.qListObject.qDataPages[0].qArea
    //console.log(qDisplayArea&&qDisplayArea.qTop)
    props.qLayoutHandler.setOnUpdate({fn:(callback)=>scroll(qDisplayArea, ()=>callback())})
  },[qLayout&&qLayout.qListObject.qDataPages[0].qArea.qTop])

  const rqtvListObject = {
    isSelecting:isSelecting,
    isSearching:isSearching,
    setIsSearching:setIsSearching,
    isGettingScrollData:isGettingScrollData,
    activeField:qFieldName,
    beginSelections : (value, callback=console.log) => {
       setIsSelecting(true)
       qObject.beginSelections(['/qListObjectDef'])
       .then(qResult=> {
           //console.log(qResult)
           qObject.selectListObjectValues('/qListObjectDef',[value], true)
         }
       )
       .catch(qErr=> {
         setIsSelecting(false)
         callback(qErr)
       })
    },

    selectValue : (value, callback) => {
      if(activeField.nxProperties&&activeField.nxProperties.qOneAndOnlyOne===true ||props.toggle===false){
        qObject.selectListObjectValues('/qListObjectDef',[value], false)
        .then(qResult=>{
          props.onSelect(qResult)
          callback&&callback(qResult)
        })
        .catch(qErr=>{
          console.log(qErr)
          callback&&callback(qErr)
        })
      }
      else{
        rqtvListObject.toggleSelect(value, callback)
      }
    },

    toggleSelect : (value, callback) => {
		 isSelecting===true || props.quickSelectMode===true
     ?qObject.selectListObjectValues('/qListObjectDef',[value], true).then(qResult=>{
       props.onSelect(qResult)
       callback&&callback(qResult)
     }).catch(qErr=>{
       console.log(qErr)
       callback&&callback(qErr)
     })
     :rqtvListObject.beginSelections(value)
    },

    endSelections : (qAccept, callback) => {
			//console.log(callback)
			const isQAccepting=qAccept==='1'||qAccept===true?true:false
      setIsSelecting(false)
      qObject.endSelections(isQAccepting)
      .then(qRes=>{
        //console.log(1)
        callback&&callback();
      })
      .catch(qErr=>callback(qErr))
    },

    searchListObjectFor : (string) => {
			//console.log(1,string)
      setIsSearching(true)
      qObject.searchListObjectFor('/qListObjectDef', string)
			.catch(qErr=>console.log(qErr))
		},

		acceptListObjectSearch : () => {
      setIsSearching(false)
			qObject.acceptListObjectSearch('/qListObjectDef', true)
			.catch(qErr=>console.log(qErr));
		},

		abortListObjectSearch : () => {
			qObject.abortListObjectSearch('/qListObjectDef')
      .then(setIsSearching(false))
      .catch(qErr=>console.log(qErr));
		},

		clearSelections : (callback) => {
			qObject.clearSelections('/qListObjectDef').catch(qErr=>callback&&callback(qErr));
		},

		selectPossible : (callback) => {
			qObject.selectListObjectPossible('/qListObjectDef').catch(qErr=>callback(qErr));
		},

		selectExcluded : (callback) => {
			qObject.selectListObjectExcluded('/qListObjectDef').catch(qErr=>callback(qErr));
		},

    // Retrieve scroll data. Data is fetched by this component
    // then sent to the layout as a patch with is path
    getNewDataPage: (qDisplayArea) => {
        updateDisplayArea(qObject, qDisplayArea)
    }
  }
  const childrenArray = React.Children.toArray(props.children)
  const enhancedChildren = childrenArray.map(child=>React.cloneElement(child, {...props, rqtvListObject}))
  return enhancedChildren&&isMounted===true?enhancedChildren:null
}

RqtvListObject.propTypes={
  toggle:PropTypes.bool,
  alwaysOneSelected:PropTypes.bool,
  defaultValue:PropTypes.string,
  quickSelectMode:PropTypes.bool,
  onSelect:PropTypes.func,
  onBeginSelections:PropTypes.func,
  onEndSelections:PropTypes.func
}

RqtvListObject.defaultProps={
  alwaysOneSelected:false,
  defaultValue:null,
  toggle:true,
  quickSelectMode:false,
  onSelect:()=>true,
  onBeginSelections:()=>true,
  onEndSelections:()=>true
}

export default RqtvListObject
