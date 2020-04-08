/**
 * 应用根组件
 */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Pwa from "./pages/pwa-hooks";
import reduxStore from "./redux";
import Loading from "components/loading";

class App extends Component {
  state = {
    renderError: false
  };
  // 和下面一样
  static getDerivedStateFromError() {
    return {
      renderError: true
    };
  }
  render() {
    const { renderError } = this.state;
    if (renderError) {
      return <Loading />;
    }
    return (
      <Provider store={reduxStore}>
          <BrowserRouter>
            <Switch>
              <Route path={"/"} component={Pwa}></Route>
            </Switch>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
