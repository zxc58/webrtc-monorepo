import io from '../socket'
import {
  io as createClientSocket,
  Socket as clientSocketType,
} from 'socket.io-client'
let client1: clientSocketType, client2: clientSocketType
const port = 3000
beforeAll((done) => {
  let ready = false
  io.listen(port)
  client1 = createClientSocket(`ws://localhost:${port}`)
  client2 = createClientSocket(`ws://localhost:${port}`)
  client1.on('connect', () => {
    if (ready) return done()
    ready = true
  })
  client2.on('connect', () => {
    if (ready) return done()
    ready = true
  })
})
describe('Client emit events', () => {
  const room = { id: 'test room', size: 2 }
  test('Create room', (done) => {
    client1.emit('joinRoom', room, (socketIdsInRoom: string[]) => {
      try {
        const rooms = io.of('/').adapter.rooms
        const isInRoom = rooms.get(room.id)?.has(client1.id)
        expect(isInRoom).toBe(true)
        expect(socketIdsInRoom).toContain(client1.id)
      } finally {
        done()
      }
    })
  }, 50)
  test('Send invitation', (done) => {
    const invitation = { invitingId: client2.id, room: room }
    client2.on('invite', (receivedInvitation) => {
      try {
        expect(receivedInvitation).toStrictEqual(invitation)
      } finally {
        done()
      }
    })
    client1.emit('invite', invitation)
  }, 50)
  test('Join room', (done) => {
    client2.emit('joinRoom', room, (socketIdsInRoom: string[]) => {
      try {
        const rooms = io.of('/').adapter.rooms
        const isInRoom = rooms.get(room.id)?.has(client1.id)
        expect(isInRoom).toBe(true)
        expect(socketIdsInRoom).toHaveLength(2)
        expect(socketIdsInRoom).toContain(client1.id)
        expect(socketIdsInRoom).toContain(client2.id)
      } finally {
        done()
      }
    })
  }, 50)
  test('Send signal', (done) => {
    const signal = { recipientId: client2.id }
    client2.on('peerconnectSignaling', (receivedSignal) => {
      try {
        expect(receivedSignal).toStrictEqual(signal)
      } finally {
        done()
      }
    })
    client1.emit('peerconnectSignaling', signal)
  }, 50)
  test('Leave room', (done) => {
    client1.emit('leaveRoom', () => {
      try {
        const roomInfo = io.of('/').adapter.rooms.get(room.id)
        expect(roomInfo).toBeDefined()
        expect(roomInfo?.size).toBe(1)
        expect(roomInfo?.has(client2.id)).toBe(true)
        expect(roomInfo?.has(client1.id)).toBe(false)
      } finally {
        done()
      }
    })
  }, 50)
  xtest('Unfinished feat', () => {
    expect(1 + 1).toBe(2)
  })
})
afterAll(() => {
  io.close()
  client1.close()
  client2.close()
})
