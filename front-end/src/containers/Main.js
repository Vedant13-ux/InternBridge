import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import Landing from "../components/Landing";
import Login from "../containers/Landing/Login";
import Signup from "../containers/Landing/Signup";
import Accounts from "../containers/Landing/Accounts";
import Bookmark from "../components/Bookmark";
// import NotFound from '../images/NotFound'
import Profile from '../components/Profile'

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
    // const currentUser = this.props.currentUser;
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
            render={(props) => <Homepage {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/bookmark" render={(props) => <Bookmark {...props} />} />
          <Route
            exact
            path="/accounts"
            render={(props) => <Accounts {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/profile/:id/:name"
            render={(props) => <Profile {...props} />}
          />
          <Route path="*" render={(props) => <div>not found</div>} />
        </Switch>
      </div>
    );
  }
}

export default Main;
