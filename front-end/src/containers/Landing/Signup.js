import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      user: this.props.user,
    };
    this.handleChange = (e) => {
      return this.setState({ [e.target.name]: e.target.value });
    };
  }

  render() {
    return (
      <div>
        <Paper square>
          <Tabs
            value={this.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Active" />
            <Tab label="Disabled" disabled />
            <Tab label="Active" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default SignInContainer;
