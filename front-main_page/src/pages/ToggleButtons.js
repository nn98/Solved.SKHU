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
      <ToggleButton value="C">
        <span>C</span>
      </ToggleButton>
      <ToggleButton value="PYTHON">
        <span>Python</span>
      </ToggleButton>
      <ToggleButton value="JAVA">
        <span>Java</span>
      </ToggleButton>
      <ToggleButton value="JS">
        <span>JS</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
