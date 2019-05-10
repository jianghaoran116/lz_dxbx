import React, { Component } from "react";
import axios from 'axios'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user/actions'

@withRouter
@connect(
  null,
  {loadData}
)
class AuthRouter extends Component{

  componentDidMount() {

    const publishList = ['/login']
    const pathname = this.props.location.pathname;

    if(~publishList.indexOf(pathname)) {
      return 
    }

    axios.get('api/user/info')
      .then(res=>{
        if(res.status==200) {
          if(res.data.code==0) {
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
          }
        }
      }, res=>{
        this.props.history.push('/login')
      })
  }

  render() {
    return null
  }
  
}

export default AuthRouter