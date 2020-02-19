import React from 'react'

export default ({
  client,
  roles,
  startDate,
  endDate,
  description,
  techniques,
}) => (
  <section>
    <h3>{client}</h3>
    <p>{roles}</p>
    <p>{startDate}</p>
    <p>{endDate}</p>
    <p>{description}</p>
    <p>{techniques}</p>
  </section>
)
