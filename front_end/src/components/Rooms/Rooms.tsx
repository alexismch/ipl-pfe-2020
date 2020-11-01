import React, {useContext} from "react"
import Context from "contexts/RoomsContext";
import {joinRoom} from "services/Socket";

const Rooms = () => {
    const {rooms, setCurrentRoom} = useContext<any>(Context)

    const clickHandler = (e: { currentTarget: { value: string; }; }) => {
        const room_id = e.currentTarget.value;
        joinRoom(room_id);
        setCurrentRoom(room_id);
    }

    return <div>
        <ul>
            {
                rooms.map(
                    (room: string) =>
                        <li key={room}>{room} <button onClick={clickHandler} value={room}>Join</button></li>
                )
            }
        </ul>
    </div>
}

export default Rooms