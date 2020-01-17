require('dotenv').config()
const Koa = require('koa')
const Boom = require('@hapi/boom')
const routes = require('./routes')

const app = new Koa()
app.use(async (ctx, next) => {
  await next().catch(err => {
    ctx.body = Boom.badImplementation(null, {
      message: err.message,
      stack: err.stack,
    })
  })
})
app.use(routes)
app.listen(3000)
