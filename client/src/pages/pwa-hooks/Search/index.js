import React, { useCallback } from "react";
import { connect } from "react-redux";
// import {bindActionCreators} from 'redux'
import ShowHeightSpeed from "./SearchighSpeed";
import Journey from "./Journey.js";
import Departdate from "./Departdate.js";
import CitySelector from "../../../components/pwa/CitySelector";
import DateSelector from "../../../components/pwa/DateSelector";
import { h0 } from "../../../utils/common";
// import { showCitySelector, exchangeFromTo } from "./actions";
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
  // const exchangeFromTo = () => {
  //   return props.exchangeFromTo();
  // };
  // const showCitySelector = m => {
  //   return props.showCitySelector(m);
  // };
  const onSelectDate = day => {
    if (!day || h0() > day) return;
    props.setDepartDate(day);
    props.hideDateSelector();
  };
  return (
    <div style={{ padding: "10px" }}>
      <Journey
        // from={props.from}
        // to={props.to}
        {...props}
        // exchangeFromTo={exchangeFromTo}
        // showCitySelector={showCitySelector}
      />
      <Departdate time={props.departDate} onClick={props.showDateSelector} />
      <ShowHeightSpeed highSpeed toggle={() => ({})} />
      <div style={{ padding: "10px 0 17px 0" }}>
        <button type="submit" style={submitButton}>
          {" "}
          搜索{" "}
        </button>
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
  // from: state.from,
  // to: state.to,
  ...state
});

// const mapDispatchToProps = { showCitySelector, exchangeFromTo };
const mapDispatchToProps = { ...Actions };
// const mapDispatchToProps = (dispatch)=>{
//   return bindActionCreators({
//     showCitySelector,
//     exchangeFromTo,
//   },dispatch)
// }

export default connect(mapStateToProps, mapDispatchToProps)(Search);
