import React from "react"
import AddRoom from "components/Rooms/AddRoom";
import Rooms from "components/Rooms/Rooms";

const IdleRooms = () => {
    return (
        <div>
            <Rooms/>
            <AddRoom/>
        </div>
    )
}

export default IdleRooms