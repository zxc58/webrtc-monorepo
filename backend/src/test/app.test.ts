import request from 'supertest'
import app from '../app'
import models from '../db/models'
const backend = request(app)
beforeAll(async () => {
  await models.User.sync()
})
describe('Test sign up', () => {
  test('Sign up request', async () => {
    const data = { name: 'name', account: 'account', password: 'password' }
    const response = await backend.post('/auth/signup').send(data)
    expect(response.body?.message).toBe('Sign up successfully')
  })
})
describe('Test sign in', () => {
  let cookies: Array<string>
  test('Wrong account', async () => {
    const data = { account: 'wrongAccount', password: 'password' }
    const response = await backend.post('/auth/signin').send(data)
    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  test('Wrong password', async () => {
    const data = { account: 'account', password: 'wrongPassword' }
    const response = await backend.post('/auth/signin').send(data)
    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  test('Normal sign in', async () => {
    const data = { account: 'account', password: 'password' }
    const response = await backend.post('/auth/signin').send(data)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('accessToken')
    cookies = response.get('Set-Cookie')
    const matchKey = expect.stringMatching('refresh_token')
    const includeCookies = expect.arrayContaining([matchKey])
    expect(cookies).toEqual(includeCookies)
  })
  test('Refresh token', async () => {
    const response = await backend
      .post('/auth/refresh/token')
      .set('Cookie', cookies)
    expect(response.status).toBe(200)
    expect(response.body.data).toHaveProperty('accessToken')
    const matchKey = expect.stringMatching('refresh_token')
    const includeCookies = expect.arrayContaining([matchKey])
    expect(cookies).toEqual(includeCookies)
  })
})
afterAll(async () => {
  await models.User.truncate()
  await models.User.sequelize?.close()
})
