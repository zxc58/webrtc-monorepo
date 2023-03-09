<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormCard from '../components/FormCard.vue'
import { NInput, NFormItem } from 'naive-ui'
import to from 'await-to-js'
import { apiSignup } from '../utils/api'
import { signupFormRule } from '../utils/formRules'
const router = useRouter()
const model = ref({
  name: null,
  account: null,
  password: null,
})
async function signup(event) {
  const data = { ...model.value }
  const [error, responseData] = await to(apiSignup(data))
  if (error) alert('Sign up fail')
  router.push('/signin')
}
</script>
<template>
  <FormCard
    :rules="signupFormRule"
    @submit="signup"
    :model="model"
    title="Sign up"
  >
    <template v-slot:formItem>
      <n-form-item path="name" label="Name">
        <n-input
          type="text"
          round
          maxlength="10"
          v-model:value="model.name"
          placeholder="Enter name"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="account" label="Account">
        <n-input
          type="text"
          round
          maxlength="14"
          v-model:value="model.account"
          placeholder="Enter account"
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
          placeholder="Enter password"
        />
      </n-form-item>
    </template>
    <template v-slot:submitText>sign up</template>
    <template v-slot:formFooter>
      <p>Return to <RouterLink to="/">sign in</RouterLink></p>
    </template>
  </FormCard>
</template>
