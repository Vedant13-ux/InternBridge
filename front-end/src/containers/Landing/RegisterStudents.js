import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     display: "block",
//     marginTop: theme.spacing(2),
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const RegisterStudents = () => {
  // events
  const classes = useStyles();

  // styling
  const paperStyle = {
    padding: "30px 20px",
    width: 320,
    height: "70vh",
    margin: "20px auto",
  };

  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField fullWidth label="Name" placeholder="Enter your name" />
          <TextField fullWidth label="Email" placeholder="Enter your email" />

          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Branch</InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value={"CS"}>CS</MenuItem>
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"Extc"}>Extc</MenuItem>
              <MenuItem value={"Mech"}>Mech</MenuItem>
              <MenuItem value={"Etrx"}>Etrx</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Year</InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value={"FY"}>FY</MenuItem>
              <MenuItem value={"SY"}>SY</MenuItem>
              <MenuItem value={"TY"}>TY</MenuItem>
              <MenuItem value={"LY"}>LY</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default RegisterStudents;
