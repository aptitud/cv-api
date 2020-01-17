const router = require('koa-router')()
const { transform } = require('./transfomer')
const request = require('request-promise-native').defaults({
  json: true,
  baseUrl: 'https://cdn.contentful.com/spaces/kqhdnxbobtly/environments/master',
  auth: { bearer: process.env.CF_TOKEN },
})

router.get('/', async (ctx, next) => {
  const [schema, locales, data] = await Promise.all([
    request.get('/content_types'),
    request.get('/locales'),
    request.get('/entries', {
      qs: { include: 2, content_type: 'cv', locale: '*' },
    }),
  ])
  ctx.body = transform({ schema, locales, data })
})

module.exports = router.routes()
