import React from 'react'
import ReactDOM from 'react-dom'

const App = function () {
  return "hello"
}

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('app'))
}

render(App)
