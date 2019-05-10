import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routerMap from "./common/routerMap"
import RouteList from './common/route'
import AuthRouter from './components/authRouter'
import NoMatch from './pages/NoMatch'

class App extends Component {

    fallback = () => {
        return (
            <div>Loading...</div>
        );
    }

    render() {

        return (
            <Router>
                <Suspense fallback={this.fallback()}>   
                    <AuthRouter></AuthRouter>
                    <Switch>
                        {routerMap.RouteWithSubRoutes(RouteList.initRouteList)}
                        <Route component={NoMatch} />
                    </Switch>
                </Suspense>
            </Router>
        )
    }

}

export default App