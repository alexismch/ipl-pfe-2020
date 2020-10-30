import React, {useState} from "react"

const Context = React.createContext(null)

const ProviderWrapper = (props: { children: React.ReactNode }) => {
    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState("")

    const setAllRooms = (allRooms: []) => {
        setRooms(allRooms)
    }

    const addRoom = (room_id: string) => {
        // @ts-ignore
        setRooms(oldRooms => [...oldRooms, room_id])
    }

    const exposedValue = {
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        setAllRooms,
        addRoom
    }

    // @ts-ignore
    return <Context.Provider value={exposedValue}>
        {props.children}
    </Context.Provider>
}

export {
    Context,
    ProviderWrapper
}

export default Context