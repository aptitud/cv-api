import React from 'react'

export default ({ title, introduction, languages, techniques, methods }) => (
  <section>
    <p>{title}</p>
    <p>{introduction}</p>
    <p>{languages}</p>
    <p>{techniques}</p>
    <p>{methods}</p>
  </section>
)
