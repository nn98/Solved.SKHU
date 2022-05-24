import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons(props) {
  const handleAlignment = (event, newSubject) => {
    props.setSubject(newSubject);
  };

  return (
    <ToggleButtonGroup
      value={props.subject}
      exclusive
      onChange={handleAlignment}
    >
      {props.lecture &&
        props.lecture.map((data, index) => (
          <ToggleButton key={data.ID} value={data.name}>
            <span>{data.name}</span>
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
}
