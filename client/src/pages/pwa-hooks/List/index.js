import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { reqTripLists } from "../../../api";
import { setHeadTitle} from "../reducer";
import TripList from "./list";
function SearchDetail({ from, to, setHeadTitle }) {
  setHeadTitle(from + " ⇀ " + to);
  useEffect(() => {
    const getTripLists = async () => {
      const res = await reqTripLists({ from, to });
      console.log(res);
    };
    getTripLists();
  }, [from, to]);
  return <TripList />;
}
const mapStateToProps = ({ from, to }) => ({
  from,
  to
});
const mapDispatchToProps = { setHeadTitle };
export default connect(mapStateToProps, mapDispatchToProps)(SearchDetail);
