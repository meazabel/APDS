const express = require('express')
const app = express()
const urlPrefix = '/api'
const mongoose = require('mongoose')
const fs = require('fs')
const cert = fs.readFileSync('keys/certificate.pem')
const options = {
    server: {sslCA: cert}
}
const helmet =  require ("helmet")

//connection string for mongoDB
const connString = 'mongodb+srv://meazabel:3xEZx0Yv9RDEq6AQ@cluster0.imohdke.mongodb.net/test?retryWrites=true&w=majority'

//importing routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const issuesRoutes = require("./routes/issuesRoutes")

//connecting to mongoDB
mongoose.connect(connString)
    .then(() => {
            console.log('Connected ^_^')
        }
    )
    .catch((err) => {
            console.log('Not connected >_<', err)
        }, options
    );

//allowing cross-origin requests
app.use((reg, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Account,Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    }
)

//Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

//parsing the body of the request
app.use(express.json())

//routes
app.get(urlPrefix + '/', (req, res) => {
    res.send('ST10092592')
})

//routes
app.use(urlPrefix + '/admin', adminRoutes)
app.use(urlPrefix + '/users', userRoutes)
app.use(urlPrefix + '/issues', issuesRoutes)

//exporting the app
module.exports = app;