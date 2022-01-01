import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import store from './store'
import reportWebVitals from './reportWebVitals'

import { Auth0Provider } from '@auth0/auth0-react'

const { REACT_APP_CLIENT_ID, REACT_APP_DOMAIN } = process.env

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={REACT_APP_DOMAIN || ''}
      clientId={REACT_APP_CLIENT_ID || ''}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
