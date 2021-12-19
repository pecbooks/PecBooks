const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');


const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: "CannotTellSry",
    db:  'pec-books',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false',
        auth: {
            user: 'bookshelf.ind',
            pass: 'Buyorsell@12'
        }
    },
    google_clientID: "219987352050-6tlorplfcsnje4k6m2dhqbnb40stsp4n.apps.googleusercontent.com",
    google_clientSecret: "eVo8eCn88DFUhLQaC8GBtj2I",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'SorryCannotTellYou',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
};

const production = {
    name: 'production',
    asset_path: '/assets',
    session_cookie_key: "CannotTellSry",
    db:  'pec-books',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false',
        auth: {
            user: 'pecbooks12',
            pass: 'Pw123456'
        }
    },
    google_clientID: "444198125610-g3m691brgfjrrn4q7qcdt42isgkn60te.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://pecbooks.in/users/auth/google/callback",
    jwt_secret: 'SorryCannotTellYou',
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
};

// module.exports = eval( (process.env.SOCIAL_ENVIRONMENT==undefined) ? "development" : eval(process.env.SOCIAL_ENVIRONMENT));
module.exports = production;
