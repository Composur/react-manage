import React from "react";
import { connect } from "react-redux";
import ShowHeightSpeed from "./SearchighSpeed";
import Journey from "./Journey.js";
import Departdate from "./Departdate.js";
import {showCitySelector,exchangeFromTo} from './actions'
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
  const exchangeFromTo =()=>{
    return props.exchangeFromTo()
  }
  const showCitySelector =(m)=>{
    return props.showCitySelector(m)
  }
  return (
    <div>
      <Journey
        from={props.from}
        to={props.to}
        exchangeFromTo={exchangeFromTo}
        showCitySelector={showCitySelector}
      />
      <Departdate time={+new Date()} onClick={() => {}} />
      <ShowHeightSpeed highSpeed toggle={() => ({})} />
      <div style={{ padding: "10px 0 17px 0" }}>
        <button type="submit" style={submitButton}>
          {" "}
          搜索{" "}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  from: state.from,
  to: state.to,
});

const mapDispatchToProps = {showCitySelector,exchangeFromTo}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
