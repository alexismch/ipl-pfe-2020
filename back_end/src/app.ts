const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const active_rooms = new Map()

server.listen(4001);

const defaultNamespace = io.of('/');

function register(socket: any) {
    socket.join('no room');
}

defaultNamespace.use(
    (socket: any, next: any) => {
        register(socket);
        next();
    }
).on('connection',
    (socket: any) => {
        let room: string = '';

        socket.emit('active rooms', Array.from(active_rooms.keys()));

        socket.on('add room',
            (room_id: string) => {
                active_rooms.set(room_id, new Set());
                console.log('new room added: ' + room_id);
                io.to('no room').emit('new room', room_id);
            }
        );

        socket.on('join room',
            (room_id: string) => {
                let roomSet = active_rooms.get(room_id);
                if (roomSet === null || roomSet === undefined) {
                    roomSet = new Set();
                }
                roomSet.add(socket.id);
                active_rooms.set(room_id, roomSet);
                socket.join(room_id);
                room = room_id;
                console.log(socket.id + ' joined room: ' + room);
                socket.leave('no room');
            }
        );

        socket.on('leave room', () => {
            console.log(socket.id + ' left room: ' + room);
            socket.leave(room);
            socket.join('no room');
            room = '';
            socket.emit('active rooms', Array.from(active_rooms.keys()));
        });

        socket.on('new message', (msg: string) => {
            io.to(room).emit('new message', socket.id, msg);
        });
    }
);