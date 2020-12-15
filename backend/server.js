const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('./config')
const app = express()
const router = require('./routes')
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('../frontend'))

app.use(router)

mysql.connect((error) => {
    if (error) {
        console.log('Could not connect to the database.')
    } else {
        console.log('Successfully connected to the database.')
    }
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

  server.listen(5005, () => {
    console.log('Server running on port 5005.')
  })


