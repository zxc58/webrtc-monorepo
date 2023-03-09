<script setup>
import { nextTick, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import to from 'await-to-js'
import { apiSignin } from '../utils/api'
import { RouterLink, useRouter } from 'vue-router'
import { NInput, NFormItem } from 'naive-ui'
import FormCard from '../components/FormCard.vue'
import { signinFormRule } from '../utils/formRules'
const router = useRouter()
const accessToken = useLocalStorage('access_token')
const model = ref({
  account: '',
  password: '',
})
async function signin() {
  const data = { ...model.value }
  const [err, responseData] = await to(apiSignin(data))
  if (err || !responseData.accessToken) return alert('Unknow error')
  accessToken.value = responseData.accessToken
  router.push('/')
}
</script>
<template>
  <FormCard
    :rules="signinFormRule"
    @submit="signin"
    :model="model"
    title="Sign in"
  >
    <template v-slot:formItem>
      <n-form-item path="account" label="Account">
        <n-input
          required
          type="text"
          round
          maxlength="14"
          v-model:value="model.account"
          placeholder="Enter 7~14 character"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
          type="password"
          round
          maxlength="14"
          show-password-on="mousedown"
          v-model:value="model.password"
          placeholder="Enter 7~14 character"
        />
      </n-form-item>
    </template>
    <template v-slot:submitText>sign in</template>
    <template v-slot:formFooter>
      <p>No account? <RouterLink to="/signup">sign up</RouterLink></p>
    </template>
  </FormCard>
</template>
