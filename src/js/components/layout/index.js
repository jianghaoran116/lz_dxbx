import React, { Component } from "react"
import { Layout, Icon } from 'antd';

import LeftMenu from './LeftMenu'
import PageContent from './PageContent'
import AuthInfo from '../authInfo'

import styles from "../../../style/layout/index"

const { Header, Content, Sider} = Layout;

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state={
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider 
          className='left-menu'
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width="260px"
        >
          <LeftMenu 
            // reload={this.state.push}
          />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: "0 20px 0 0"}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <AuthInfo />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 400,position: 'relative'
          }}
          >
            <PageContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard 