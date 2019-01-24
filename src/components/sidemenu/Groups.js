import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { setCurrentGroup } from "../../actions";
import firebase from "../../config/firebase";

class Groups extends React.Component {
  state = {
    groups: [],
    groupName: "",
    groupDetails: "",
    modal: false,
    groupsRef: firebase.database().ref("groups")
  };

  componentDidMount() {
    this.getGroups();
  }
  componentWillUnmount() {
    this.state.groupsRef.off();
  }
  getGroups = () => {
    let groups = [];
    this.state.groupsRef.on("child_added", snap => {
      groups.push(snap.val());

      this.setState(
        {
          groups
        },
        () => this.setGroup(this.state.groups[0])
      );
    });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { groupsRef } = this.state;

    const key = groupsRef.push().key;

    let groupData = {
      name: this.state.groupName,
      details: this.state.groupDetails,
      createdBy: {
        name: this.props.currentUser.misc.fullname,
        username: this.props.currentUser.main.displayName,
        avatar: this.props.currentUser.main.photoURL,
        id: this.props.currentUser.main.uid
      },
      id: key
    };

    groupsRef
      .child(key)
      .update(groupData)
      .then(() => {
        this.setState({
          modal: false,
          groupName: "",
          groupDetails: ""
        });
      });
  };
  openModal = () => this.setState({ modal: true });

  displayGroups = groups =>
    groups.length > 0 &&
    groups.map(group => (
      <Menu.Item
        key={group.id}
        onClick={() => this.setGroup(group)}
        name={group.name}
        style={{ opacity: 0.7 }}
        active={group.id === this.props.currentGroup.id}
      >
        # {group.name}
      </Menu.Item>
    ));

  setGroup = group => this.props.setCurrentGroup(group);
  render() {
    const { groups, modal } = this.state;

    return (
      <div>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> GROUPS
            </span>{" "}
            ({groups.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.props.currentGroup && this.displayGroups(groups)}
        </Menu.Menu>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Group Name"
                  name="groupName"
                  onChange={this.onChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About Group"
                  name="groupDetails"
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.onSubmit}>
              <Icon name="checkmark" /> Create
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  currentGroup: state.groups.currentGroup
});

export default connect(
  mapStateToProps,
  { setCurrentGroup }
)(Groups);
