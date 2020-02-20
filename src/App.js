import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Cv from './Cv'

export default () => {
  const [cvs, setCvs] = useState([])
  useEffect(() => {
    fetch('/api')
      .then(x => x.json())
      .then(x => setCvs(x))
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/cv/:slug">
          <Cv />
        </Route>
        <Route>
          {cvs.map(({ slug, name, locale }) => (
            <Link key={slug} to={`/cv/${slug}`}>
              {name} - {locale}
            </Link>
          ))}
        </Route>
      </Switch>
    </Router>
  )
}
