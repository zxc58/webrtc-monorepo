<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import {
  NH1,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutSider,
  NLayoutFooter,
} from 'naive-ui'
import { useWebsocketStore } from '../stores/websocket'
const router = useRouter()
const accessToken = useLocalStorage('access_token')
const websocketStore = useWebsocketStore()
onMounted(() => {
  websocketStore.createSocket()
})
async function signout() {
  accessToken.value = 'undefined'
  websocketStore.closeSocket()
  router.push('/signin')
}
</script>
<template>
  <!-- <n-layout>
    <n-layout-header :bordered="true">
      <n-button type="error" @click="signout"> Sign out </n-button>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 24px;"> 海淀桥 </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
    </n-layout>
    <n-layout-footer>成府路</n-layout-footer>
  </n-layout> -->
  <n-layout has-sider>
    <n-layout-sider :bordered="true">
      <n-layout-header> side header </n-layout-header>
      <n-layout-content> side content </n-layout-content>
    </n-layout-sider>
    <n-layout-content> 視訊框 </n-layout-content>
  </n-layout>
</template>
<style scoped>
.n-layout-content {
  /* background-color: black;
  color: white; */
}
</style>
