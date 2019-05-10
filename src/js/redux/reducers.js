import { combineReducers } from 'redux'

import user from './user/reducers'
import leftMenuTree from './leftMenuTree/reducers'

const appReducers = combineReducers({
  user,
  leftMenuTree
})

export default appReducers