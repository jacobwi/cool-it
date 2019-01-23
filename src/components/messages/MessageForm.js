import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";

import firebase from '../../config/firebase';

const Main = styled.div`
  & .form {
    position: fixed !important;
    bottom: 1em;
    margin-left: 320px !important;
    left: 0;
    right: 1em;
  }
`;
class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      currentGroup: this.props.group,
      user: this.props.user,
      loading: false
    };
  }
  onSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    if (this.state.message) {
      const { user } = this.state
      let messageData = {
        body: this.state.message,
        author: {
          username: user.main.displayName,
          fullname: user.misc.fullname,
          avatar: user.main.photoURL
        },
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      };

      const { database } = this.props;
      const { currentGroup } = this.state
      database
        .child(currentGroup.id)
        .push(messageData)
        .then(() => {
          this.setState({ loading: false, message: "" });
        })
        .catch(err => {
          console.error(err);

        });
    }

  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <Main>
        <Segment className="form">
          <Input
            fluid
            name="message"
            style={{ marginBottom: "0.7em" }}
            label={<Button icon={"add"} />}
            labelPosition="left"
            placeholder="Write your message"
            onChange={this.onChange}
            value={this.state.message}
          />
          <Button.Group icon widths="2">
            <Button
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              onClick={this.onSubmit}
              className={this.state.loading ? "loading" : ""}
            />
            <Button
              color="teal"
              content="Upload Media"
              labelPosition="right"
              icon="cloud upload"
            />
          </Button.Group>
        </Segment>
      </Main>
    );
  }
}
export default MessageForm;