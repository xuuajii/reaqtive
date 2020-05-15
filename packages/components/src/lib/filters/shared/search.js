import React from 'react'
import {SearchInput} from '@reaqtive/layout'

const Search = props => <div className="search-container" ref={props.searchEl}><SearchInput {...props}/></div>

export default Search
