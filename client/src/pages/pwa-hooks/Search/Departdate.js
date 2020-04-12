import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { h0,parseTime } from '../../../utils/common';
// import dayjs from 'dayjs';
import './Departdate.css';

export default function DepartDate(props) {
    const { time, onClick } = props;

    const h0OfDepart = h0(time); // 每天每时每刻的时间都是初始的 不用重复计算
   
    const departDateString = useMemo(() => {
        return parseTime(h0OfDepart,'{y}-{m}-{d}')
    }, [h0OfDepart]);

    const isToday = h0OfDepart === h0(); // 判断是否是当天
    const departDate = new Date(h0OfDepart);
    const weekString =
        '周' +
        ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
        (isToday ? '（今天）' : '');

    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString} />
            {departDateString} <span className="depart-week">{weekString}</span>
        </div>
    );
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};
