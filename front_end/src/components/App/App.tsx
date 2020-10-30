import React, {useContext, useEffect} from "react"
import {disconnectSocket, initSocket, listenMessages, listenRooms} from "services/Socket";
import Context from "contexts/RoomsContext";
import IdleRooms from "components/Rooms/IdleRooms";
import RoomChat, {newMessageHandler} from "components/Rooms/RoomChat";

const App = () => {
    // @ts-ignore
    const {currentRoom, setAllRooms, addRoom} = useContext(Context)

    addRoom.bind(this)

    useEffect(() => {
        initSocket(setAllRooms)
        listenRooms(addRoom)
        listenMessages(newMessageHandler)

        return () => {
            disconnectSocket();
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {
                currentRoom ? <RoomChat/> : <IdleRooms/>
            }
        </div>
    )
}

export default App