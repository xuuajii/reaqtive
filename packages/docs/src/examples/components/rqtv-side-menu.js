import React, {useState} from 'react'
import {RqtvSideMenu, RqtvSideMenuMain} from '@reaqtive/components'

const MyRqtvSideMenu = props => {
  const [open, setOpen] = useState(false)

  const toggleSideMenu = () => {
    setOpen(!open)
  }

  const closeSideMenu = () => {
    setOpen(false)
  }

  return(
    <div style={{position:'relative'}}>
      <RqtvSideMenu
        isOpen={open}
        onClose={closeSideMenu}
      >
        <div className="text-light text-center">Here you can display your content</div>
      </RqtvSideMenu>
      <RqtvSideMenuMain isOpen={open}>
        <div className="container-fluid border border-primary">
          <div className="my-2">
            <button className="btn btn-primary" onClick={toggleSideMenu}>Toggle Menu</button>
          </div>
          <div className="py-2">Your content Here</div>
        </div>
      </RqtvSideMenuMain>
    </div>
  )
}

export default MyRqtvSideMenu
