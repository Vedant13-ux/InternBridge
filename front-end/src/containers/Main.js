import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Homepage from "../components/Homepage";
import Landing from "../components/Landing";
import Login from "../containers/Landing/Login";
import Register from "./Landing/RegisterMain";
import Bookmark from "../components/Bookmark";
// import NotFound from '../images/NotFound'
import Profile from "../components/Profile";
import IntershipDetail from "./Homepage/InternshipDetail";
import { connect } from "react-redux";
import {
  updateRefresh,
  logout,
  setAuthorizationHeader,
  authUser,
  setCurrentUser,
} from "../store/actions/auth";
import LandingPage from "./Landing/landing";
import EmailVerificaton from '../components/EmailVerification'

class Main extends React.Component {
  // async componentWillMount() {
  //     if ((localStorage.jwtToken)) {
  //         console.log('Token is there')
  //         var email = '';
  //         try {
  //             email = await jwtDecode(localStorage.jwtToken)['email'].split('@')[0];
  //             console.log(email);
  //             await setAuthorizationHeader(localStorage.jwtToken);
  //             this.props.updateRefresh(email);

  //         } catch (err) {
  //             console.log(err);
  //             await this.props.logout();
  //             this.props.history.push('/');

  //         }
  //     } else {
  //         this.props.history.push('/');
  //     }
  //     if (!localStorage.isAuthenticated) {
  //         setAuthorizationHeader(false);
  //         this.props.history.push('/');
  //     }
  //     console.log("main mounted");
  // }
  render() {
    const currentUser = this.props.currentUser;
    // if (!currentUser.user._id && localStorage.getItem('isAuthenticated') !== 'false' && JSON.parse(localStorage.getItem('isAuthenticated')) !== null) {
    //     return <div></div>
    // }

    return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Landing {...props} />} />
          <Route
            exact
            path="/home"
            currentUser={currentUser}
            render={(props) => <Homepage {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route
            exact
            currentUser={currentUser}
            path="/bookmark"
            render={(props) => <Bookmark {...props} />}
          />
          <Route
            exact
            currentUser={currentUser}
            path="/internship/:id"
            render={(props) => (
              <IntershipDetail key={props.match.params.id} {...props} />
            )}
          />
          <Route
            exact
            currentUser={currentUser}
            path="/bookmark"
            render={(props) => <Bookmark {...props} />}
          />
          <Route
            exact
            path="/internship/:id"
            render={(props) => (
              <IntershipDetail key={props.match.params.id} {...props} />
            )}
          />
          <Route
            exact
            currentUser={currentUser}
            path="/bookmark"
            render={(props) => <Bookmark {...props} />}
          />
          <Route
            exact
            currentUser={currentUser}
            path="/landing"
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            exact
            currentUser={currentUser}
            path="/register"
            render={(props) => <Register {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/profile/:id/:name"
            render={(props) => <Profile {...props} />}
          />
          <Route exact path="/verify-email/:token" render={props => <EmailVerificaton {...props} authUser={this.props.authUser} />} />
          <Route path="*" render={(props) => <div>not found</div>} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, setCurrentUser, updateRefresh, logout })(
    Main
  )
);
