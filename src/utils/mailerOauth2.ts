import * as nodeMailer from "nodemailer";

const { google } = require('googleapis')
const CLIENT_ID = "49550434818-03e0l0tge3hiutjhgqd01in47io1fa9j.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URL = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04Tp_gDQR1FVCCgYIARAAGAQSNwF-L9IrbKje7YND6rn75_GFo0P-QBEUn_hJNbleXJRRmCbEmw2JJEZodKJMS3SYtiPPa4V6wZ8"
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async (to: string, subject: string, htmlContent: string) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "phamtungduong06032002@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const options = {
            from: "phamtungduong06032002@gmail.com", // email send
            to: to, // tới email
            subject: subject, // Chủ đề email
            html: htmlContent // nội dung email
        }
        const result = transport.sendMail(options, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        })
        return result
    } catch (error) {
        
    }
}
export default sendMail;