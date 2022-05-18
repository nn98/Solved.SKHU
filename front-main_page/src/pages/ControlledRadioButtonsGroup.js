import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ControlledRadioButtonsGroup(props) {
  const handleChange = (event) => {
    props.setClassNum(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup value={props.classNum} onChange={handleChange}>
        <FormControlLabel
          value={1}
          control={<Radio color="default" />}
          label="1개"
        />
        <FormControlLabel
          value={2}
          control={<Radio color="default" />}
          label="2개"
        />
        <FormControlLabel
          value={3}
          control={<Radio color="default" />}
          label="3개"
        />
      </RadioGroup>
    </FormControl>
  );
}
