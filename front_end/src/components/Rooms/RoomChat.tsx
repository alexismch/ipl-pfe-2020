import React, {useContext, useState} from "react"
import {leaveRoom, sendMessage} from "services/Socket";
import Context from "contexts/RoomsContext";

export const newMessageHandler = (id: string, msg: string) => {
    const d = document.createElement("div");
    const s = document.createElement("strong");
    s.append(id);
    d.append(s);
    d.append(" : ");
    d.append(msg);
    // @ts-ignore
    document.getElementById('chatBox').append(d)
}

const RoomChat = () => {
    // @ts-ignore
    const {setCurrentRoom} = useContext(Context)

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

// @ts-ignore
export default RoomChat