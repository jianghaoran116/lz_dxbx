import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { login, getUserData } from '../redux/auth/actions'

@connect(
  state => state.auth,
  {login, getUserData}
)

class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.props.getUserData()
  }

  render() {
    return (
        <div
        >
          {this.props.name}
          {this.props.isAuth?<Redirect to='/dashboard'></Redirect>:"false"}
          <button
            style={{"float": "right"}}
            onClick={this.props.login}
          >
            login
          </button>
        </div>
    );
  }
}

export default Auth;