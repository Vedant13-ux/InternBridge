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
      searchfield:'',
      internship: [],
    };
    this.changesf=(ne)=>{
      this.setState({searchfield:ne.target.value})
    }
    this.searchclick=()=>{
      apiCall('get','/internship/search/title/'+this.state.searchfield)
      .then((d)=>{
        this.setState({internship:d})
        console.log(d)
      })
      .catch((e)=>console.log(e))
      } 
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
        <Navbar onch={this.changesf} dient={this.searchclick}></Navbar>
        <div className="homegrid">
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
