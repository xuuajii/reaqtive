import React from 'react'

const EndSelectionButtons = props =>
<div className={"end-selections-buttons"} hidden={!props.isSelecting}>
  <button className="icon-wrapper text-danger" onClick={(e)=>props.endSelections(e.target.dataset.qAccept)} data-q-accept={0}>
      <span className="lui-icon  lui-icon--close" data-q-accept={0} aria-hidden="true"></span>
  </button>
  <button className="icon-wrapper text-success" onClick={(e)=>props.endSelections(e.target.dataset.qAccept)} data-q-accept={1}>
      <span className="lui-icon  lui-icon--tick" aria-hidden="true" data-q-accept={1}></span>
    </button>
</div>

export default EndSelectionButtons
