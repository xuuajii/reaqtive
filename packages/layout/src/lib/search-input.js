//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types';

const SearchInput = (props) =>{
  const searchInputEl = useRef()

  const[searchString, setSearchString] = useState()

  useEffect(()=>{
    if(props.focus===true){
      searchInputEl.current.focus()
    }
  }, [props.focus])

  useEffect(()=>{
    if(props.focus===true){
      searchInputEl.current.focus()
    }
  }, [searchInputEl, props.focus])

  const handleKeyUp = (e) => {
    const keyCode = e.keyCode
    switch(keyCode){
      case 27:
        props.clearSearchAction()
        resetSearchInput()
      break;
      case 13:
        props.acceptSearchAction()
        resetSearchInput()
      break;
      default:
        if(searchInputEl.current.value.length>0){
          setSearchString(searchInputEl.current.value)
        } else {
          props.clearSearchAction()
          resetSearchInput()
        }
    }
  }

  function resetSearchInput(){
    setSearchString(null)
    searchInputEl.current.value=null
  }

  function handleBlur(){
    setSearchString(null)
    searchInputEl.current.value=null
  }

  function hideSearch(){
    props.clearSearchAction&&props.clearSearchAction()
    props.hideSearch&&props.hideSearch()
  }

  useEffect(()=>{
    //console.log(searchString)
    searchString&&props.searchAction(searchString)
  },
  [searchString])

  return (
    <div className="rqtv-search-input-group">
      <input
        className="form-control"
        ref={searchInputEl}
        placeholder={props.placeholder}
        onKeyUp={(e)=>handleKeyUp(e)}
        onBlur={()=>handleBlur()}
        onFocus={()=>props.onFocus&&props.onFocus()}
      />
      {(props.hideSearch && (!props.alwaysShowSearch || props.isSearching))&&
        <button className="hide-search" onClick={hideSearch}>
          <span className="lui-icon lui-icon--small lui-icon--close"></span>
        </button>
      }
    </div>
  )
}

export default SearchInput
SearchInput.propTypes={
  clearSearchAction:PropTypes.func.isRequired,
  searchAction:PropTypes.func.isRequired,
  acceptSearchAction:PropTypes.func.isRequired,
  placeholder:PropTypes.string,
  focus:PropTypes.bool
}

SearchInput.defaultProps={
  placeholder:"Search",
  focus:true,
}
