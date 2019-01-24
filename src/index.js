import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

// Components
import Loading from "./components/Loading";
import Layout from "./components/Layout";
import Login from "./components/login";
import Signup from "./components/signup";

// Components
import store from "./store";
import { setCurrentUser, setLoader } from "./actions";
import firebase from "./config/firebase";
class Root extends React.Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("/users/" + user.uid)
          .once("value")
          .then(snapshot => {
            this.props.setCurrentUser(user, snapshot.val());
          });
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.setLoader(false);
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Loading message="application" />
    ) : (
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.authentication.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setCurrentUser, setLoader }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
