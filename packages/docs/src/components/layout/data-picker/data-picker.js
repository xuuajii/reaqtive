import React,{useState} from "react";
import DatePicker from "react-date-picker";

const DataPicker = props => {

  const [date, setDate] = useState(new (Date));

  const onChange = date => setDate(date);
  console.log(date)

  return (
    <div>
      <DatePicker onChange={onChange} value={date} />
    </div>
  );
};

export default DataPicker;
