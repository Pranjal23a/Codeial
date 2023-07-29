module.exports.chatSockets = function (socketServer) {
    const io = require('socket.io')(socketServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });


    io.sockets.on('connection', function (socket) {
        console.log('New Connection Received', socket.id);

        socket.on('disconnect', function () {
            console.log('Socket Disconnected!');
        });

        socket.on('join_room', function (data) {
            console.log('Joining request received', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data)
        })
    });

}