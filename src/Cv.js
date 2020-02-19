import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import Assignment from './Assignment'
import Intro from './Intro'
import Skills from './Skills'

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
  return (
    <section>
      <h1>{data.name}</h1>
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
