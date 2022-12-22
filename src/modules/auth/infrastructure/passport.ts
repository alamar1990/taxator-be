import passport from 'passport'
import passportJwt from 'passport-jwt'
import { config } from '../../../config'
import UserSchemaSequelize from '../../user/infrastructure/model/user.schema.sequelize'

const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET
    },
    function (jwtPayload, done) {
      return UserSchemaSequelize.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user)
        })
        .catch((err) => {
          return done(err)
        })
    }
  )
)
