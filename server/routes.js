const router = require('koa-router')({ prefix: '/api' })
const NodeCache = require('node-cache')
const { transform } = require('./transfomer')
const contentful = require('request-promise-native').defaults({
  json: true,
  baseUrl: 'https://cdn.contentful.com/spaces/kqhdnxbobtly/environments/master',
  auth: { bearer: process.env.CF_TOKEN },
})

const cache = new NodeCache()
const populateCache = async () => {
  const [schema, locales, data] = await Promise.all([
    contentful('/content_types'),
    contentful('/locales'),
    contentful('/entries', {
      qs: { include: 2, content_type: 'cv', locale: '*' },
    }),
  ])
  const cvs = transform({ schema, locales, data })
  for (const cv of cvs) {
    cache.set(cv.name, cv, 600)
  }
}

router.get('/', async ctx => {
  if (!cache.keys().length) {
    await populateCache()
  }
  ctx.body = cache.keys().map(name => ({
    name,
    url: ctx.request.origin + router.url('cv', { name }),
  }))
})

router.get('cv', '/:name', async ctx => {
  const { name } = ctx.params
  if (!cache.has(name)) {
    await populateCache()
  }
  const cv = cache.get(name)
  ctx.assert(cv, 404)
  ctx.body = cv
})

module.exports = router.routes()
