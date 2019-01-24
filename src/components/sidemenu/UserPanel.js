import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";

class UserPanel extends Component {
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span>Sign Out</span>
    }
  ];
  render() {
    return (
      <Grid style={{ background: "#181b26" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.6em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="braille" />
              <Header.Content>Cool It!</Header.Content>
            </Header>
          </Grid.Row>

          <Header style={{ padding: "1em" }} as="h4" inverted>
            <Image
              src={this.props.currentUser.main.photoURL}
              size="big"
              circular
              style={{ padding: "10px" }}
            />
            <Dropdown
              trigger={<span>{this.props.currentUser.misc.fullname}</span>}
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.authentication.user
});

export default connect(mapStateToProps)(UserPanel);
