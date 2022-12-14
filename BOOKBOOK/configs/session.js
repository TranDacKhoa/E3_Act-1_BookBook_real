const session = require('express-session');

module.exports = function(app) {
    app.use(session({
        resave: true, 
        saveUninitialized: true, 
        secret: 'bookbook', 
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24 * 365,    // 365 days
            secure: false
        }
    }));    
}