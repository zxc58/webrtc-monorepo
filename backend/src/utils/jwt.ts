import { sign } from 'jsonwebtoken'
import type { Response } from 'express'
export function signJWT(
  user: object,
  refreshTokenId: string
): {
  accessToken: string
  refreshToken: string
} {
  if (!(process.env.ACCESS_TOKEN_SECRET && process.env.REFRESH_TOKEN_SECRET))
    throw new Error(
      'lack 2 env vars: ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET'
    )
  const accessToken = sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '5m',
  })
  const refreshToken = sign(
    { refreshTokenId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  )
  if (!(accessToken && refreshToken)) throw new Error('sign JWT error')
  return { refreshToken, accessToken }
}
export function sendJWT(
  res: Response,
  jwt: {
    accessToken: string
    refreshToken: string
  },
  message?: string
): void {
  res.cookie('refresh_token', jwt.refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
  res.json({ message, data: { accessToken: jwt.accessToken } })
}
