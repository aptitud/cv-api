require('dotenv').config()
const Koa = require('koa')
const Boom = require('@hapi/boom')
const cors = require('kcors')
const serve = require('koa-static')
const routes = require('./routes')

const app = new Koa()
app.use(cors())
app.use(serve(`${process.cwd()}/build`))
app.use(async (ctx, next) => {
  await next()
    .then(() => ctx.assert(ctx.status < 400, ctx.status))
    .catch(err => {
      console.error(err.stack)
      const error = err.isBoom
        ? err
        : err.status
        ? Boom.boomify(err, { statusCode: err.status })
        : Boom.badImplementation(null, {
            message: err.message,
            stack: err.stack,
          })
      ctx.body = error.output.payload
      ctx.status = error.output.statusCode
    })
})
app.use(routes)
app.listen(5555)
