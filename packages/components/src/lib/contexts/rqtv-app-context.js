//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext} from 'react';
import { useLocation } from "react-router-dom";
import _ from 'lodash'
import PropTypes from 'prop-types';
import Logo from './logo.png'
import {useQObjectHandler} from '@reaqtive/q'
import {useQLayoutHandler} from '@reaqtive/q'
import {QDoc} from '@reaqtive/q'
import {System} from '@reaqtive/layout'
import wildMatch from './wild-match'
import {useEnhancedFieldList} from '@reaqtive/q'

const RqtvAppContext = React.createContext()
const qFieldListDef = {
  "qInfo": { "qId": "", "qType": "FieldList" },
  "qFieldListDef": {
    "qShowSystem": false,
    "qShowHidden": false,
    "qShowSemantic": true,
    "qShowSrcTables": true
  }
}

const qCurrentSelectionsDef = {
  "qInfo": {
    "qId": "",
    "qType": "SessionLists"
  },
  "qSelectionObjectDef": {} ,
  qSelections: null,
  qFields: null
}

const RqtvAppContextConsumer = (props) => {
  const {theme, brand, title, brandUrl, brandStyle, hidePrefix, pages, sideMenuFieldsMatch, searchFieldMatch}=props

  /******************************************************/
  // qDoc app settings: get all objects and data
  //which are managed directly by the qDoc and that are used in RqtvApp (current selections and field list)
  /******************************************************/
  const qDocHandler = useContext(QDoc)
  const [qDoc, setQDoc] = useState(null)

  useEffect(()=>{
    setQDoc(qDocHandler.qDoc)
  },[qDocHandler])

  const qFieldListHandler = useQObjectHandler(qDoc, qFieldListDef)
  const qFieldListLayoutHandler = useQLayoutHandler(qFieldListHandler.qObject)
  const qCurrentSelectionsHandler = useQObjectHandler(qDoc, qCurrentSelectionsDef)
  const qCurrentSelectionsLayoutHandler = useQLayoutHandler(qCurrentSelectionsHandler.qObject)
  const qFieldList = qFieldListLayoutHandler.qLayout
  const qCurrentSelections = qCurrentSelectionsLayoutHandler.qLayout
  const enhancedFieldList = useEnhancedFieldList(qFieldList&&qFieldList.qFieldList, qCurrentSelections)

  const markField = (field, method, maskArray) => {
    const keep = method==='include'?true:false
    const match = maskArray.reduce((max, mask, index)=>{
      const matchResult = wildMatch(field.qName, maskArray[index])||max
      return keep?matchResult:!matchResult
    }, false)
    return{...field, match}
  }

  const filterFieldList = (fieldLsit, matchParams) =>
  fieldLsit&&fieldLsit.map(field=>markField(field, matchParams.method, matchParams.mask)).filter(field=>field.match===true)

  const sideMenuFieldList = filterFieldList(enhancedFieldList, sideMenuFieldsMatch)
  const searchFieldList = filterFieldList(enhancedFieldList, searchFieldMatch)

  /******************************************************/
  // handle layout settings (e.g. maximization) managed at app level
  /******************************************************/
  const system = useContext(System)
  const location = useLocation()

  const [isMaximized, setIsMaximized] = useState(false)
  const [scrollPostioMemo, setScrollPostioMemo] = useState()
  const scrollTo = (scrollPosition) => {
    const mainNode = system.getAppMainNode()
    mainNode.scrollTop=scrollPosition
  }
  useEffect(()=>{
    const mainNode = system.getAppMainNode()
    const maximize=()=>{
      setScrollPostioMemo(mainNode.scrollTop)
      system.hideOverflow()
      scrollTo(0);
    }
    const restore = () => {
      //console.log(isMaximized, scrollPostioMemo)
      system.showOverflow()
      scrollTo(scrollPostioMemo);
      setScrollPostioMemo(0)
    }
    isMaximized?maximize():restore()
  }, [isMaximized])

  useEffect(()=>{
    setScrollPostioMemo(0)
    scrollTo(0);
    setIsMaximized(false)
  }, [location.pathname])

  return (
    <RqtvAppContext.Provider
      value={{
          theme,
          brand,
          title,
          brandUrl,
          brandStyle,
          hidePrefix,
          qFieldList,
          enhancedFieldList,
          qCurrentSelections,
          sideMenuFieldList,
          searchFieldList,
          filterFieldList,
          pages,
          setIsMaximized
        }}
    >
      {props.children}
    </RqtvAppContext.Provider>
  )
}

const RqtvAppContextProvider = (props) =>{
  return(
    <RqtvAppContextConsumer {...props}>
        {props.children}
    </RqtvAppContextConsumer>
  )
}

RqtvAppContextConsumer.propTypes={
  theme:PropTypes.shape({
    useRippleEffect:PropTypes.bool,
    useShadowEffect:PropTypes.bool,
    useAnimations:PropTypes.bool,
    selectionsHidePrefix:PropTypes.string
  }),
  title:PropTypes.string,
  brand:PropTypes.string,
  brandUrl:PropTypes.string,
  brandStyle:PropTypes.object,
  sideMenuFieldsMatch:PropTypes.shape({
    method:PropTypes.oneOf(['include', 'exclude']),
    mask:PropTypes.arrayOf(PropTypes.string)
  }),
  searchFieldMatch:PropTypes.shape({
    method:PropTypes.oneOf(['include', 'exclude']),
    mask:PropTypes.arrayOf(PropTypes.string)
  })
}

RqtvAppContextConsumer.defaultProps={
  theme:{
    useRippleEffect:true,
    useShadowEffect:true,
    useAnimations:true
  },
  title:'ReaqtivateApp',
  brand:Logo,
  brandUrl:'https://it.reactjs.org/',
  brandStyle:{height:40,
    width:40,
    alt:"",
    display:"inline-block",
    verticalAlign:'top',
  },
  hidePrefix:'%',
  sideMenuFieldsMatch:{method:'include', mask:['**']},
  searchFieldMatch:{method:'include', mask:['**']}
}

export {RqtvAppContext, RqtvAppContextProvider}
