import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

const Demo = React.lazy(() => import('./pages/demo'))
const MobXDemo = React.lazy(() => import('./pages/mobx-demo'))

export default function routers() {
    return <>
        <React.Suspense
            fallback={<div>loading...</div>}
        >
            <Switch>
                <Route path="/" exact component={ Demo } />
                <Route path="/mobx" exact component={ MobXDemo } />
            </Switch>
        </React.Suspense>
    </>
}