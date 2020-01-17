require('dotenv').config()
const Koa = require('koa')
const api = require('./api')

const app = new Koa()
app.use(api)
app.listen(3000)
