import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import styled from "styled-components";

import firebase from '../../config/firebase';

const Main = styled.div`
  & .messages {
    height: 340px;
    overflow-y: scroll;
  }
`;
class Messages extends React.Component {

    state = {
      messages: [],
      messagesLoading: true,
      group: this.props.group,
      user: this.props.user,
      messagesRef: firebase.database().ref("messages")
    };

    componentDidMount() {
      if (this.state.group) {
        this.getMessages(this.state.group.id);
      }

    }
    getMessages = id => {
      let loadedMessages = [];
      this.state.messagesRef.child(id).on("child_added", snap => {
        loadedMessages.push(snap.val());
        this.setState({
          messages: loadedMessages,
          messagesLoading: false
        });
      });
    };
  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message user={message.author} message={message.body} />
    ));
  render() {
    return (
      <Main>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(this.state.messages)}
          </Comment.Group>
        </Segment>

        <MessageForm key={this.state.user && this.state.user.main.uid} database={this.state.messagesRef} group={this.state.group} user={this.state.user} />
      </Main>
    );
  }
}

export default Messages;