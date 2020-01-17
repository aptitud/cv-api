const getLocales = locales => {
  return locales.items.map(item => ({ code: item.code, name: item.name }))
}

const getSchema = (schema, id = 'cv') => {
  const fields = schema.items
    .find(p => p.sys.id === id)
    .fields.map(x => {
      if (!x.items) {
        return x
      }
      if (x.items.type === 'Link') {
        const i = x.items.validations[0].linkContentType[0]
        return { ...x, ...getSchema(schema, i), items: undefined }
      }
      throw new Error('oh snap')
    })
  return { id, fields }
}

const getItem = data => {}

const transform = ({ schema, locales, data }) => {
  return getSchema(schema)
}

module.exports = {
  getLocales,
  getSchema,
  getItem,
  transform,
}
