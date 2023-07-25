const JWT = require('jsonwebtoken');

module.exports = {
    signAccessToken: (userId: number) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: "Yours truly"
            }
            const secret = "some super scecret"
            const options = {}
            JWT.sign(payload, secret, options, ({ err, token }: any) => {
                if (err) return reject(err)

                resolve(token)
            })
        })
    }
}