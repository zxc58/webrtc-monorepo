<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { NLayoutContent, NLayoutFooter, NButton } from 'naive-ui'
import { useWebsocketStore } from '../../stores/websocket'
import UserRow from './components/UserRow.vue'
const router = useRouter()
const accessToken = useLocalStorage('access_token')
const websocketStore = useWebsocketStore()
const userList = ref([])
onMounted(() => {
  setTimeout(async () => {
    websocketStore.getUsers((users) => {
      if (users.length) console.log(users)
    })
  }, 1000)
})
async function signout() {
  accessToken.value = 'undefined'
  websocketStore.closeSocket()
  router.push('/signin')
}
</script>
<template>
  <n-layout-content style="height: 500px">
    <user-row v-for="user in userList" :key="user" :user="user" />
  </n-layout-content>
  <n-layout-footer>
    <n-button round type="error" @click="signout">Sign out</n-button>
  </n-layout-footer>
</template>
