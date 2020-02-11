//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState } from "react";
import DatePicker from "react-date-picker";
//import DatePicker from 'react-date-picker/dist/entry.nostyle'

const DataPicker = props => {
  const [date, setDate] = useState(new Date());

  const onChange = date => setDate(date);
  console.log(date);

  return (
    <div>
      <DatePicker
        maxDate={props.maxDate}
        minDate={props.minDate}
        className="react-data-picker-custom"
        onChange={onChange}
        value={date}
      />
    </div>
  );
};

export default DataPicker;

DataPicker.defaultProps = {
    minDate : new Date('2018')
}