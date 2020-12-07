import React, {Fragment} from 'react'


const SearchResults = props => {
  const {searchResults,scrollHandler}=props
  //console.log(searchResults)
  if(!searchResults){
    return <></>
  }
  if(searchResults&&searchResults.qSearchGroupArray.length>1){
    return(
      <>
      <div style={{maxHeight:scrollHandler.fillers.top||0,minHeight:scrollHandler.fillers.top||0, height:scrollHandler.fillers.top||0}}/>
        <ul className="list-group">
            {searchResults.qSearchGroupArray.map((qSearchGroup, index) =>
              <SearchGroup
                key={qSearchGroup.qId+index}
                qFieldName = {qSearchGroup.qItems[0].qIdentifier}
                matches = {qSearchGroup.qItems[0].qItemMatches}
                selectSearchResults={props.selectSearchResults}
                qId={qSearchGroup.qId}
                clearSearch={props.clearSearch}
              />
            )}
        </ul>
      <div style={{maxHeight:scrollHandler.fillers.bottom||0, minHeight:scrollHandler.fillers.bottom||0, height:scrollHandler.fillers.bottom||0}}/>
      </>
    )
  }
  if(searchResults&&searchResults.qSearchGroupArray.length===1){
    const searchGroupItem = searchResults.qSearchGroupArray[0].qItems[0];
    return (<SingleSearchGroup
              qFieldName = {searchGroupItem.qIdentifier}
              matches={searchGroupItem.qItemMatches}
              selectSearchResults={props.selectSearchResults}
              clearSearch={props.clearSearch}
              titleEl = {props.titleEl}
              itemHeight={props.singleFieldItemHeight}
            />)
  }
}

const SearchGroup = props =>
  <li className="list-group-item search-result-group">
    <h6>
      <span className="badge badge-secondary" onClick={props.selectFieldMatches} data-q-id={props.qId}>
          {props.qFieldName}
      </span>
    </h6>
    <div className="search-result-matches-container">
      {props.matches.map((match, index)=>
        <Fragment key={match.qText+index}>
          <span
            className="search-result-match"
            onClick={(searchString, qId)=>props.selectSearchResults(match.qText)}
          >
            {match.qText}
          </span>
          <span >
            {index<props.matches.length-1?', ':' '}
          </span>
        </Fragment>
      )}
    </div>
  </li>

  const SingleSearchGroup = props =>{
    return(
    <div className="single-search-group">
      <h6 className="h6" ref={props.titleEl}>
          {props.qFieldName}
      </h6>
      <ul className="list-group">
        {props.matches.map(match=>
            <li
              key={match.qText}
              className="list-group-item"
              onClick={(searchString)=>props.selectSearchResults(match.qText)}
              style={{height:props.itemHeight}}
            >
              {match.qText}
            </li>
          )}
      </ul>
    </div>
  )
}

export default SearchResults
