//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useRef, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'
import {SearchInput} from '@reaqtive/layout'
import SearchResults from './search-results'
import {useOutsideEventListener} from '@reaqtive/layout'
import { useDebouncedCallback } from 'use-debounce';
import {useQGlobalSearch} from '@reaqtive/q'
import {useScrollHandler} from '@reaqtive/q'
import {RqtvRenderer} from '../index'

const AnimatedInput = props => {
  const { expandFrom, focus, width } = props ;

    const wrapperStyles={
      transformOrigin:expandFrom,
      position:'absolute',
      top:0,
      left:0,
      width:width,
      transformStyle: 'preserve-3d'
    }

    const animatedProps = useSpring({
      from: { transform: `scaleX(0)`, opacity:0.5, transformStyle: 'preserve-3d'},
      to: { transform: `scaleX(${focus?1:0})`, opacity:focus?1:0.5 }
    })
  //console.log(focus)
  return (
    <animated.div style={{...wrapperStyles, ...animatedProps}}>
      <SearchInput
        {...props}
        hideWhenDeleteString={false}
      />
    </animated.div>
  )
}

const RqtvSearch = props => {

    const [searchString, setSearchString] = useState()
    const [showResults, setShowResults] = useState(false)
    const [qArea, setQArea] = useState({qTop:0, qLeft:0, qHeight:10, qWidth:1})
    const qSearchResultsHandler = useQGlobalSearch(props.searchFields, searchString, qArea.qTop, 10)
    const qSearchResults=qSearchResultsHandler.qSearchResults;

    const searchResultsEl = useRef()
    const containerEl = useRef()
    useOutsideEventListener(containerEl, ()=>clearSearch(), showResults)
    const [scrollPosition, setScrollPosition] = useState({top:0, left:0})
    const [size, setSize] = useState({qcy:1,qcx:1})

    const getScrollData = (qDisplayArea) => {
      //setSearchOffset(qDisplayArea.qTop)
      setQArea({qTop:qDisplayArea.qTop, qLeft:0, qHeight:10, qWidth:1})
      //searchResultsEl.current.scrollTop=scrollPosition.top;
    }

    const scrollHandler = useScrollHandler(
      scrollPosition,
      qArea,
      size,
      searchResultsEl.current&&searchResultsEl.current.clientHeight,
      78,
      0.2,
      getScrollData
     )
    const [handleScroll] = useDebouncedCallback(
      // function
      (target) => {
        setScrollPosition({top:searchResultsEl.current.scrollTop, left:searchResultsEl.current.scrollLeft});
      },
      // delay in ms
      //props.debounceDelay
      200
    );

    const handleChangeString = string => {
      //console.log(1111, qSearchResultsHandler.qEngineError.qError)
      setSearchString(string)
      setShowResults(true)
    }
    const clearSearch = () => {
      searchResultsEl.current.scrollTop=0;
      setShowResults(false)
      setSearchString()
      props.hideSearch()
    }

    const retry = () => {
      qSearchResultsHandler.search(searchString)
    }

    const acceptSearchResult = (searchTerm=searchString) =>{
      qSearchResultsHandler.selectSearchResults(searchTerm,0, clearSearch())
    }

    useEffect(()=>{
      setSize({qcy:(qSearchResults&&qSearchResults.qTotalNumberOfGroups)||0,qcx:1})
    }, [qSearchResults])

    const searchResultGroupHeight=88;
    const singleFieldItemHeight=48;
    const manySearchResultHeight = qSearchResults&&qSearchResults.qTotalNumberOfGroups===1&&((qSearchResults.qSearchGroupArray[0].qItems.length*singleFieldItemHeight)+singleFieldItemHeight)
    const singleSearchResultHeight = qSearchResults&&qSearchResults.qTotalNumberOfGroups===1&&((qSearchResults.qSearchGroupArray[0].qItems.length*singleFieldItemHeight)+singleFieldItemHeight)
    const searchResultHeight = qSearchResults&&qSearchResults.qTotalNumberOfGroups?Math.min(
      isNaN(props.resultsHeight)?Infinity:props.resultsHeight,
      qSearchResults&&qSearchResults.qTotalNumberOfGroups>1?qSearchResults.qTotalNumberOfGroups*searchResultGroupHeight
      :
      ((qSearchResults.qSearchGroupArray[0].qItems.length*singleFieldItemHeight)+singleFieldItemHeight)
    ):0
    const titleEl = useRef()
    const singleTitleHeight=titleEl.current&&titleEl.current.offsetHeight;
    const dropdownMenuStyle=singleSearchResultHeight?{minHeight:singleSearchResultHeight+(singleTitleHeight||0)}:{}
    return (
      <>
        <div className={`rqtv-search dropdown ${showResults ? 'show' : ''}`} ref={containerEl}>
          <AnimatedInput
            searchAction={handleChangeString}
            clearSearchAction={()=>clearSearch()}
            acceptSearchAction={acceptSearchResult}
            hideSearch={props.hideSearch}
            placeholder={props.placeholder}
            focus={props.show}
            expandFrom={props.expandFrom}
            width={props.width}
          />

          <div
            className={`dropdown-menu ${showResults?'show':''} search-results-container`}
            onScroll={(e)=>handleScroll(e.target)}
            ref={searchResultsEl}
            style={dropdownMenuStyle}
          >
            {searchString&&<RqtvRenderer
              loading={qSearchResultsHandler.qLoading}
              error={qSearchResultsHandler.qEngineError}
              noData ={ qSearchResults&&qSearchResults.qSearchGroupArray.length===0}
              reload={retry}
            >
              <div
                style={{width:props.resultsWidth, height:searchResultHeight, maxHeight:'100%'}}
              >
                {showResults&&
                  <SearchResults
                    searchResults={qSearchResults}
                    scrollHandler={scrollHandler}
                    selectSearchResults={acceptSearchResult}
                    titleEl = {titleEl}
                    singleFieldItemHeight={singleFieldItemHeight}
                  />
                }
              </div>
            </RqtvRenderer>}
          </div>
        </div>
      </>
    )
}

RqtvSearch.propTypes = {
  resultshHeight:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  resultsWidth:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  searchFields:PropTypes.array,
  useBackdrop:PropTypes.bool,
  backdropStyle:PropTypes.object,
  placeholder:PropTypes.string
}

RqtvSearch.defaultProps = {
  resultsHeight:500,
  fields:[],
  usebackdrop:false,
  backdropStyle:{},
  searchFields:[],
}

export default RqtvSearch;
