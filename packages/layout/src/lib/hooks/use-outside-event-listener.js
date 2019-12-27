//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect} from 'react'

const useOutsideEventListener = (ref, fn, add,events=['mousedown', 'touchstart']) =>{
  const [hasListener, setHasListener] = useState(null);
  //console.log(add)
  function checkoutsideClick(e){
    if(ref.current&&!ref.current.contains(window.event.target)){
      //console.log(1)
      fn()
    }
  }

  function handleOutsideEventListener(){
    if(add===true){
      //console.log('add')
      events.forEach(event => document.addEventListener(event, checkoutsideClick, false));
      setHasListener(true)
    }else{
      //console.log('remove')
      events.forEach(event => document.removeEventListener(event, checkoutsideClick, false));
      setHasListener(false)
    }
  }

  useEffect(
    () => {handleOutsideEventListener()
    return () => {
      //console.log('remove')
      events.forEach(event => document.removeEventListener(event, checkoutsideClick, false));
      setHasListener(false)
    }},
    [add, fn, handleOutsideEventListener, checkoutsideClick]
  );
  return hasListener
}

export default useOutsideEventListener
