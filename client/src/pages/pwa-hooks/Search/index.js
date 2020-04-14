import React from "react";
import { connect } from "react-redux";
import { useHistory} from "react-router-dom";
import ShowHeightSpeed from "./SearchighSpeed";
import Journey from "./Journey.js";
import Departdate from "./Departdate.js";
import CitySelector from "../../../components/pwa/CitySelector";
import DateSelector from "../../../components/pwa/DateSelector";
import { h0 } from "../../../utils/common";
import {setHeadTitle} from '../reducer'
import * as Actions from "./actions";
const submitButton = {
  backgroundColor: "#f90",
  height: "40px",
  lineHeight: "40px",
  color: "#fff",
  borderRadius: "6px",
  border: "0",
  padding: "0",
  margin: "0",
  display: "block",
  width: "100%"
};
function Search(props) {
  props.setHeadTitle('查询')
  const history = useHistory()
  const onSelectDate = day => {
    if (!day || h0() > day) return;
    props.setDepartDate(day);
    props.hideDateSelector();
  };
  const searchBtn = ()=>{
    history.push('/list')
  }
  return (
    <div style={{ padding: "10px" }}>
      {/* 车站选择 */}
      <Journey
        {...props}
      />
      {/* 日期选择 */}
      <Departdate time={props.departDate} onClick={props.showDateSelector} />
      {/* 只看高铁动车 */}
      <ShowHeightSpeed
        highSpeed={props.highSpeed}
        toggle={props.toggleHighSpeed}
      />
      {/* 提交按钮 */}
      <div style={{ padding: "10px 0 17px 0" }}>
        <button style={submitButton} onClick={()=>searchBtn()}> 搜索 </button>
      </div>
      {/* 城市选择器浮层 */}
      <CitySelector
        show={props.isCitySelectorVisible}
        cityData={props.cityData}
        isLoading={props.isLoadingCityData}
        onSelect={props.setSelectedCity}
        {...props}
      />
      {/* 日期选择器浮层 */}
      <DateSelector
        // show onBack 为显示隐藏
        show={props.isDateSelectorVisible}
        onBack={props.hideDateSelector}
        onSelect={onSelectDate}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = { ...Actions,setHeadTitle };
// const mapDispatchToProps = (dispatch)=>{
//   return bindActionCreators({
//     showCitySelector,
//     exchangeFromTo,
//   },dispatch)
// }

export default connect(mapStateToProps, mapDispatchToProps)((Search));
