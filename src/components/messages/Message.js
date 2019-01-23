import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={user.avatar} />
    <Comment.Content>
      <Comment.Author as="a">{user.fullname}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      <Comment.Text>{message}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;