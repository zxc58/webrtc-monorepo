import { RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'
import models from '../../db/models'
import { signInAuth } from '../../config/passport'
import { sendJWT, signJWT } from '../../utils/jwt'
import { verify } from 'jsonwebtoken'
const { User } = models
export const signUp: RequestHandler = async function (req, res) {
  try {
    const { name, account, password } = req.body
    const user = await User.findOne({ where: { account } })
    if (user)
      return res.json({ message: 'This account has already been registered' })
    await User.create({ name, account, password })
    return res.json({ message: 'Sign up successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
export const signIn: RequestHandler[] = [
  signInAuth,
  async function (req, res) {
    const user = <{ id: number }>req.user
    const refreshTokenId = uuid()
    const jwt = signJWT(user, refreshTokenId)
    await User.update({ refreshTokenId }, { where: { id: user.id } })
    sendJWT(res, jwt, 'Sign in successfully , return access token')
  },
]
export const refreshToken: RequestHandler = async function (req, res) {
  const { refresh_token } = req.cookies
  if (!refresh_token)
    return res.status(401).json({ message: 'Refresh JWT fail' })
  const payload = verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as { refreshTokenId: string }
  const user = await User.findOne({
    where: { refreshTokenId: payload.refreshTokenId },
    attributes: { exclude: ['refreshTokenId', 'password'] },
  })
  if (!user) return res.status(401).json({ message: 'Refresh JWT fail' })
  const refreshTokenId = uuid()
  const jwt = signJWT(user.toJSON(), refreshTokenId)
  await user.update({ refreshTokenId })
  sendJWT(res, jwt, 'Refresh JWT successfully')
}
