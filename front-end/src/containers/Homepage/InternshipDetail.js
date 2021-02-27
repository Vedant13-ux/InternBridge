import React, { Component } from "react";
import Navbar from "../Global/Navbar";
import {Link} from 'react-router-dom'
import {apiCall} from '../../api/api'

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
                          <i className="fa fa-clock mr-1"></i>Duration
                </h4><p>{this.state.details.duration} months</p>
                      </div>
                      <div className="flex-item">
                        <h4>
                          <i className="fa fa-home mr-1"></i>Type
                </h4><p> {this.state.details.type}</p>
                      </div>

                      <div className="flex-item"><h4>
                        <i className="fa fa-hourglass mr-2"></i>Apply by
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
                    {/* {this.state.user.role === "Student" && (this.state.details.faculty._id !== this.state.user._id) &&
                      <div>
                        {!this.state.applied && !this.state.passed &&
                          <div>
                            <div className="applynow">
                              <button type="button" className="btn btn-lg btn-default" onClick={this.handleShow2}>
                                Apply Now
                              </button>
                            </div>
                            <Modal show={this.state.show2} onHide={this.handleClose2} centered backdrop="static">
                              <Modal.Header closeButton>
                                <Modal.Title>Application</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <form id="applyForm" className="ui form" onSubmit={this.handleApply}>
                                  <div className="field">
                                    <label>{this.state.ques1}</label>
                                    <textarea
                                      maxlength="200"
                                      rows="3"
                                      required
                                      name="ans1"
                                      value={this.state.ans1}
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </div>
                                  <div className="field">
                                    <label>{this.state.ques2}</label>
                                    <textarea
                                      maxlength="200"
                                      rows="2"
                                      required
                                      name="ans2"
                                      value={this.state.ans2}
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <button className="ui small button" >
                                      Apply Now
                                    </button>
                                  </div>
                                </form>
                              </Modal.Body>
                            </Modal>
                          </div>
                        }
                        {this.state.applied && !this.state.passed &&
                          <div className="applynow">
                            <button type="button" className="btn btn-lg btn-default" disabled="true">
                              Applied
                          </button>
                          </div>
                        }
                        {
                          this.state.passed &&
                          <div className="applynow">
                            <button type="button" className="btn btn-lg btn-default" disabled="true">
                              Internship Expired
                            </button>
                          </div>
                        }

                        {/* {this.state.owner &&
                          <div className="applynow">
                            <ExcelFile element={<button>Download Data</button>}>
                              <ExcelSheet data={} name="Employees">
                                <ExcelColumn label="Name" value="name" />
                                <ExcelColumn label="Wallet Money" value="amount" />
                                <ExcelColumn label="Gender" value="sex" />
                                <ExcelColumn label="Marital Status"
                                  value={(col) => col.is_married ? "Married" : "Single"} />
                              </ExcelSheet>
                            </ExcelFile>
                          </div>
                        } */}

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