const express = require("express");
const env = require('./config/environment');
const path = require("path");
const app = express();
const port = 8000;
require('./config/view-helpers')(app);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customFlashMiddleware = require('./config/middleware');
const logger = require('morgan');

if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
// use cookie parser befire app.Router, or else cookies won't go get printed in the routes.
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
app.use(session({
    name: "Social",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*60)
    },
    store:  MongoStore.create(
        {
            mongooseConnection: db,
            mongoUrl: 'mongodb://localhost/social',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash uses session cookie, so should be used after that
app.use(flash());
app.use(customFlashMiddleware.setFlash);

app.use(express.static(path.join(__dirname,env.asset_path)));
// Make uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        // to include variables in the string use ``
        console.log(`Error in running the server: ${err}`);
        return;
    }
    // to include variables in the string use ``
    console.log(`Server is running on port: ${port}`);
});