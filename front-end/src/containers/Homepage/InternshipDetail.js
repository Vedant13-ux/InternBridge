import React, { Component } from "react";
import Navbar from "../Global/Navbar";
import {Link} from 'react-router-dom'
import {apiCall} from '../../api/api'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import HomeIcon from '@material-ui/icons/Home';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Applybut from './applybut'

class InternshipDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      details:{},
      start:true,
    }
  }
  componentDidMount(){
    console.log(this.props.match.params.id)
    apiCall('get','/internship/details/'+this.props.match.params.id)
    .then((d)=>{
      this.setState({details:d,start:false,exists:true})
    }).catch((e)=>{
      console.log(e)
      this.setState({exist:false})
    }
      )
  }

  // For Applying in a Internship
//   handleApply(e) {
//     e.preventDefault();
//     console.log('Apply ma aaay');
//     const applicantId = this.state.user._id;
//     const internshipId = this.state.details._id;
//     const applyBody = { answers: [this.state.ans1, this.state.ans2], applicantId, internshipId };
//     console.log(applyBody);
//     this.props.internshipApply(applyBody, this.state.details.faculty)
//       .then(async () => {
//         await this.setState({ applied: true });
//       })
//       .catch(err => console.log(err))
//   }

  contentDisplay(exists, start) {
    if (start) {
      return (
        <div className="loading-anime">
          loading...
        </div>
      )
    }
    if (exists) {
      return (
        <div id="internshipdetail">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12" id="mainDetails">
                <div className="card">
                  <div className="card-body">
                    <div className="internshipTitle">
                      <h1>{this.state.details.title}</h1>
                      <div className="floatingclass"><div>
                        {/* {this.state.details.faculty.email === this.props.currentUser.user.email && (
                          <span
                            className="deleteproj"
                            onClick={this.handleShow3}
                          >
                            <i className="fa fa-edit"></i>
                          </span>
                        )} */}
                        </div></div>
                    </div>
                    <div className="provider">
                      <img
                        src={this.state.details.faculty.photo}
                        alt="pfp"
                        className="avatar-pro"
                      ></img>
                      <Link className="author" to={"/profile/" + this.state.details.faculty._id+'/'+this.state.details.faculty.name}>
                        {this.state.details.faculty.name}
                      </Link>
                    </div>
                    <br></br>
                    <div id="iconinfo" className="flex-container">
                      <div className="flex-item">
                        <h4>
                          <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                          }}>
                              <AccessTimeIcon />
                              <span>Duration</span>
                          </div>  
                </h4><p>{this.state.details.duration} months</p>
                      </div>
                      <div className="flex-item">
                        <h4>
                          <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                          }}>
                              <HomeIcon />
                              <span>Type</span>
                          </div>  
                </h4><p> {this.state.details.type}</p>
                      </div>

                      <div className="flex-item"><h4>
                        <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                          }}>
                              <HourglassEmptyIcon />
                              <span>Apply by</span>
                          </div>  
                    </h4><p>{(new Date(this.state.details.applyBy)).toDateString()}</p></div>
                    </div><hr></hr>
                    <h3>About Internship</h3>
                    <p>{this.state.details.description}</p>
                    <h3>Who can Apply</h3>
                    <p>{this.state.details.whoCanApply}</p>
                    <h3>Other Requirement</h3>
                    <p>{this.state.details.otherRequirements}</p>
                    <h3>Skills Required</h3>
                    <div>
                      {this.state.details.skillsRequired.map((skill, ind) => {
                        return (
                          <div id={ind} className="tagsskill">
                            {skill}
                          </div>
                        );
                      })}
                    </div>
                    <h3>Perks</h3>
                    <p>{this.state.details.perks}</p>
                    <h3> Number of Opening</h3>
                    <p>{this.state.details.numberOpenings}</p>

                    <h3>
                      Applicants {this.state.owner &&
                        <div>
                          <button onClick={this.handleShow1} className="mailAppl ui small button">Mail Applicants</button>
                          {/* <ExcelFile element={<button className="mailAppl ui small button">Download Application data</button>}>
                            <ExcelSheet data={this.state.downloaddata} name="Applications">
                              <ExcelColumn label="Name" value="name" />
                              <ExcelColumn label="Roll no." value="rollNo" />
                              <ExcelColumn label="Department" value="dept" />
                              <ExcelColumn label="Year" value="year" />
                              <ExcelColumn label="Email" value="email" />
                              <ExcelColumn label={this.state.ques1} value="a1" />
                              <ExcelColumn label={this.state.ques2} value="a2" />
                              <ExcelColumn label="Profile link" value={(c) => 'https://kjsce-connect-frontend.herokuapp.com/profile/' + c.email.split('@')[0]} />

                            </ExcelSheet>
                          </ExcelFile> */}
                        </div>
                      }
                    </h3>
                    <span className="appliList">
                      {
                        this.state.details.applicants.map(app =>
                          <span className="applicant">
                            <img src={app.photo} alt=""></img>
                            <span className="name">{app.fname} {app.lname}</span>
                          </span>
                        )}
                    </span>
                   
                          <center>
                            <Applybut></Applybut>
                          </center>
                      </div>
                    
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4 col-12 recommendations">
                <div className="card recomm">
                  <h3>Recommendations</h3>
                  <hr></hr>
                  <div className="scroll">
                    {this.state.recommlist.map((int, ind) => {
                      return <RecommInternship {...int}></RecommInternship>
                    })}
                  </div>

                </div>

              </div> */}
            </div>
          </div>
      )
    } else if (exists === false) {
      return (
        <div>doesnt exist</div>

      )
    }
  }



  render() {
    const { exists, start } = this.state;
    return (
      <div>
        <Navbar ></Navbar>
        {this.contentDisplay(exists, start)}
      </div>
    );
  }
}

export default InternshipDetail