const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const active_rooms = new Map()

server.listen(80);

// @ts-ignore
app.get('/', (req, res) => {
    res.send('GET request to the homepage');
})

const defaultNamespace = io.of('/');

const register = (socket: any) => {
    socket.join('no room')
}

const unregister = (socket: any, room: string) => {
    defaultNamespace.to(room).emit('room left', socket.id);
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
                defaultNamespace.to('no room').emit('new room', room_id);
            }
        );

        socket.on('join room',
            (room_id: string) => {
                let roomSet = active_rooms.get(room_id);
                if (roomSet === null || roomSet === undefined) {
                    roomSet = new Set();
                }
                socket.join(room_id, () => {
                    roomSet.add(socket.id);
                    active_rooms.set(room_id, roomSet);
                    room = room_id;
                    console.log(socket.id + ' joined room: ' + room);
                    socket.leave('no room');
                    defaultNamespace.to(room).emit('room joined', socket.id);
                });
            }
        );

        socket.on('leave room', () => {
            socket.leave(room, () => {
                defaultNamespace.to(room).emit('room left', socket.id);
                let roomSet = active_rooms.get(room);
                roomSet.delete(socket.id);
                active_rooms.set(room, roomSet);
                console.log(socket.id + ' left room: ' + room);
                room = '';
                socket.join('no room', () => {
                    socket.emit('active rooms', Array.from(active_rooms.keys()));
                });
            });
        });

        socket.on('new message', (msg: string) => {
            defaultNamespace.to(room).emit('new message', socket.id, msg);
        });

        socket.on('disconnect', () => {
            unregister(socket, room);
        });
    }
);