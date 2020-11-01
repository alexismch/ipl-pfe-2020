import React, {useContext, useState} from "react"
import {leaveRoom, sendMessage} from "services/Socket";
import Context from "contexts/RoomsContext";

export const newMessageHandler = (type: string, id: string, msg: string = '') => {
    const d = document.createElement("div");
    switch (type) {
        case 'room left':
            msg = id + ' left the room';
            break;
        case 'room joined':
            msg = id + ' joined the room';
            break;
        case 'new message':
            const s = document.createElement("strong");
            s.append(id);
            d.append(s);
            d.append(" : ");
    }
    d.append(msg);
    const elt = document.getElementById('chatBox');
    if (elt) elt.append(d)
}

const RoomChat = () => {
    const {setCurrentRoom} = useContext<any>(Context)

    const [newMessage, setNewMessage] = useState("");

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        sendMessage(newMessage);
        setNewMessage("");
    }

    const changeHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewMessage(e.target.value);
    }

    const clickHandler = () => {
        setCurrentRoom("")
        leaveRoom();
    }

    return (
        <div>
            <div id="chatBox">

            </div>
            <form onSubmit={submitHandler}>
                <input value={newMessage} onChange={changeHandler}/>
                <button type="submit">Submit Message</button>
            </form>
            <button onClick={clickHandler}>Leave</button>
        </div>
    )
}

export default RoomChat