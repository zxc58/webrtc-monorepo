import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { io } from 'socket.io-client'
const socketUrl = 'http://127.0.0.1:3000'
export const useWebsocketStore = defineStore('websocket', () => {
  const socket = ref(null)
  function createSocket() {
    socket.value = io(socketUrl, {
      auth: {
        token: localStorage.getItem('access_token'),
      },
    })
    socket.value.on('connect', () => {
      console.log('成功socket連線')
    })
  }
  function closeSocket() {
    socket.value.close()
  }
  return { socket, createSocket, closeSocket }
})
