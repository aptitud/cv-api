import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Cv from './Cv'
import { Global, css } from '@emotion/core'

export default () => {
  const [cvs, setCvs] = useState([])
  const [loggedIn, setLoggedIn] = useState(true)
  useEffect(() => {
    fetch('/api')
      .then((x) => {
        switch (x.status) {
          case 200:
            return x.json()
          case 403:
            setLoggedIn(false)
            return []
          default:
            console.log(x)
            return []
        }
      })
      .then((x) => setCvs(x))
  }, [])
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            max-width: 60rem;
          }
          h1,
          h2,
          h3 {
            margin: 0;
            padding: 0;
          }
          h1 {
            margin: 2rem 0 1rem;
          }
          h2 {
            margin: 2.5rem 0 1rem;
          }
          h3 {
            margin: 1.5rem 0 0;
          }
        `}
      />
      <Router>
        {loggedIn ? (
          <a href="/api/auth/logout">Log out</a>
        ) : (
          <a href="/api/auth/login">Log in</a>
        )}
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
