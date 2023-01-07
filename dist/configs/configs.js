"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    role: {
        ADMIN: 'admin',
        USER: 'user',
    },
    mail: {
        MAILER: process.env.MAIL_MAILER,
        HOST: process.env.MAIL_HOST,
        PORT: process.env.MAIL_PORT,
        USERNAME: process.env.MAIL_USERNAME,
        PASSWORD: process.env.MAIL_PASSWORD,
        ENCRYPTION: process.env.MAIL_ENCRYPTION,
        FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
        FROM_NAME: process.env.MAIL_FROM_NAME,
    },
    URL: {
        APP_URL: process.env.APP_URL,
    },
};
//# sourceMappingURL=configs.js.map