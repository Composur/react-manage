import React, { useState, useEffect, useCallback, memo } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { reqTripLists } from "../../../api";
import { setHeadTitle } from "../reducer";
import {setDepartDate} from '../Search/actions'
import HeadNav from "./nav";
import Filter from "./filter";
import TripList from "./list";
import { ORDER_DEPART, ORDER_DURATION } from "./constant";
const onDayMS = 86400000
function SearchDetail({ from, to, setHeadTitle, departDate ,setDepartDate,isLoadingCityData}) {
  const [trains,setTrains] = useState([])
  useEffect(() => {
    setHeadTitle(from + " ⇀ " + to);
    const getTripLists = async () => {
      const {data} = await reqTripLists({ from, to });
      const {dataMap:{directTrainInfo:{trains}}} = data
      setTrains(trains)
      console.log(trains)
    };
    getTripLists();
  }, [from, to,departDate]);
 const changeDate = useCallback((w)=>{
  if(!isLoadingCityData){
   setDepartDate(w?departDate-onDayMS:departDate+onDayMS)
  }
 },[departDate])
  return (
    <>
      <HeadNav
        date={departDate}
        prev={() => changeDate(true)}
        next={() => changeDate()}
        isPrevDisabled={false}
        isNextDisabled={false}
      />
      <TripList list={trains}/>
      <Filter />
    </>
  );
}
const mapStateToProps = ({ from, to, highSpeed, departDate,isLoadingCityData }) => ({
  from,
  to,
  highSpeed,
  departDate,
  isLoadingCityData,
  order_type: ORDER_DEPART, //一个枚举值 用来进行排序 按出发时间早晚
  onlyTickets: false // 只看有票
});
const mapDispatchToProps = { setHeadTitle,setDepartDate };
export default connect(mapStateToProps, mapDispatchToProps)(SearchDetail);
