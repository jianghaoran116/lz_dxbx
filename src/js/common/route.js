// import { lazy } from "react";

// const Login = lazy(() => import(/* webpackChunkName: "login" */ '../pages/login/index.js'))
// const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ '../pages/dashboard/index.js'))

import Login from '../pages/login/index.js'
import Dashboard from '../pages/dashboard/index.js'

const routes = {
  initRouteList:[
    {
      path: "/login",
      exact: true,
      component: Login,
      label: 'login'
    },
    {
      path: "/dashboard",
      exact: true,
      component: Dashboard,
      label: 'dashboard'
    }
  ]
}

export default routes