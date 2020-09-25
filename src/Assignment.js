import React from 'react'
import styled from '@emotion/styled'
import Paragraphs from './Paragraphs'

const Header = styled.header`
  & span {
    font-weight: normal;
  }
`

export default ({
  client,
  roles,
  startDate,
  endDate,
  description,
  techniques,
  locale,
}) => {
  const [fromYear, toYear] = getYears(startDate, endDate)
  const strings = getStringsForLocale(locale)
  return (
    <section>
      <Header>
        <h3>
          {client}
          <span>
            ,{' '}
            {fromYear === toYear || !toYear
              ? fromYear
              : `${fromYear}–${toYear}`}
          </span>
        </h3>
      </Header>
      <Paragraphs text={description} />
      {roles && (
        <p>
          <strong>{strings.roles}:</strong> {roles}
        </p>
      )}
      {techniques && (
        <p>
          <strong>{strings.techniques}:</strong> {techniques}
        </p>
      )}
    </section>
  )
}

const getYears = (...dateStrings) => {
  return dateStrings.map((x) => (x ? x.substring(0, 4) : null))
}

const getStringsForLocale = (locale) => {
  return Object.entries({
    roles: {
      sv: 'Roller',
      en: 'Roles',
    },
    techniques: {
      sv: 'Tekniker',
      en: 'Techniques',
    },
  }).reduce((acc, [k, v]) => ({ ...acc, [k]: v[locale] }), {})
}
