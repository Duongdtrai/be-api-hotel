"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const PassportJWT = require("passport-jwt");
const Account_1 = require("../models/Account");
const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY || 'intern-web-eastgate',
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAccount = yield Account_1.default.findOne({ id: payload.id });
        if (!userAccount) {
            return done(null, false);
        }
        done(null, userAccount);
    }
    catch (error) {
        done(error, false);
    }
})));
//# sourceMappingURL=passport.js.map