import React, { Component, Suspense, lazy } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import RouterMap from '../routerMap'
const NoMatch = lazy(() => import(/* webpackChunkName: "404" */ '../../containers/noMatch/NoMatch'))

import styles from "../../../style/pages/content.less"

class PageContent extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      docked: false,
      pageTitle: ''
    }
  }

  componentDidMount() {
  }

  onDock = (d) => {
    this.setState({
      [d]: !this.state[d],
    });
  }

  fallback = () => {
    return (
      <div>Loading...</div>
    );
  }

  render() {

    return (
      <Router>
        <div
          className={styles.pageContent}
          style={{ height: '100%' }}
        >
            <Suspense
              fallback={this.fallback()}
            >
              <Switch>
                {RouterMap.RouteWithSubRoutes(this.props.sidebars)}
                <Route
                  render={props => (
                    <NoMatch />
                  )}
                />
              </Switch>
            </Suspense>
        </div>
      </Router>
    );
  }
}

export default PageContent;