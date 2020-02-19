import React, { useEffect, useState } from 'react'

export default () => {
  const [consultants, setConsultants] = useState([])
  useEffect(() => {
    fetch('/api')
      .then(x => x.json())
      .then(x => setConsultants(x))
  }, [])
  return (
    <>
      {consultants.map(x => (
        <a key={x.name} href={x.url}>
          {x.name}
        </a>
      ))}
    </>
  )
}
