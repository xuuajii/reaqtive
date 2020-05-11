import React from 'react'
import {RqtvNavbar} from '@reaqtive/components'

const MyRqtvNavbar = props => {
  return(
  <>
    <div className="border border-primary">
      <RqtvNavbar
        showSideMenuToggle={false}
        title="RqtvNavbar"
        fixedTop={true}
      />
      <div className="container py-5">
        <p>Below your content</p>
      </div>
    </div>
  </>
  )

}

export default MyRqtvNavbar
