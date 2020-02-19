import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Assignment from './Assignment'
import Intro from './Intro'
import Skills from './Skills'

export default withRouter(({ match }) => {
  const [consultant, setConsultant] = useState(null)
  const { slug, language } = match.params
  useEffect(() => {
    if (!slug) {
      return
    }
    fetch(`/api/${slug}`)
      .then(x => x.json())
      .then(x => setConsultant(x))
  }, [slug])
  if (!consultant) {
    return null
  }
  const data = consultant[language]
  return (
    <section>
      <h1>{consultant.name}</h1>
      <Intro {...data} />
      <h2>Uppdrag</h2>
      {data.assignments.map((x, i) => (
        <Assignment key={i} {...x} />
      ))}
      <Skills skills={data.roleSkills} color="red" />
      <Skills skills={data.techniqueSkills} color="blue" />
      <Skills skills={data.methodSkills} color="green" />
    </section>
  )
})
