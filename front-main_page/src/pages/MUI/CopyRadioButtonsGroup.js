import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function CopyRadioButtonsGroup(props) {
  const handleChange = (event) => {
    props.setCopy(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup value={props.copy} onChange={handleChange}>
        <FormControlLabel
          value="resultCopy"
          control={<Radio color="default" />}
          label="결과만 복사"
        />
        <FormControlLabel
          value="allCopy"
          control={<Radio color="default" />}
          label="전체 복사"
        />
      </RadioGroup>
    </FormControl>
  );
}
