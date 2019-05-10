import React, { Component, lazy } from "react"
import { connect } from 'react-redux'

const Content = lazy(() => import(/* webpackChunkName: "dashboard-content" */ '../../pages/dashboard/Content.js'));

@connect(
  state => state.leftMenuTree.toJS(),
  null
)
class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempComponent: null
    }
  }

  render() {
    return (
      <div
      >
        {this.props.dyComponent?<this.props.dyComponent/>:<Content />}
      </div>
    )
  }
}

export default PageContent 