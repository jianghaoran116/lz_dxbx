import React from "react";
import { Route, Link } from "react-router-dom";

const routerMap = {

  OldSchoolMenuLink: (routes) => {
    return routes.map((route, i) => {
      if (route.routes) {
        return (
          <div
            key={route.value}
          >
            {route.label}
            {routerMap.OldSchoolMenuLink(route.routes)}
          </div>
        )
      } else {
        return (
          <div key={route.path}>
            <Route
              key={'route' + route.path}
              exact={route.exact ? route.exact : false}
              path={route.path}
              children={({ match }) => (
                <Link className="custom-nav" to={route.path}>{route.label}</Link>
              )}
            />
          </div>
        )
      }
    })
  },

  RouteWithSubRoutes: (routes) => {
    return routes.map((route, i) => {
      if (route.routes) {
        // return (
        // <div
        //     key={'comp' + route.path}
        // >
        //     <Route
        //         exact={route.exact ? route.exact : false}
        //         path={route.path}
        //         render={props => (
        //             <route.component {...props} />
        //         )}
        //     />
        // {routerMap.RouteWithSubRoutes(route.routes)}
        // </div>
        // );
        return routerMap.RouteWithSubRoutes(route.routes)
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