import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "@material-ui/lab/Alert";
import { apiCallAuth } from "../../api/api";

class RegisterStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      branch: "",
      password: "",
      year: "",
      confirm: "",
      role: "Student",
      error: "",
      success: false,
    };
    this.handleChange = (e) => {
      return this.setState({ [e.target.name]: e.target.value });
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      const { name, email, phoneNumber, password, year, role } = this.state;
      const data = { name, email, phoneNumber, password, year, role };
      apiCallAuth("post", "/signup", data)
        .then(async (response) => {
          console.log(response);
          await this.setState({ success: true });
        })
        .catch((err) => {
          console.log(err);
          return this.setState({ error: err.message });
        });
    };
  }

  render() {
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const paperStyle = {
      padding: "30px 20px",
      width: 340,
      margin: "20px auto",
    };

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
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              placeholder="Enter your name"
              onChange={this.handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={this.handleChange}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              onChange={this.handleChange}
              required
            />

            <FormControl style={{ margin: "3px", minWidth: "120px" }}>
              <InputLabel htmlFor="grouped-select">Branch</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                onChange={this.handleChange}
                required
                name="branch"
              >
                <MenuItem value={"CS"}>CS</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"Extc"}>Extc</MenuItem>
                <MenuItem value={"Mech"}>Mech</MenuItem>
                <MenuItem value={"Etrx"}>Etrx</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ margin: "3px", minWidth: "150px" }}>
              <InputLabel htmlFor="grouped-select">Year</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                onChange={this.handleChange}
                required
                name="year"
              >
                <MenuItem value={"FY"}>FY</MenuItem>
                <MenuItem value={"SY"}>SY</MenuItem>
                <MenuItem value={"TY"}>TY</MenuItem>
                <MenuItem value={"LY"}>LY</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="password"
              required
              fullWidth
              label="Password"
              placeholder="Enter your password"
              onChange={this.handleChange}
              type="password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
              onChange={this.handleChange}
              name="confirm"
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "10px 0" }}
            >
              Sign up
            </Button>
          </form>
          {this.state.error !== "" && (
            <Alert severity="error">{this.state.error}</Alert>
          )}
          {this.state.success && (
            <Alert severity="success">
              Please click on the link sent to you on your Email.{" "}
            </Alert>
          )}
        </Paper>
      </Grid>
    );
  }
}

export default RegisterStudents;
