import React from "react";
import { Grid } from "semantic-ui-react";
import Colorpanel from "./sidemenu/ColorPanel";
import Sidemenu from "./sidemenu";
import Messages from "./messages";
import { connect } from "react-redux";

const Layout = ({ currentUser, currentGroup }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <Colorpanel />
    <Sidemenu />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentGroup && currentGroup.id}
        user={currentUser}
        group={currentGroup}
      />
    </Grid.Column>

    <Grid.Column width={4}>Members </Grid.Column>
  </Grid>
);
const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  currentGroup: state.groups.currentGroup
});

export default connect(mapStateToProps)(Layout);
