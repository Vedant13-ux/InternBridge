import React, { Component } from "react";
import { apiCall } from "../api/api";
import ExperienceForm from "./ExperienceForm";
import Navbar from "../containers/Global/Navbar";
import Fab from "@material-ui/core/Fab";
import StarIcon from "@material-ui/icons/Star";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";

import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      show1: false,
      show2: false,
      show3: false,
      lookingforjob: "",
      owner: true,
      bioEditable: false,
    };
    this.start = true;
    this.edit = (a, b) => {
      this.setState({ a: b });
    };
    this.handleClose1 = (e) => {
      this.setState({ bioEditable: !this.state.bioEditable });
      this.bio.current.style.border = "4px solid black";
    };
    this.bio = React.createRef();

    // Handle Bio
    this.handleEdit = (e) => {
      this.bio.current.focus();
      this.setState({ bioEditable: !this.state.bioEditable });
    };
    this.handleSaveBio = (e) => {
      this.setState({ bioEditable: !this.state.bioEditable });
    };

    this.deleteCert = (index) => {
      console.log(index);
    };

    //handle experience
    this.handleClose2 = () => {
      this.setState({ show2: !this.state.show2 });
      //   this.bio.current.style.border = "4px solid black";
    };

    //delete certificate
    this.handleClose3 = () => {
      this.setState({ show3: !this.state.show3 });
      //   this.bio.current.style.border = "4px solid black";
    };
  }
  componentDidMount() {
    apiCall(
      "get",
      `/user/profile/${this.props.match.params.id}/${this.props.match.params.name}`,
      ""
    )
      .then(async (user) => {
        this.start = false;
        await this.setState({ user });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if (this.start) {
      return <div></div>;
    }
    return (
      <div id="profile">
        <Navbar
          {...this.props}
          user={this.props.user}
          logout={this.props.logout}
        ></Navbar>
        <div className="jumbo">
          <div className="container icons">
            <div class="profile-picture">
              <img src={this.state.user.photo} alt="profilePic"></img>
            </div>
            <div className="left-icons">
              <Fab color="primary" aria-label="add" className="body">
                <ThumbUpAltIcon />
              </Fab>

              <Fab
                color="primary"
                aria-label="add"
                style={{ marginLeft: "10px" }}
                className="uibtn"
              >
                <StarIcon />
              </Fab>
            </div>
          </div>

          <div class="details">
            <h3>{this.state.user.name}</h3>
            <p>
              {this.state.user.dept} - {this.state.user.year}
            </p>
          </div>

          <div className="container">
            <div className="lookForJob">
              <Typography variant="h5" component="h4">
                <div className="headings">
                  Bio
                  <Fab
                    size="small"
                    color="primary"
                    style={{ marginLeft: "5px" }}
                    aria-label="add"
                    onClick={this.handleEdit}
                    className="uibtn"
                  >
                    <EditIcon />
                  </Fab>
                  {this.state.bioEditable && (
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SaveIcon />}
                      onClick={this.handleSaveBio()}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </Typography>
              <Paper
                className="paper"
                contentEditable={this.state.bioEditable}
                ref={this.bio}
              >
                Lorem iossdkjas dkajshd kasjdha kshdasd Lorem iossdkjas dkajshd
                kasjdha kshdasd Lorem iossdkjas dkajshd kasjdha kshdasd Lorem
                iossdkjas dkajshd kasjdha kshdasd Lorem iossdkjas dkajshd
                kasjdha kshdasd
              </Paper>

              {/* <Dialog
                open={this.state.show1}
                onClose={this.handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Edit Looking for a Job
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <input
                      type="text"
                      onClick={(e) =>
                        this.edit("lookingforjob", e.target.value)
                      }
                    ></input>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handlesublfj} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog> */}

              <Dialog
                open={this.state.show2}
                onClose={this.handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Add Experience
                </DialogTitle>
                <DialogContent>
                  <ExperienceForm />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handlesubmit2} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="experiences">
              <Typography variant="h5" component="h4">
                <div className="headings">
                  Experiences
                  <Fab
                    size="small"
                    color="primary"
                    onClick={this.handleClose2}
                    aria-label="add" 
                    style={{ marginLeft: "5px" }}
                  >
                    <AddIcon />
                  </Fab>
                </div>
                <div class="ui stacked segments">
                  {this.state.user.experiences.map((e, i) => {
                    return (
                      <div class="ui segment">
                        <div className="experience-ele">
                          <h4>{e.title}</h4>
                          <sub>{e.type}</sub>
                          {this.props.owner && (
                            <span
                              className="deleteproj"
                              onClick={() => this.handleshow2(e)}
                            >
                              <i className="fa fa-edit"></i>
                            </span>
                          )}
                          <p>
                            <span style={{ display: "block" }}>
                              {e.company}
                            </span>
                            {new Date(e.startdate).toDateString() +
                              "-" +
                              (e.enddate === null
                                ? "Present"
                                : new Date(e.enddate).toDateString())}
                            <br></br>
                            <h6>{e.description}</h6>
                          </p>
                          {/* <hr className="short br-lighter"></hr> */}
                        </div>
                      </div>
                    );
                  })}
                  {/* {this.state.user.experiences.length === 0 && (
                    <NoExperience></NoExperience>
                  )} */}
                </div>
              </Typography>
              <div style={{ padding: "20px" }}>
                {this.state.user.experience && (
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          {this.state.user.experience.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {this.state.user.experience.description}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )}
              </div>
            </div>

            {/* certificates */}

            <div className="panel" id="certificates">
              <div className="panel-heading">
                <span className="panel-icon">
                  <i className="fa fa-pencil" />
                </span>

                <Typography variant="h5" component="h4">
                  <div className="headings">
                    Certificates
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="add"
                      onClick={this.handleClose3}
                      style={{ marginLeft: "5px" }}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </Typography>
                {this.props.isowner && (
                  <span className="add" onClick={this.handleShow3}>
                    <i className="far fa-plus-square"></i>
                  </span>
                )}
              </div>
              <div className="panel-body pb5" style={{ marginTop: "1rem" }}>
                <div class="ui stacked segments">
                  {this.state.user.certificates.map((s, i) => (
                    <div class="ui segment">
                      <h4 style={{ margin: "0" }}>
                        {s.title}
                        {this.props.isowner && (
                          <span
                            className="deletecert"
                            onClick={() => this.deletecert(s._id)}
                          >
                            <i className="fa fa-trash"></i>
                          </span>
                        )}
                      </h4>
                      <p>
                        <img
                          style={{
                            paddingRight: "0.5rem",
                          }}
                          className="providerimg mr-2"
                          src={
                            "https://www.google.com/s2/favicons?sz=20&domain_url=" +
                            s.link
                              .replace("http://", "")
                              .replace("https://", "")
                              .split(/[/?#]/)[0]
                          }
                          alt="logo"
                        ></img>
                        {s.provider}
                        <br></br>
                        <div
                          className="issued"
                          style={{ paddingTop: "0.5rem" }}
                        >
                          Issued: {new Date(s.date).toDateString()}
                        </div>

                        <div
                          className="credentials"
                          style={{ paddingTop: "0.5rem" }}
                        >
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#3F51B5", textDecoration: "none" }}
                          >
                            See creditential
                          </a>
                        </div>
                        <div className="delIcon" style={{ float: "right" }}>
                          <DeleteIcon
                            color={"primary"}
                            onClick={() => this.deleteCert(i)}
                          />
                        </div>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Dialog
              open={this.state.show3}
              onClose={this.handleClose3}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Add Certificate</DialogTitle>
              <DialogContent>
                <form onSubmit={this.handleSubmit}>
                  <div className="ui form">
                    <div className="field">
                      <label>Title</label>
                      <input
                        name="title"
                        maxLength="30"
                        required
                        val={"fill here"}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="eg. Completed Course on Java"
                      ></input>
                    </div>
                    <div className="field">
                      <label>Provider</label>
                      <input
                        name="provider"
                        maxLength="30"
                        required
                        val={"fill here"}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="eg. Udemy"
                      ></input>
                    </div>
                    <div className="field">
                      <label>Issued on</label>
                      <input
                        required
                        type="Date"
                        name="date"
                        val={"fill here"}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div className="field">
                      <label>Link</label>
                      <input
                        name="link"
                        maxLength="100"
                        required
                        val={"fill here"}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="eg. https://www.udemy.com/certificate/UC-fb6...."
                      ></input>
                    </div>

                    <div className="submit confirmdiv">
                      <button className="medium ui button confirm">ADD</button>
                    </div>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handlesublfj} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {/* certificates end */}

            {/* achievements  */}

            <div className="panel" id="achievements">
              <div className="panel-heading">
                <span className="panel-icon">
                  <i className="fa fa-pencil" />
                </span>

                <Typography variant="h5" component="h4">
                  <div className="headings">
                    Achievements
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="add"
                      onClick={this.handleClose4}
                      style={{ marginLeft: "5px" }}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </Typography>
                {this.props.isowner && (
                  <span className="add" onClick={this.handleShow4}>
                    <i className="far fa-plus-square"></i>
                  </span>
                )}
              </div>
              <div className="panel-body pb5" style={{ marginTop: "1rem" }}>
                <div class="ui stacked segments">
                  {this.state.user.achievements.map((e, i) => {
                    return (
                      <div class="ui segment">
                        <div className="experience-ele">
                          <h4>{e.title}</h4>
                          {this.props.owner && (
                            <span
                              className="deleteproj"
                              onClick={() => this.handleClose4(e)}
                            >
                              <i className="fa fa-edit"></i>
                            </span>
                          )}
                          <h5>Award/Prize : {e.reward}</h5>
                          <div>
                            Date : {new Date(e.date).toDateString()}
                            <br></br>
                            <h6>{e.description}</h6>
                          </div>
                          {e.link && (
                            <div>
                              <a href={e.link} target="_blank" rel="noreferrer">
                                See achievement
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Dialog
              open={this.state.show3}
              onClose={this.handleClose3}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Add Certificate</DialogTitle>
              <DialogContent>
                <form onSubmit={this.handleSubmit}>
                  <div className="ui form">
                    <div className="field">
                      <label>Title</label>
                      <input
                        name="title"
                        maxLength="30"
                        required
                        val={"fill here"}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="eg. Completed Course on Java"
                      ></input>
                    </div>
                    <div className="field">
                      <label>Provider</label>
                      <input
                        name="provider"
                        maxLength="30"
                        required
                        val={"fill here"}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="eg. Udemy"
                      ></input>
                    </div>
                    <div className="field">
                      <label>Issued on</label>
                      <input
                        required
                        type="Date"
                        name="date"
                        val={"fill here"}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div className="field">
                      <label>Link</label>
                      <input
                        name="link"
                        maxLength="100"
                        required
                        val={"fill here"}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="eg. https://www.udemy.com/certificate/UC-fb6...."
                      ></input>
                    </div>

                    <div className="submit confirmdiv">
                      <button className="medium ui button confirm">ADD</button>
                    </div>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handlesublfj} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {/* achivements end */}
            <div className="contactInfo">
              <Typography variant="h5" component="h4">
                <div className="headings">
                  Contact Info
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    style={{ marginLeft: "5px" }}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </Typography>
              <div className="paper">
                <div>
                  <strong>Email - </strong> {this.state.user.email}
                </div>
                <div>
                  <strong>Phone - </strong> {this.state.user.phoneNumber}
                </div>
              </div>
            </div>

            <hr></hr>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
