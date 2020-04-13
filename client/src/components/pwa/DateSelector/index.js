import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { h0 } from "../../../utils/common";
import Header from "../Header";

import "./index.css";

function Day(props) {
  const { day, onSelect } = props;

  if (!day) {
    return <td className="null"></td>;
  }

  const classes = [];

  const now = h0();

  if (day < now) { // 本月已经过去的日期不可选
    classes.push("disabled");
  }

  // 处理周六周日
  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push("weekend");
  }

  const dateString = now === day ? "今天" : new Date(day).getDate();

  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  );
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

function Week(props) {
  const { days, onSelect } = props;

  return (
    <tr className="date-table-days">
      {days.map((day, idx) => {
        return <Day key={idx} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];
  // 当前月每天的0时刻的时间戳
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // 每月的开始和结尾进行补齐用 null 填充，如星期日补齐六个
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);

  const lastDay = new Date(days[days.length - 1]);
  // 结尾补齐 
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );

  const weeks = [];
  // 每周进行分组，每周7天
  for (let row = 0; row < days.length / 7; ++row) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map((week, idx) => {
          return <Week key={idx} days={week} onSelect={onSelect} />;
        })}
      </tbody>
    </table>
  );
}

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default function DateSelector(props) {
  const { show, onSelect, onBack } = props;

  // 得到当月1号的时间戳 0 时刻
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  const monthSequence = [now.getTime()];

  // const setMonth = Array.from( new Array(3))
  const setMonth = 2; // 默认两个月
  for (let i = 0; i < setMonth; i++) {
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime()); // monthSequence [三个时间戳]
  }
  return (
    <div className={classnames("date-selector", { hidden: !show })}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables">
        {monthSequence.map(month => {
          return (
            <Month
              key={month}
              onSelect={onSelect}
              startingTimeInMonth={month}
            />
          );
        })}
      </div>
    </div>
  );
}

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
