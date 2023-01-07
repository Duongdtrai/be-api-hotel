import * as passport from "passport";
import * as PassportJWT from 'passport-jwt'
import AccountModel from '../models/account'
let JwtStrategy = PassportJWT.Strategy;
let ExtractJwt = PassportJWT.ExtractJwt;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.SECRET_OR_KEY || 'intern-web-eastgate'
}, async (payload, done) => {
    try {
        const userAccount = await AccountModel.findOne({ id: payload.id })
        if (!userAccount) {
            return done(null, false)
        }
        done(null, userAccount) // khi thành công thì nhảy sang hàm để chạy tiếp
    } catch (error) {
        done(error, false) // không cho vượt qua, trả về authentication
    }
}));