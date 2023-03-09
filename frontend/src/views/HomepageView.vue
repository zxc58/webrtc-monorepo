<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { useRouter } from 'vue-router'
import to from 'await-to-js'
import SideHeader from '../components/Sides/SideHeader.vue'
import SideBody from '../components/Sides/SideBody.vue'
import { useWebsocketStore } from '../stores/websocket'
import { apiVerifyToken } from '../utils/api'
import { useUserStore } from '../stores/user'
const websocketStore = useWebsocketStore()
const router = useRouter()
const userStore = useUserStore()
onBeforeMount(async () => {
  const [error, responseData] = await to(apiVerifyToken())
  if (error) return router.push('/signin')
  userStore.changeUser(responseData.user)
})
onMounted(() => {
  websocketStore.createSocket()
})
</script>
<template>
  <n-layout has-sider>
    <n-layout-sider>
      <side-header />
      <side-body />
    </n-layout-sider>
    <n-layout-content style="background-color: bisque"> </n-layout-content>
  </n-layout>
</template>
<style scoped></style>
