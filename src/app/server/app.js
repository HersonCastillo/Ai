var io = require("socket.io").listen(8080).sockets;
io.on('connection', function(socket){
    socket.on('mensaje', function(d){
        io.emit('mensaje', d);
    }) // io/emit de ejemplo
});