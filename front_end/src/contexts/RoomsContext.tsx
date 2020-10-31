import React, {useState} from "react"

const Context = React.createContext({})

const ProviderWrapper = (props: { children: React.ReactNode }) => {
    const [rooms, setRooms] = useState<string[]>([])
    const [currentRoom, setCurrentRoom] = useState<string>("")

    const setAllRooms = (allRooms: []) => {
        setRooms(allRooms)
    }

    const addRoom = (room_id: string) => {
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

    return <Context.Provider value={exposedValue}>
        {props.children}
    </Context.Provider>
}

export {
    Context,
    ProviderWrapper
}

export default Context