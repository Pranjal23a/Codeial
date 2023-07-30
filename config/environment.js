const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'something',
    db: 'codeial_development',
    smtp:
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pransharma011@gmail.com',
            pass: 'some password'
        }

    },
    google_client_id: '252313988975-97t5qoo7639ogpafbijg5b11uef6aerf.apps.googleusercontent.com',
    google_client_secret: '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',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'Codeial',
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp:
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }

    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
}
console.log(process.env.CODEIAL_DB);
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);