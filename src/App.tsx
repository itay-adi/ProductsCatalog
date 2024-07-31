import React from 'react'
import Main from "./components/Main/Main"

import './App.css'

import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <Main />
        </Provider>
      </header>
    </div>
  )
}

export default App
