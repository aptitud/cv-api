const getLocales = locales => {
  return locales.items.map(({ code, name }) => ({ code, name }))
}

const getSchema = (schema, nodeType) => {
  return {
    fields: schema.items
      .find(p => p.sys.id === nodeType)
      .fields.map(field =>
        !field.items
          ? field
          : {
              ...field,
              link: true,
              ...getSchema(
                schema,
                field.items.validations[0].linkContentType[0],
              ),
              items: undefined,
            },
      ),
  }
}

const resolveValue = (node, values, locale, data) => {
  if (!values) {
    return null
  }
  const resolvedValue = node.localized
    ? values[locale]
    : Object.values(values)[0]
  if (Array.isArray(resolvedValue)) {
    return resolvedValue.map(value => resolveValue(node, value, locale, data))
  }
  if (node.link) {
    const asset = data.includes.Entry.find(x => x.sys.id === values.sys.id)
    return node.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: resolveValue(field, asset.fields[field.id], locale, data),
      }),
      {},
    )
  }
  return resolvedValue || null
}

const getItem = (item, schema, locales, data) => {
  return schema.fields.reduce((acc, node) => {
    const values = item.fields[node.id]
    if (node.id === 'name') {
      return {
        ...acc,
        name: Object.values(values)[0],
        url: `https://app.contentful.com/spaces/kqhdnxbobtly/entries/${item.sys.id}`,
      }
    }
    return {
      ...acc,
      ...locales.reduce((locacc, { code: locale }) => {
        return {
          ...locacc,
          [locale]: {
            ...acc[locale],
            [node.id]: resolveValue(node, values, locale, data),
          },
        }
      }, {}),
    }
  }, {})
}

const transform = ({ schema, locales, data }) => {
  const s = getSchema(schema, 'cv')
  const l = getLocales(locales)
  return data.items.map(item => getItem(item, s, l, data))
}

module.exports = {
  getLocales,
  getSchema,
  getItem,
  transform,
}
