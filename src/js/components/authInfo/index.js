import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import browserCookie from 'browser-cookies';
import { Popconfirm, message } from 'antd';

import { logout } from '../../redux/user/actions'

@connect(
  state=>state.user.toJS(),
  {logout}
)
export class AuthInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  clickLogout = () => {
    browserCookie.erase('userid')
    this.props.logout()
  }

  cancel = () => {
  }

  render() {
    return (
      <div 
        style={{display: "inline-block", cursor: "pointer", float: "right"}}
      >
        {this.props.user?
            <Popconfirm 
              title="确定退出登录?" 
              onConfirm={this.clickLogout} 
              onCancel={this.cancel} 
              okText="Yes" 
              cancelText="No"
            >
              <span>退出登录</span>
            </Popconfirm>
          :
            (
              this.props.redirectTo?
                <Redirect push to={this.props.redirectTo} />
              :
                null
            )
        }
      </div>
    );
  }
};
export default AuthInfo
