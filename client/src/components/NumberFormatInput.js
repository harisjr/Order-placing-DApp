import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const NumberFormatInput = ({
  onChange,
  value,
  label,
  InputProps,
  required,
  error,
  name,
  margin,
}) => {
  const [val, setVal] = useState("");
  const addCommas = (num) => {
    if (Number(num) < 1) {
      return "";
    } else {
      return Number(num).toLocaleString("en-us");
    }
  };

  const removeNonNumeric = (num) => num.toString().replace(/\D/g, "");

  const handleChange = (event) => {
    onChange(removeNonNumeric(event.target.value));
    setVal(addCommas(removeNonNumeric(event.target.value)));
  };

  useEffect(() => {
    if (value) {
      setVal(addCommas(Number(value)));
    } else {
      setVal("");
    }
  }, [value]);

  return (
    <Box>
      <TextField
        name={name}
        label={label}
        margin={margin}
        type="text"
        value={val}
        onChange={(data) => handleChange(data)}
        InputProps={InputProps}
        size="small"
        sx={{ background: "#f5f5f5" }}
      />
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
    </Box>
  );
};

export default NumberFormatInput;
