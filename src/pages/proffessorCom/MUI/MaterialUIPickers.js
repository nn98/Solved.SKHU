import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState(dayjs(""));
  // dayjs 양식, "2014-08-18T21:11:54"
  const handleChange = (newValue) => {
    props.setPdate(newValue);
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Dead Line"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              height: "7%",
              width: "90%",
              marginLeft: "3%",
              input: { color: "white" },
              svg: { color: "white" },
            }}
            focused
          />
        )}
      />
    </LocalizationProvider>
  );
}
