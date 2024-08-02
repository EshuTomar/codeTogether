const express =require('express');

const app = express();
const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

// {
//     "djgfgfagfjlkshnfl": "eshu tomar",
//     "jfhkufhjksdbvjkf" :"prince"
// }

const getAllConnectedClients = (roomId)=>{
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId)=>{
            return {
                socketId,
                username: userSocketMap[socketId],
            }
        }
    )
       
        
          
}

io.on('connection', (socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on('join', ({roomId, username}) =>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
         console.log(clients);
        // notify to all users that new user has joined 
         clients.forEach(({socketId})=>{
            io.to(socketId).emit('joined',{
                clients,
                username,
                socketId: socket.id,
            })
         })
    });


    socket.on('code-change',({roomId, code}) => {
        socket.in(roomId).emit('code-change',{code});
    })

    // new user will got the already written code
    socket.on("sync-code", ({socketId, code})=>{
        io.to(socketId).emit("code-change", {code});
    });



    socket.on('diconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit('diconnected', {
                socketId: socket.id,
                username: userSocketMap[socket.id],
    
            });
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })
})



const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("server is running "))