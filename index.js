import express from 'express'
import http from 'http'
const app = express()
const port = process.env.PORT || 3000

const server = http.createServer(app)
import { Server } from 'socket.io'
const io = new Server(server)

app.use(express.static('public'))

app.get('/', (req, res) => {

    res.sendFile('/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    // console.log(socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    // io.emit('msg');
    // io.on('connection', (socket) => {
    //     socket.broadcast.emit('hi');
    //   });


})

// io.on('connection', (socket) => {

// });


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})