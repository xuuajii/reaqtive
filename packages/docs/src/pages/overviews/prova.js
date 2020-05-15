import React, {useContext} from 'react'
import { RqtvAppContext } from "@reaqtive/components";
const Prova = (props) => {
    const rqtvApp = useContext(RqtvAppContext);
    console.log("----------------",props)
    return(
        <p>Prova</p>
    )
}

export default Prova;