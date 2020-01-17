const testdata = require('./testdata')
const { getLocales, getSchema } = require('../transfomer')

describe('When fecthing api data', () => {
  it('should transform locales', () => {
    const result = getLocales(testdata.locales)
    expect(result).toEqual([
      { name: 'Swedish', code: 'sv' },
      { name: 'English', code: 'en' },
    ])
  })
  it('should transform schema', () => {
    const result = getSchema(testdata.schema)
    expect(result.id).toMatch('cv')
    expect(result).toHaveProperty('fields')
    expect(result.fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Name', localized: false }),
        expect.objectContaining({ name: 'Image', localized: false }),
        expect.objectContaining({ name: 'Title', localized: true }),
        expect.objectContaining({ id: 'assignment', type: 'Array' }),
      ]),
    )
  })
})
