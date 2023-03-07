import { IServer, ServerSideSocket } from './types'
type RegisterEvent = (io: IServer, socket: ServerSideSocket) => ServerSideSocket
export const onDisconnect: RegisterEvent = function (io, socket) {
  return socket.on('disconnect', () => {
    socket.broadcast.emit('offline', socket.id)
  })
}
export const onInvite: RegisterEvent = function (io, socket) {
  return socket.on('invite', (invitation) => {
    socket.to(invitation.invitingId).emit('invite', invitation)
  })
}
export const onJoinRoom: RegisterEvent = function (io, socket) {
  return socket.on('joinRoom', async (room, callback) => {
    // Join the room
    const { id, size } = room
    const roomInfo = io.of('/').adapter.rooms.get(id)
    if (roomInfo?.size === size) return callback(false)
    const currentRoom = roomIn(socket)
    if (currentRoom) socket.leave(currentRoom)
    await socket.join(id)
    // Notify
    socket.in(id).emit('newOneJoin', socket.id)
    socket.broadcast.emit('toggleBusy', socket.id)
    // return clients in room
    if (callback)
      callback(Array.from(<Set<string>>io.of('/').adapter.rooms.get(id)))
  })
}
export const onPeerconnectSignaling: RegisterEvent = function (io, socket) {
  return socket.on('peerconnectSignaling', (signal, callback) => {
    const { recipientId } = signal
    socket.to(recipientId).emit('peerconnectSignaling', signal)
    if (callback) return callback()
  })
}
export const onLeaveRoom: RegisterEvent = function (io, socket) {
  return socket.on('leaveRoom', (callback) => {
    const currentRoom = roomIn(socket)
    if (currentRoom) socket.leave(currentRoom)
    callback()
  })
}
function roomIn(socket: ServerSideSocket) {
  return Array.from(socket.rooms).find((roomId) => roomId !== socket.id)
}
