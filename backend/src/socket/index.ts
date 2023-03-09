import type { IServer } from './types'
import { Server } from 'socket.io'
import * as onEvents from './onEvents'
import { verify } from 'jsonwebtoken'
const io = <IServer>new Server({
  cors: {
    origin: 'http://localhost:5173',
  },
})
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token
//   if (!token) return
//   try {
//     const user = <any>verify(token, <string>process.env.ACCESS_TOKEN_SECRET)
//     user.socketId = socket.id
//     socket.data.user = user
//     next()
//   } catch (err: any) {
//     console.error(err?.message ?? err)
//   }
// })
io.on('connection', (socket) => {
  Object.values(onEvents).forEach((onEvent) => {
    onEvent(io, socket)
  })
  socket.broadcast.emit('online', socket.data.user)
})
export default io
