import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

JavascriptTimeAgo.locale(en)

ReactDOM.render(<App/>, document.getElementById('root'))