import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Cv from './Cv'
import { Global, css } from '@emotion/core'

export default () => {
  const [cvs, setCvs] = useState([])
  useEffect(() => {
    fetch('/api')
      .then(x => x.json())
      .then(x => setCvs(x))
  }, [])
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          h1 {
            display: inline-block;
          }
        `}
      />
      <Router>
        <Switch>
          <Route path="/cv/:slug">
            <Cv />
          </Route>
          <Route>
            <ul>
              {cvs.map(({ slug, name, locale }) => (
                <li key={slug}>
                  <Link key={slug} to={`/cv/${slug}`}>
                    {name} - {locale}
                  </Link>
                </li>
              ))}
            </ul>
          </Route>
        </Switch>
      </Router>
    </>
  )
}
