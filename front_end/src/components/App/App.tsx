import React, {useContext, useEffect, useRef} from "react"
import {disconnectSocket, initSocket, listenRooms} from "services/Socket";
import Context from "contexts/RoomsContext";
import IdleRooms from "components/Rooms/IdleRooms";
import RoomChat from "components/Rooms/RoomChat";

const App = () => {
    const {currentRoom, setAllRooms, addRoom} = useContext<any>(Context)

    const refSetAllRooms = useRef(setAllRooms);
    const refaddRoom = useRef(addRoom);
    useEffect(() => {
        refSetAllRooms.current = setAllRooms;
        refaddRoom.current = addRoom;
    });

    useEffect(() => {
        initSocket(refSetAllRooms.current)
        listenRooms(refaddRoom.current)

        return () => {
            disconnectSocket();
        }
    }, [])

    return (
        <div>
            {
                currentRoom ? <RoomChat/> : <IdleRooms/>
            }
        </div>
    )
}

export default App