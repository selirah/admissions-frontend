import React from 'react'
import ReactDOM from 'react-dom'
import jwt_decode from 'jwt-decode'
import { createBrowserHistory } from 'history'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { configureStore } from './configureStore'
import { secure } from './utils/secure'
import { isEmpty } from './helpers/isEmpty'
import { setUser } from './store/auth/actions'
import { authorization } from './utils/authorization'
import { logout } from './store/auth/actions'
import { path } from './helpers/path'

const history = createBrowserHistory()

declare global {
  interface Window {
    INITIAL_REDUX_STATE: any
  }
}

const initialState = window.INITIAL_REDUX_STATE
export const { store, persistor } = configureStore(history, initialState)

const user = secure.get('user')
const { token } = user

if (!isEmpty(token)) {
  authorization(token)
  store.dispatch(setUser(user))

  const decoded: any = jwt_decode(JSON.stringify({ token }))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    secure.removeAll()
    secure.clear()
    store.dispatch(logout())
    window.location.href = path.login
  }
}

ReactDOM.render(
  <React.Fragment>
    <App store={store} history={history} persistor={persistor} />
  </React.Fragment>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
