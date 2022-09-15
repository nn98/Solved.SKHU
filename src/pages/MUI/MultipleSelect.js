import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, subjectName, theme) {
  return {
    fontWeight:
      subjectName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setSubject(value);
    lectureName(value);
  };

  const lectureName = (id) => {
    for (let i = 0; i < props.lecture.length; ++i) {
      if (props.lecture[i].ID === id)
        props.setLectureName(props.lecture[i].name);
    }
  };

  return (
    <div>
      <FormControl sx={{ width: 215, marginBottom: 3 }}>
        <InputLabel id="demo-multiple-name-label">강의 명</InputLabel>
        <Select
          id="demo-multiple-name"
          value={props.subject}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {props.lecture &&
            props.lecture.map((data, index) => (
              <MenuItem
                key={data.ID}
                value={data.ID}
                style={getStyles(data.name, data.name, theme)}
              >
                {data.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
