import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { reqTripLists } from "../../../api";
import { setHeadTitle } from "../reducer";
import HeadNav from "./nav";
import Filter from "./filter";
import TripList from "./list";
import {ORDER_DEPART,ORDER_DURATION} from './constant'
function SearchDetail({ from, to, setHeadTitle }) {
  setHeadTitle(from + " ⇀ " + to);
  useEffect(() => {
    const getTripLists = async () => {
      const res = await reqTripLists({ from, to });
      console.log(res);
    };
    getTripLists();
  }, [from, to]);
  return (
    <>
      <HeadNav />
      <TripList />
      <Filter />
    </>
  );
}
const mapStateToProps = ({ from, to,highSpeed ,departDate}) => ({
  from,
  to,
  highSpeed,
  departDate,
  order_type:ORDER_DEPART,//一个枚举值 用来进行排序 按出发时间早晚
  onlyTickets:false // 只看有票
});
const mapDispatchToProps = { setHeadTitle };
export default connect(mapStateToProps, mapDispatchToProps)(SearchDetail);
