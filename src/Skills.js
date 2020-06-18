import React from 'react'
import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'

export default ({ skills, color, size = 450 }) => {
  if (!skills.length) {
    return null
  }
  const data = [
    {
      data: skills.reduce(
        (acc, { name, weight }) => ({
          ...acc,
          [name]: weight / 10,
        }),
        {},
      ),
      meta: { color },
    },
  ]
  const captions = skills.reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: name,
    }),
    {},
  )
  return <RadarChart captions={captions} data={data} size={size} />
}
