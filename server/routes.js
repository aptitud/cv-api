const router = require('koa-router')({ prefix: '/api' })
const NodeCache = require('node-cache')
const Boom = require('@hapi/boom')
const crypto = require('crypto')
const querystring = require('querystring')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const { transform } = require('./transfomer')
const docx = require('./docx')

const contentful = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/kqhdnxbobtly/environments/master',
  headers: { authorization: `Bearer ${process.env.CF_TOKEN}` },
})

const cache = new NodeCache()

const getCvs = async () => {
  const cachedItem = cache.get('cvs')
  if (cachedItem) {
    return cachedItem
  }
  const [schema, locales, data] = await Promise.all([
    contentful('/content_types').then(x => x.data),
    contentful('/locales').then(x => x.data),
    contentful('/entries', {
      params: { include: 2, content_type: 'cv', locale: '*' },
    }).then(x => x.data),
  ])
  const cvs = transform({ schema, locales, data })
  cache.set('cvs', cvs, 600)
  return cvs
}

const getGoogleDiscovery = async () => {
  const cachedItem = cache.get('google-openid')
  if (cachedItem) {
    return cachedItem
  }
  const { data } = await axios.get(
    'https://accounts.google.com/.well-known/openid-configuration',
  )
  cache.set('google-openid', data)
  return data
}

const authenticate = async (ctx, next) => {
  const token = ctx.cookies.get('idtoken')
  if (!token) {
    ctx.throw(403, 'No JWT')
    return
  }
  try {
    jwt.verify(token, process.env.SECRET)
  } catch (err) {
    ctx.throw(403, 'Invalid JWT')
    return
  }
  return next()
}

router.get('/', authenticate, async ctx => {
  const cvs = await getCvs().catch(err => {
    console.error(err)
    throw err
  })
  ctx.body = cvs
    .map(({ slug, name, locale }) => ({ slug, name, locale }))
    .sort((a, b) => a.name.localeCompare(b.name))
})

router.get('/:slug', authenticate, async ctx => {
  const { slug } = ctx.params
  const cvs = await getCvs()
  const cv = cvs.find(x => x.slug === slug)
  if (!cv) {
    throw Boom.notFound('kalle', 'dsfsd')
  }
  ctx.body = cv
})

router.get('/:slug/docx', authenticate, async ctx => {
  const { slug } = ctx.params
  const cvs = await getCvs()
  const cv = cvs.find(x => x.slug === slug)
  if (!cv) {
    throw Boom.notFound('CV not found')
  }
  ctx.set(
    'content-type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  ctx.set('content-disposition', `attachment; filename="${slug}.docx"`)
  const doc = await docx(cv)
  ctx.body = doc
})

router.post('/cf/hook', async ctx => {
  const secret = ctx.get('x-secret')
  if (secret !== process.env.CF_HOOK_SECRET) {
    ctx.throw(404)
    return
  }
  cache.del('cvs')
  ctx.body = 'ok'
})

router.get('/auth/login', async ctx => {
  const nonce = crypto.randomBytes(16).toString('base64')
  const randomValue = crypto.randomBytes(16).toString('base64')
  const hash = hashHmac(process.env.SECRET, randomValue)
  const params = {
    response_type: 'code',
    client_id: process.env.GOOGLE_CLIENT_ID,
    scope: 'openid email',
    redirect_uri: `${process.env.URL}/api/auth/callback`,
    state: `${randomValue}:${hash}`,
    nonce,
    hd: 'aptitud.se',
  }
  const query = querystring.stringify(params)
  const authorizationEndpoint = await getGoogleDiscovery().then(
    x => x.authorization_endpoint,
  )
  ctx.set('location', `${authorizationEndpoint}?${query}`)
  ctx.status = 307
  ctx.body = 'ok'
})

router.get('/auth/logout', async ctx => {
  ctx.cookies.set('idtoken', '', { maxAge: 0 })
  ctx.set('location', process.env.URL)
  ctx.status = 307
  ctx.body = 'ok'
})

router.get('/auth/callback', async ctx => {
  const { state, code } = ctx.query
  const [receivedRandomValue, receivedHash] = state.split(':')
  const hash = hashHmac(process.env.SECRET, receivedRandomValue)
  if (hash !== receivedHash) {
    ctx.throw(403, 'HMAC validation failed')
  }
  const selfUrl = process.env.URL
  const tokenEndpoint = await getGoogleDiscovery().then(x => x.token_endpoint)
  const { data } = await axios.post(
    tokenEndpoint,
    querystring.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${selfUrl}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  )
  const idToken = jwt.decode(data.id_token)
  if (!idToken.hd === 'aptitud.se') {
    ctx.throw(403, 'Must belong to Aptitud organization')
  }
  const newJwt = jwt.sign({ email: idToken.email }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  })
  ctx.cookies.set('idtoken', newJwt, {
    secure: selfUrl.startsWith('https'),
    httpOnly: true,
  })
  ctx.set('location', selfUrl)
  ctx.status = 303
  ctx.body = 'ok'
})

const hashHmac = (secret, str) => {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(str)
  return hmac.digest('base64')
}

module.exports = router.routes()
