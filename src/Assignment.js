import React from 'react'
import Paragraphs from './Paragraphs'

export default ({
  client,
  roles,
  startDate,
  endDate,
  description,
  techniques,
}) => {
  const [fromYear, toYear] = getYears(startDate, endDate)
  return (
    <section>
      <h3>{client}</h3>
      <p>{roles}</p>
      <p>
        {fromYear === toYear || !toYear ? fromYear : `${fromYear}–${toYear}`}
      </p>
      <Paragraphs text={description} />
      <p>{techniques}</p>
    </section>
  )
}

const getYears = (...dateStrings) => {
  return dateStrings.map(x => (x ? x.substring(0, 4) : null))
}
