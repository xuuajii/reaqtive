//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {SearchInput} from '@reaqtive/layout'

const Search = props => <div className="search-container" ref={props.searchEl}><SearchInput {...props}/></div>

export default Search
