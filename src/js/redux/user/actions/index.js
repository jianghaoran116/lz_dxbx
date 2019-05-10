import axios from 'axios'

const LOGIN_SUCCESS = Symbol.for('LOGIN_SUCCESS')
const ERROR_MSG = Symbol.for('ERROR_MSG')
const LOAD_DATA = Symbol.for('LOAD_DATA')
const LOGOUT = Symbol.for('LOGOUT')

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

function errorMsg(msg) {
  return {
    msg,
    'type': ERROR_MSG
  }
}

export function register({user, pwd, repeatpwd, type}) {
  if(!user||!pwd) {
    return errorMsg('no name Or no pwd')
  }
  if(pwd!==repeatpwd) {
    return errorMsg('repeatpwd no pass')
  }
  return dispath=>{
    axios.post('api/user/register', {user, pwd, type})
      .then(res=>{
        if(res.status==200&&res.data.code===0) {
          dispath(registerSuccess({user, pwd, type}))
        } else {
          dispath(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({user, pwd}) {
  if(!user||!pwd) {
    return errorMsg('no name Or no pwd')
  }
  return dispath=>{
    axios.post('api/user/login', {user, pwd})
      .then(res=>{
        if(res.status==200&&res.data.code===0) {
          // dispath(registerSuccess({user, pwd, type}))
          dispath(loginSuccess(res.data.data))
        } else {
          dispath(errorMsg(res.data.msg))
        }
      })
  }

}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}


export function logout() {
  return {
    type: LOGOUT
  }
}