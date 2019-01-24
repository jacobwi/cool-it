import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Groups from "./Groups";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Sidemenu extends Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#181b26", fontSize: "1.2rem" }}
      >
        <UserPanel />

        <Groups />
      </Menu>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(Sidemenu));
