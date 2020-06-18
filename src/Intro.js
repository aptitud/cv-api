import React from 'react'
import Paragraphs from './Paragraphs'

export default ({ title, introduction, languages, techniques, methods }) => (
  <section>
    <p>
      <strong>{title}</strong>
    </p>
    <Paragraphs text={introduction} />
    <p>
      <strong>Languages:</strong> {languages}
    </p>
    <p>
      <strong>Techniques:</strong> {techniques}
    </p>
    <p>
      <strong>Methods:</strong> {methods}
    </p>
  </section>
)
