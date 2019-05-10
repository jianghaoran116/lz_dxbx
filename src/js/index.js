import React, { Component } from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"

import appReducers from './redux/reducers'
import App from './App.js'

const store = createStore(appReducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

class Index extends Component {

  render() {
    return (
      <Provider
        store={store}
      >
        <App />
      </Provider>
    );
  }
}

export default Index;

const wrapper = document.getElementById("root");
ReactDOM.render(<Index />, wrapper)