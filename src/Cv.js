import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Assignment from './Assignment'
import Intro from './Intro'
import Skills from './Skills'

const getStringsForLocale = locale => {
  return Object.entries({
    assignments: {
      sv: 'Uppdrag',
      en: 'Assignments',
    },
  }).reduce((acc, [k, v]) => ({ ...acc, [k]: v[locale] }), {})
}

export default withRouter(({ match }) => {
  const [data, setData] = useState(null)
  const { slug } = match.params
  useEffect(() => {
    if (!slug) {
      return
    }
    fetch(`/api/${slug}`)
      .then(x => x.json())
      .then(x => setData(x))
  }, [slug])
  if (!data) {
    return null
  }
  const strings = getStringsForLocale(data.locale)
  return (
    <section>
      <h1>{data.name}</h1>
      <Intro {...data} />
      <h2>{strings.assignments}</h2>
      {data.assignments.map((x, i) => (
        <Assignment key={i} {...x} />
      ))}
      <Skills skills={data.roleSkills} color="red" />
      <Skills skills={data.techniqueSkills} color="blue" />
      <Skills skills={data.methodSkills} color="green" />
    </section>
  )
})
