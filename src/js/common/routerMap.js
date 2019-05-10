import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

const routerMap = {

    OldSchoolMenuLink: (routes) => {
        return routes.map((route, i) => {
            if (route.routes) {
                return (
                    <Route
                        key={route.path}
                        exact={route.exact ? route.exact : false}
                        path={route.path}
                        children={({ match }) => (
                            <li className={match ? "active" : ""}>
                                {match ? "> " : ""}
                                <Link to={route.path}>{route.label}</Link>
                                <ul>
                                    {routerMap.OldSchoolMenuLink(route.routes)}
                                </ul>
                            </li>
                        )}
                    />
                )
            } else {
                return (
                    <Route
                        key={route.path}
                        exact={route.exact ? route.exact : false}
                        path={route.path}
                        children={({ match }) => (
                            <li className={match ? "active" : ""}>
                                {match ? "> " : ""}
                                <Link to={route.path}>{route.label}</Link>
                            </li>
                        )}
                    />
                );
            }
        })
    },

    RouteWithSubRoutes: (routes) => {
        return routes.map((route, i) => {
            if (route.routes) {
                // return (
                //         <Route
                //             exact={route.exact ? route.exact : false}
                //             path={route.path}
                //             render={props => (
                //                 <route.component {...props} />
                //             )}
                //         />
                // )
                {routerMap.RouteWithSubRoutes(route.routes)}
            } else {
                return (
                        <Route
                            key={'comp' + route.path}
                            exact={route.exact ? route.exact : false}
                            path={route.path}
                            render={props => (
                                <route.component {...props} />
                            )}
                        />
                );
            }
        })
    }
}


export default routerMap