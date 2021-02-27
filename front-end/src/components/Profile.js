import React, { Component } from "react";
import { apiCall } from "../service/api";
import Navbar from "../containers/Global/Navbar";
import Fab from "@material-ui/core/Fab";
import StarIcon from "@material-ui/icons/Star";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            show1: false,
            lookingforjob: ''
        };
        this.start = true;
        this.edit = (a, b) => {
            this.setState({ a: b })
        }
        this.handleClose1 = (e) => {
            this.setState({ show1: !this.state.show1 });
        };
        this.handlesublfj = () => {
            console.log('aya')
            apiCall('put', '/users/profile/update/lookingforjob', { userId: this.state.user._id, lookingForJob: this.state.lookingforjob }).then(
                this.setState({ lookingForJob: this.state.lookingforjob, show1: false })

            )
        }
        // console.log('')
    }
    componentDidMount() {
        apiCall(
            "get",
            `/users/profile/${this.props.match.params.id}/${this.props.match.params.name}`,
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
                <Navbar {...this.props} user={this.props.user} logout={this.props.logout}></Navbar>
                <div className="jumbo">
                    <div className="container icons">
                        <div class="profile-picture">
                            <img src={this.state.user.photo} alt="profilePic"></img>
                        </div>
                        <div className="left-icons">
                            <Fab color="secondary" aria-label="add" className="body">
                                <ThumbUpAltIcon />
                            </Fab>
                            <Fab
                                color="secondary"
                                aria-label="add"
                                className="body"
                                style={{ marginLeft: "10px" }}
                            >
                                <StarIcon />
                            </Fab>
                        </div>
                    </div>

                    <div class="details">
                        <h3>Leonardo DiCaprio</h3>
                        <p>Actor / Environmentalist</p>
                    </div>

                    <div className="container">
                        <div className="lookForJob">
                            <Typography variant="h5" component="h4">
                                <div className="headings">
                                    Looking For a Job
                  <Fab
                                        size="small"
                                        color="secondary"
                                        aria-label="add"
                                        style={{ marginLeft: "5px" }}
                                        onClick={this.handleClose1}
                                    >
                                        <EditIcon />
                                    </Fab>
                                </div>
                            </Typography>
                            <div className="paper">
                                Lorem iossdkjas dkajshd kasjdha kshdasd Lorem iossdkjas dkajshd
                                kasjdha kshdasd Lorem iossdkjas dkajshd kasjdha kshdasd Lorem
                                iossdkjas dkajshd kasjdha kshdasd Lorem iossdkjas dkajshd
                                kasjdha kshdasd
              </div>

                            <Dialog
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
                                        <input type="text" onClick={(e) => this.edit('lookingforjob', e.target.value)}></input>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handlesublfj} color="primary">
                                        Submit
                  </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <hr></hr>
                        <div className="experiences">
                            <Typography variant="h5" component="h4">
                                <div className="headings">
                                    Experiences
                  <Fab
                                        size="small"
                                        color="secondary"
                                        aria-label="add"
                                        style={{ marginLeft: "5px" }}
                                    >
                                        <EditIcon />
                                    </Fab>
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

                        <div className="contactInfo">
                            <Typography variant="h5" component="h4">
                                <div className="headings">
                                    Contact Info
                  <Fab
                                        size="small"
                                        color="secondary"
                                        aria-label="add"
                                        style={{ marginLeft: "5px" }}
                                    >
                                        <EditIcon />
                                    </Fab>
                                </div>
                            </Typography>
                            <div className="paper">
                                <div>
                                    <strong>Email - </strong> {this.state.user.email}
                                </div>
                                <div>
                                    <strong>Phone - </strong> {this.state.user.contactInfo}
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
