import React, { Component, useState } from "react";
import Navbar from "../containers/Global/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Internshipcard from "../containers/Homepage/Internshipcard";
import { apiCall } from "../api/api";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import Filter from "../containers/Homepage/filterinternship";
import InternshipCreate from '../containers/Homepage/addinternship'

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: "",
      internship: [],
    };
    this.changesf = (ne) => {
      this.setState({ searchfield: ne.target.value });
    };
    this.searchclick = () => {
      if (this.state.searchfield === "") {
        apiCall("get", "/internship/getAll")
          .then((d) => {
            this.setState({ internship: d });
            console.log(d);
          })
          .catch((e) => console.log(e));
      } else {
        apiCall("get", "/internship/search/title/" + this.state.searchfield)
          .then((d) => {
            this.setState({ internship: d });
            console.log(d);
          })
          .catch((e) => console.log(e));
      }
    };
  }
  componentDidMount() {
    apiCall("get", "/internship/getAll")
      .then((d) => {
        this.setState({ internship: d });
        console.log(d);
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap-grid.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/icon.min.css"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/dropdown.min.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/input.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/form.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/site.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/button.min.css"></link>
        <Navbar onch={this.changesf} dient={this.searchclick}></Navbar>
        <div className="homegrid">
          <div style={{ marginBottom: "10px" }}>
            <Filter></Filter>
            <InternshipCreate></InternshipCreate>
          </div>
          <div className="row">
            {this.state.internship.map((d, i) => {
              return (
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <Internshipcard key={i} data={d}></Internshipcard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
