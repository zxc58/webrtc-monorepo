<script setup>
import { ref } from 'vue'
import { NInput, NForm, NLayoutHeader } from 'naive-ui'
import to from 'await-to-js'
const input = ref(null)
async function searchUser(e) {
  const userName = input.value
  if (!userName) return
  //   const [, responseData] = await to(searchUser(userName))
}
</script>
<template>
  <n-layout-header style="height: 100px; border-bottom: solid; padding: 10px">
    <n-input
      round
      v-model:value="input"
      placeholder="Search user"
      v-on:keyup.enter="searchUser"
    />
  </n-layout-header>
</template>
<style scoped></style>
