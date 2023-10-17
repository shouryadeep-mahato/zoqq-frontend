import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

function CustomDateRange(props) {
    const { from, to, setFromDate, setToDate } = props;
    const today = dayjs(Date.now());

    // console.log(today.toString()

    return (
        <div className='d-flex align-items-center' style={{ maxWidth: '500px' }}>
            <p className='grey1 my-auto text-nowrap' style={{padding:"5px"}}>From |</p>
            <DatePicker
                placeholder="From Date"
                value={from}
                onChange={setFromDate}
                views={['year', 'month', 'day']}
                format="YYYY-MM-DD"
                className='w-50'
                maxDate={today}
            />
            
            <p className='grey1 my-auto text-nowrap'>To |</p>
            <DatePicker
                placeholder="To Date"
                value={to}
                onChange={setToDate}
                views={['year', 'month', 'day']}
                format="YYYY-MM-DD"
                className='w-50'
                minDate={from}
                maxDate={today}
                disabled={!from}
            />
        </div>
    );
}

export default CustomDateRange;
