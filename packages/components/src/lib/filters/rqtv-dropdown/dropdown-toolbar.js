//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import Search from '../shared/search'
import EndSelectionsButtons from '../shared/end-selections-buttons'

const DropdownToolbar = props =>
<div className="btn-group dropdown-toolbar" ref={props.toolbarRef}>
  <div className="rqtv-search-container">
    {props.showSearch&&
        <Search
          searchAction={props.searchListObjectFor}
          clearSearchAction={props.abortListObjectSearch}
          acceptSearchAction={props.acceptListObjectSearch}
          focus={false}
          onFocus={props.onFocus}
          placeholder={props.placeholder}
        />
    }
  </div>
  {!(props.quickSelectMode)&&
    <EndSelectionsButtons
      endSelections={props.endSelections}
      isSelecting={props.isSelecting}
    />
  }
</div>

export default DropdownToolbar
