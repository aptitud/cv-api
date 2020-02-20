const router = require('koa-router')({ prefix: '/api' })
const NodeCache = require('node-cache')
const Boom = require('@hapi/boom')
const { transform } = require('./transfomer')
const contentful = require('request-promise-native').defaults({
  json: true,
  baseUrl: 'https://cdn.contentful.com/spaces/kqhdnxbobtly/environments/master',
  auth: { bearer: process.env.CF_TOKEN },
})

const cache = new NodeCache()
const getCvs = async () => {
  if (cache.keys().length) {
    return cache.get('cvs')
  }
  const [schema, locales, data] = await Promise.all([
    contentful('/content_types'),
    contentful('/locales'),
    contentful('/entries', {
      qs: { include: 2, content_type: 'cv', locale: '*' },
    }),
  ])
  const cvs = transform({ schema, locales, data })
  cache.set('cvs', cvs, 600)
  return cvs
}

router.get('/', async ctx => {
  const cvs = await getCvs()
  ctx.body = cvs.map(({ slug, name, locale }) => ({ slug, name, locale }))
})

router.get('/:slug', async ctx => {
  const { slug } = ctx.params
  const cvs = await getCvs()
  const cv = cvs.find(x => x.slug === slug)
  if (!cv) {
    throw Boom.notFound('kalle', 'dsfsd')
  }
  ctx.body = cv
})

module.exports = router.routes()
