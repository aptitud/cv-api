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
    <h2>{title}</h2>
    <Paragraphs text={introduction} />
    <h3>{strings[locale].languages}</h3>
    <p>{languages}</p>
    <h3>{strings[locale].techniques}</h3>
    <p>{techniques}</p>
    <h3>{strings[locale].methods}</h3>
    <p>{methods}</p>
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
