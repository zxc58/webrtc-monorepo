import { Socket, Server } from 'socket.io'
export interface ClientToServerEvents {
  invite: (invitation: { invitingId: string }) => void
  joinRoom: (
    room: { id: string; size: number },
    callback: (result: any) => void
  ) => void
  peerconnectSignaling: (
    signal: { recipientId: string },
    callback: () => void
  ) => void
  leaveRoom: (callback: () => void) => void
}
export interface ServerToClientEvents {
  online: (client: any) => void
  invite: (invitation: object) => void
  offline: (clientId: string) => void
  toggleBusy: (clientId: string) => void
  newOneJoin: (clientId: string) => void
  peerconnectSignaling: (signal: { recipientId: string }) => void
}
export interface InterServerEvents {
  ping: () => void
}
export interface SocketData {
  user: {
    id: number
    name: string
    account: string
  }
}
export type ServerSideSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>
export type IServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>
