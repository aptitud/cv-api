const testdata = require('./testdata')
const { getLocales, getSchema, transform } = require('../server/transfomer')

describe('When fecthing api data', () => {
  it('should transform locales', () => {
    const result = getLocales(testdata.locales)
    expect(result).toEqual([
      { name: 'Swedish', code: 'sv' },
      { name: 'English', code: 'en' },
    ])
  })
  it('should transform schema', () => {
    const result = getSchema(testdata.schema, 'cv')
    expect(result).toEqual({
      fields: [
        {
          id: 'name',
          name: 'Name',
          type: 'Symbol',
          localized: false,
          required: true,
          disabled: false,
          omitted: false,
        },
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          localized: true,
          required: false,
          disabled: false,
          omitted: false,
        },
        {
          id: 'introduction',
          name: 'Introduction',
          type: 'Text',
          localized: true,
          required: false,
          disabled: false,
          omitted: false,
        },
        {
          id: 'languages',
          name: 'Languages',
          type: 'Text',
          localized: true,
          required: false,
          disabled: false,
          omitted: false,
        },
        {
          id: 'techniques',
          name: 'Techniques',
          type: 'Text',
          localized: true,
          required: false,
          disabled: false,
          omitted: false,
        },
        {
          id: 'methods',
          name: 'Methods',
          type: 'Text',
          localized: true,
          required: false,
          disabled: false,
          omitted: false,
        },
        {
          id: 'assignments',
          name: 'Assignments',
          type: 'Array',
          localized: false,
          required: false,
          disabled: false,
          omitted: false,
          link: true,
          fields: [
            {
              id: 'client',
              name: 'Client',
              type: 'Symbol',
              localized: false,
              required: true,
              disabled: false,
              omitted: false,
            },
            {
              id: 'roles',
              name: 'Roles',
              type: 'Text',
              localized: true,
              required: false,
              disabled: false,
              omitted: false,
            },
            {
              id: 'startDate',
              name: 'StartDate',
              type: 'Date',
              localized: false,
              required: true,
              disabled: false,
              omitted: false,
            },
            {
              id: 'endDate',
              name: 'EndDate',
              type: 'Date',
              localized: false,
              required: false,
              disabled: false,
              omitted: false,
            },
            {
              id: 'description',
              name: 'Description',
              type: 'Text',
              localized: true,
              required: false,
              disabled: false,
              omitted: false,
            },
            {
              id: 'techniques',
              name: 'Techniques',
              type: 'Text',
              localized: true,
              required: false,
              disabled: false,
              omitted: false,
            },
          ],
        },
        {
          id: 'roleSkills',
          name: 'RoleSkills',
          type: 'Array',
          localized: false,
          required: false,
          disabled: false,
          omitted: false,
          link: true,
          fields: [
            {
              id: 'name',
              name: 'Name',
              type: 'Symbol',
              localized: true,
              required: false,
              disabled: false,
              omitted: false,
            },
            {
              id: 'weight',
              name: 'Weight',
              type: 'Integer',
              localized: false,
              required: true,
              disabled: false,
              omitted: false,
            },
          ],
        },
        {
          id: 'techniqueSkills',
          name: 'TechniqueSkills',
          type: 'Array',
          localized: false,
          required: false,
          disabled: false,
          omitted: false,
          link: true,
          fields: [
            {
              id: 'name',
              name: 'Name',
              type: 'Symbol',
              localized: true,
              required: false,
              disabled: false,
              omitted: false,
            },
            {
              id: 'weight',
              name: 'Weight',
              type: 'Integer',
              localized: false,
              required: true,
              disabled: false,
              omitted: false,
            },
          ],
        },
        {
          id: 'methodSkills',
          name: 'MethodSkills',
          type: 'Array',
          localized: false,
          required: false,
          disabled: false,
          omitted: false,
          link: true,
          fields: [
            {
              id: 'name',
              name: 'Name',
              type: 'Symbol',
              localized: true,
              required: false,
              disabled: false,
              omitted: false,
            },
            {
              id: 'weight',
              name: 'Weight',
              type: 'Integer',
              localized: false,
              required: true,
              disabled: false,
              omitted: false,
            },
          ],
        },
      ],
    })
  })
  it('should transform cv', () => {
    const result = transform(testdata)
    expect(result).toEqual([
      {
        name: 'Mikael Ahlinder',
        url:
          'https://app.contentful.com/spaces/kqhdnxbobtly/entries/356zsW4N3PmGU7DzhctIWr',
        sv: {
          title: 'Utvecklare',
          introduction: 'Introduktion',
          languages: 'C#',
          techniques: 'ASP.NET',
          methods: 'Scrum',
          assignments: [
            {
              client: 'Wasa Kredit',
              roles: 'Utvecklare',
              startDate: '2017-09-01',
              endDate: '2019-01-01',
              description: 'Beskrivning',
              techniques: 'Webbutveckling',
            },
          ],
          roleSkills: [
            {
              name: 'Front End',
              weight: 9,
            },
          ],
          techniqueSkills: [
            {
              name: 'C#',
              weight: 3,
            },
          ],
          methodSkills: [
            {
              name: 'Scrum',
              weight: 7,
            },
          ],
        },
        en: {
          title: 'Developer',
          introduction: null,
          languages: null,
          techniques: null,
          methods: null,
          assignments: [
            {
              client: 'Wasa Kredit',
              roles: null,
              startDate: '2017-09-01',
              endDate: '2019-01-01',
              description: 'Description',
              techniques: 'Web development',
            },
          ],
          roleSkills: [
            {
              name: null,
              weight: 9,
            },
          ],
          techniqueSkills: [
            {
              name: 'C Sharp',
              weight: 3,
            },
          ],
          methodSkills: [
            {
              name: null,
              weight: 7,
            },
          ],
        },
      },
    ])
  })
})
