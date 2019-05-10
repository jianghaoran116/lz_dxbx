import Immutable from 'immutable';
import {getRedirectPath} from '../../../util'

const $$initState = Immutable.fromJS({
  user: '',
  isAuth: false,
  type: '',
  msg: '',
  redirectTo: ''
})

const user = function(state=$$initState, action) {
  switch(action.type) {
    case Symbol.for('REGISTER_SUCCESS'):
      return state.merge(
        {
          isAuth: true,
          msg: '',
          ...action.payload,
          redirectTo: getRedirectPath(action.payload)
        }
      )
    case Symbol.for('LOGIN_SUCCESS'):
      return state.merge(
        {
          isAuth: true,
          msg: '',
          ...action.payload,
          redirectTo: getRedirectPath(action.payload)
        }
      )
    case Symbol.for('LOAD_DATA'):
      return state.merge(
        {
          ...state,
          isAuth: true,
          ...action.payload
        }
      )
    case Symbol.for('ERROR_MSG'):
      return state.merge(
        {
          ...state,
          isAuth: false,
          msg: action.msg
        }
      )
    case Symbol.for('LOGOUT'):
        return state.merge(
          {
            user: '',
            isAuth: false,
            type: '',
            msg: '',
            redirectTo: '/login'
          }
        )
    default:
      return state;
  }
}

export default user