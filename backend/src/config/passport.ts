import passport from 'passport'
import type { RequestHandler } from 'express'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import models from '../db/models'
const { User } = models
passport.use(
  new LocalStrategy(
    {
      usernameField: 'account',
      passwordField: 'password',
    },
    async (account, password, done) => {
      try {
        const user = await User.findOne({ where: { account } })
        if (!user) return done(null, false)
        if (!user.comparePassword(password)) {
          return done(null, false)
        }
        return done(null, user.toJSON())
      } catch (error) {
        done(error)
      }
    }
  )
)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    (payload, done) => {
      if (payload.user) return done(null, payload.user)
      return done(new Error('Invalid JWT'))
    }
  )
)
export const signInAuth = passport.authenticate('local', {
  authInfo: true,
  session: false,
}) as RequestHandler
export const authJWT = passport.authenticate('jwt', {
  session: false,
}) as RequestHandler
