import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user, time, extra }) => (
  <Comment>
    <Comment.Avatar src={user.avatar} />
    <Comment.Content>
      <Comment.Author as="a">{user.fullname}</Comment.Author>
      <Comment.Metadata>{timeFromNow(time)}</Comment.Metadata>

      {extra && extra.hasOwnProperty("image") ? (
        <Image src={extra.image} size="medium" />
      ) : (
        <Comment.Text>{message}</Comment.Text>
      )}
    </Comment.Content>
  </Comment>
);

export default Message;
