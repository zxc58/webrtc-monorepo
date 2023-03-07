const account = [
  {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Please enter account',
  },
  {
    trigger: ['blur'],
    validator(rule, value) {
      if (value && value.length < 7)
        return new Error('Please enter 7~14 character')
      return true
    },
  },
]
const password = [
  {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Please enter password',
  },
  {
    trigger: ['blur'],
    validator(rule, value) {
      if (value && value.length < 7)
        return new Error('Please enter 7~14 character')
      return true
    },
  },
]
const name = [
  {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Please enter name',
  },
  {
    trigger: ['blur'],
    validator(rule, value) {
      if (value && value.length < 6)
        return new Error('Please enter 7~14 character')
      return true
    },
  },
]
export const signinFormRule = {
  account,
  password,
}
export const signupFormRule = {
  name,
  account,
  password,
}
