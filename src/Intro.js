import React from 'react'
import Paragraphs from './Paragraphs'

export default ({
  locale,
  title,
  introduction,
  languages,
  techniques,
  methods,
}) => (
  <section>
    <p>
      <strong>{title}</strong>
    </p>
    <Paragraphs text={introduction} />
    <p>
      <strong>{strings[locale].languages}:</strong> {languages}
    </p>
    <p>
      <strong>{strings[locale].techniques}:</strong> {techniques}
    </p>
    <p>
      <strong>{strings[locale].methods}:</strong> {methods}
    </p>
  </section>
)

const strings = {
  sv: {
    languages: 'Språk',
    techniques: 'Tekniker',
    methods: 'Metoder',
  },
  en: {
    languages: 'Languages',
    techniques: 'Techniques',
    methods: 'Methods',
  },
}
