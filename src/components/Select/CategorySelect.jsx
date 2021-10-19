import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CategorySelect(props) {
  const classes = useStyles();
  const [defaultValue, setDefaultValue] = useState(props?.category);
  const arr = [
    "Thiệp cưới",
    "Sinh nhật",
    "Thiệp mời",
    "Giáng sinh",
    "Tình nhân",
    "Q.Tế Phụ Nữ",
    "Thầy Cô",
    "Năm mới",
    "Sổ kí tên",
    "Bao lì xì",
    "Bao thư",
    "Name Card",
    "Menu",
    "Thiệp mời công ty",
    "Thiệp chúc công ty",
    "Popup sinh nhật",
    "Popup giáng sinh",
  ];

  useEffect(() => {
    if (props.category) {
      setDefaultValue(props.category);
    }
  }, [props?.category]);

  const handeChange = (event, value) => {
    if (value) {
      props.handleChange(value);
    } else {
      props.handleChange("");
    }
  };

  return (
    <Autocomplete
      id="country-select-demo"
      autoComplete={false}
      style={{ width: "100%" }}
      options={arr}
      defaultValue={defaultValue}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          defaultValue={defaultValue}
          label="Loại thiệp *"
        />
      )}
      onChange={handeChange}
    />
  );
}
