import React, { Component } from "react";
import Navbar from "../containers/Global/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Internshipcard from '../containers/Homepage/Internshipcard'
import {apiCall} from '../api/api'

class Homepage extends Component {
  constructor(props) {
      super(props)
    this.state = {
      internship: [],
    };
  }
  componentDidMount(){
    apiCall('get','/internship/getAll')
    .then((d)=>{
      this.setState({internship:d})
      console.log(d)
    })
    .catch((e)=>console.log(e))
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="homegrid">
          <Grid container spacing={3}>
            {this.state.internship.map((d, i) => {
            return (
                <Grid item xs={3}>
                  <Internshipcard key={i} data={d}></Internshipcard>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Homepage;
