import React, { useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux';
import Search from "./Search";
import List from "./List";
import Order from "./order";
import Detail from "./detail";
import Header from "../../components/pwa/Header";
export default function Pwa() {
  const title = useSelector(({ headTitle }) => {
    return headTitle ;
  });
  // useCallback 避免重复渲染
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  return (
    <div>
      <Header onBack={onBack} title={title} />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/list" component={List} />
        <Route path="/detail" component={Detail} />
        <Route path="/order" component={Order} />
        <Route path="/*" component={Search} />
      </Switch>
    </div>
  );
}
