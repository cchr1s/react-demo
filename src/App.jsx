import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'
import Routers from './router'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

function App () {
    return <Router
        history= {history}
    >
        <Routers />
    </Router>
}

export default App