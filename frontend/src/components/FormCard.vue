<script setup>
import { ref } from 'vue'
import to from 'await-to-js'
import { NCard, NButton, NForm } from 'naive-ui'
const emit = defineEmits(['submit'])
const props = defineProps(['rules', 'model', 'title'])
const formRef = ref(null)
async function submit(e) {
  const [validateError] = await to(formRef.value.validate())
  if (validateError) return console.log('Invalid inputs')
  return emit('submit', e)
}
</script>
<template>
  <n-card
    :title="props.title"
    :header-style="{
      textAlign: 'center',
    }"
  >
    <n-form
      ref="formRef"
      :rules="props.rules"
      :model="props.model"
      @submit.prevent="submit"
    >
      <slot name="formItem"></slot>
      <n-button type="primary" attr-type="submit" round size="large">
        <slot name="submitText">No button</slot>
      </n-button>
      <slot name="formFooter"></slot>
    </n-form>
  </n-card>
</template>
<style scoped>
.n-card {
  background-color: lightgrey;
  max-width: 400px;
}
</style>
