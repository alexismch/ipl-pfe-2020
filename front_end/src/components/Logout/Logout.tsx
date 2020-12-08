import React, {useEffect} from 'react'

const Logout = ({setConnectedType}) => {

    localStorage.removeItem("Token");
    localStorage.removeItem("Type_BlockCovid");
    useEffect(() => {
        setConnectedType("");
    })
    return null;
}

export default Logout