import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { lightBlue } from "@mui/material/colors";

export default function CopyRadioButtonsGroup(props) {
  const handleChange = (event) => {
    props.setCopy(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup value={props.copy} onChange={handleChange}>
        <FormControlLabel
          value="resultCopy"
          control={
            <Radio
              sx={{
                color: lightBlue[800],
                "&.Mui-checked": {
                  color: lightBlue[600],
                },
              }}
            />
          }
          label="결과만 복사"
        />
        <FormControlLabel
          value="allCopy"
          control={
            <Radio
              sx={{
                color: lightBlue[800],
                "&.Mui-checked": {
                  color: lightBlue[600],
                },
              }}
            />
          }
          label="전체 복사"
        />
      </RadioGroup>
    </FormControl>
  );
}
