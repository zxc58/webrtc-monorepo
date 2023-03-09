import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  function changeUser(newUser) {
    user.value = newUser
  }
  return { user, changeUser }
})
