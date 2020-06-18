import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Assignment from './Assignment'
import Intro from './Intro'
import Skills from './Skills'
import styled from '@emotion/styled'

const getStringsForLocale = locale => {
  return Object.entries({
    assignments: {
      sv: 'Uppdrag',
      en: 'Assignments',
    },
  }).reduce((acc, [k, v]) => ({ ...acc, [k]: v[locale] }), {})
}

const Cv = styled.div`
  background-color: #ffffff;
`

export default withRouter(({ match }) => {
  const [data, setData] = useState(null)
  const { slug } = match.params
  useEffect(() => {
    if (!slug) {
      return
    }
    fetch(`/api/${slug}`)
      .then(x => (x.ok ? x.json() : Promise.reject()))
      .then(x => setData(x))
      .catch(() => setData(null))
  }, [slug])
  if (!data) {
    return null
  }
  const strings = getStringsForLocale(data.locale)
  return (
    <Cv>
      <h1>{data.name}</h1>
      <Intro {...data} />
      <h2>{strings.assignments}</h2>
      {data.assignments.sort(sortAssignment).map((x, i) => (
        <Assignment key={i} {...x} />
      ))}
      <Skills skills={data.roleSkills} color="red" />
      <Skills skills={data.techniqueSkills} color="blue" />
      <Skills skills={data.methodSkills} color="green" />
    </Cv>
  )
})

const sortAssignment = (a, b) => {
  const aBeforeB = -1
  const bBeforeA = 1
  if (a.startDate === b.startDate) {
    if (a.endDate === undefined) {
      return b.endDate === undefined ? 0 : aBeforeB
    }
    return a.endDate === b.endDate
      ? 0
      : a.endDate < b.endDate
      ? bBeforeA
      : aBeforeB
  }
  return a.startDate < b.startDate ? bBeforeA : aBeforeB
}
