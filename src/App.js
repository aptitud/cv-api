import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Consultant from './Consultant'

export default () => {
  const [consultants, setConsultants] = useState([])
  useEffect(() => {
    fetch('/api')
      .then(x => x.json())
      .then(x => setConsultants(x))
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/consultant/:slug/:language">
          <Consultant />
        </Route>
        <Route>
          {consultants.map(({ slug }) => (
            <Link key={slug} to={`/consultant/${slug}/sv`}>
              {slug}
            </Link>
          ))}
        </Route>
      </Switch>
    </Router>
  )
}
