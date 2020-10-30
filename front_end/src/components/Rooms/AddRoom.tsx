import React, {useState} from "react"
import {addRoom} from "services/Socket";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState("")

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setNewRoom("")
        addRoom(newRoom);
    }

    const changeHandler = (e: { target: { value: any; }; }) => setNewRoom(e.target.value)

    return <div>
        <form onSubmit={handleSubmit}>
            <input value={newRoom} onChange={changeHandler}/>
            <button type="submit">Add Room</button>
        </form>
    </div>
}

export default AddRoom