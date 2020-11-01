import socketIOClient from 'socket.io-client';

const production  = 'https://ipl-pfe-2020-dev.herokuapp.com/';
const development = 'http://127.0.0.1';
let socket: SocketIOClient.Socket;

export const initSocket = (cb: any) => {
    socket = socketIOClient(process.env.NODE_ENV ? production : development);

    socket.on('active rooms', (rooms: any) => {
        cb(rooms)
    })

    socket.on('disconnect', () => console.log("disconnected"))
}

export const off = (trigger: string) => {
    socket.off(trigger);
}

export const addRoom = (room_id: string) => {
    if (room_id !== "")
        return socket.emit('add room', room_id);
}

export const disconnectSocket = () => {
    return socket.disconnect();
}

export const listenRooms = (cb: any) => {
    socket.on('new room', (room_id: string) => {
        return cb(room_id);
    });
}

export const joinRoom = (room_id: string) => {
    socket.emit('join room', room_id);
}

export const leaveRoom = () => {
    socket.emit('leave room');
}

export const listenMessages = (cb: any) => {
    socket.on('room joined', (id: string) => {
        cb('room joined', id);
    });

    socket.on('new message', (id: string, msg: string) => {
        return cb('new message', id, msg);
    });

    socket.on('room left', (id: string) => {
        cb('room left', id);
    });
}

export const sendMessage = (msg: string) => {
    socket.emit('new message', msg);
}