import React, { Component, lazy } from "react";
import ReactDOM from "react-dom";

import PageLayout from '../common/layout/PageLayout'

const Dashboard = lazy(() => import(/* webpackChunkName: "javascript-dashboard" */ '../containers/javascript/Dashboard'))
const Temstr = lazy(() => import(/* webpackChunkName: "javascript-es6-str" */ '../containers/javascript/es6/Temstr'))
const Obj = lazy(() => import(/* webpackChunkName: "javascript-es6-obj" */ '../containers/javascript/js/Obj'))
const JsType = lazy(() => import(/* webpackChunkName: "javascript-js-type" */ '../containers/javascript/js/JsType'))

const subRouters = [
  {
    value: "1",
    path: "/",
    label: "dashboard",
    component: Dashboard,
    exact: true
  }
  ,{
    value: '2',
    label: "js",
    routes: [
      {
        path: "/js/jstype",
        label: "jstype",
        component: JsType,
        exact: true,
        value: '1',
      },
      {
        path: "/js/obj",
        label: "对象",
        component: Obj,
        exact: true,
        value: '2',
      }
    ],
  }
  ,{
    value: '3',
    label: "es6",
    routes: [
      {
        path: "/es6/str",
        label: "str",
        component: Temstr,
        exact: true,
        value: '1',
      }
    ],
  }
]

class Es6 extends Component {

  render() {
    return (
      <PageLayout
        pageTitle='javascript'
        sidebars={subRouters}
        layoutFooter={'footer'}
      />
    );
  }
}

export default Es6;

const wrapper = document.getElementById("root");
ReactDOM.render(<Es6 />, wrapper)