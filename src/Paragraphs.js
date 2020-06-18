import React from 'react'

export default ({ text }) => {
  if (!text) {
    return null
  }
  return (
    <>
      {text.split('\n').map((x, i) => (
        <p key={i}>{x}</p>
      ))}
    </>
  )
}
