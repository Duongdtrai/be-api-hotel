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
const nodeMailer = require("nodemailer");
const configs_1 = require("../configs/configs");
const sendMail = (to, subject, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = yield nodeMailer.createTransport({
            host: configs_1.CONFIG.mail.HOST,
            port: Number(configs_1.CONFIG.mail.PORT),
            secure: false,
            auth: {
                user: configs_1.CONFIG.mail.USERNAME,
                pass: configs_1.CONFIG.mail.PASSWORD,
            },
        });
        const options = {
            from: configs_1.CONFIG.mail.FROM_ADDRESS,
            to,
            subject,
            html: htmlContent,
        };
        return transport.sendMail(options);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = sendMail;
//# sourceMappingURL=mailer.js.map