import React from "react";
import { Segment, Button, Input, Icon } from "semantic-ui-react";
import styled from "styled-components";
import uuid4 from "uuid4";
import firebase from "../../config/firebase";

const Main = styled.div`
  & .file {
    position: absolute !important;
    width: 2.2px !important;
    height: 2.2px !important;

    overflow: hidden;

    margin-right: 0 !important;
    margin-top: 0 !important;
    margin-left: 0 !important;
    padding: 0 !important;
  }
  & .selectBtn {
    margin: 0 !important;
    position: relative !important;
  }
`;
class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isMessage: false,
      currentGroup: this.props.group,
      user: this.props.user,
      loading: false,
      file: "",
      isFile: false,
      storageRef: firebase.storage().ref(),
      uploadTask: null,
      uploadState: "",
      percentUploaded: 0
    };
  }
  onSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    if (!this.state.isFile) {
      const { user } = this.state;
      let messageData = {
        body: this.state.message,
        author: {
          username: user.main.displayName,
          fullname: user.misc.fullname,
          avatar: user.main.photoURL
        },
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      const { database } = this.props;
      const { currentGroup } = this.state;
      database
        .child(currentGroup.id)
        .push(messageData)
        .then(() => {
          this.setState({ loading: false, message: "" });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.uploadImage();
    }
  };

  uploadImage = () => {
    const filePath = `group/public/${uuid4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(this.state.file)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          err => {
            console.error(err);
            this.setState({
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl);
              })
              .catch(err => {
                console.error(err);
                this.setState({
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = url => {
    const { user } = this.state;
    let messageData = {
      image: url,
      author: {
        username: user.main.displayName,
        fullname: user.misc.fullname,
        avatar: user.main.photoURL
      },
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    const { database } = this.props;
    const { currentGroup } = this.state;
    database
      .child(currentGroup.id)
      .push(messageData)
      .then(() => {
        this.setState({ loading: false, message: "" });
      })
      .catch(err => {
        console.error(err);
      });
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "message") {
      this.setState({
        isMessage: true
      });
    }

    if (event.target.value <= 0) {
      this.setState({
        isMessage: false
      });
    }
  };

  selectFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file, isFile: true, isMessage: true });
    }
  };

  removeFile = () => {
    this.setState({
      file: "",
      isFile: false,
      isMessage: false
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
            label={
              !this.state.file ? (
                <div>
                  <label htmlFor="hidden-new-file" className="ui icon button">
                    <Icon name="plus" />
                  </label>
                  <input
                    type="file"
                    id="hidden-new-file"
                    style={{ display: "none" }}
                    onChange={this.selectFile}
                  />
                </div>
              ) : (
                <div>
                  <label className="ui icon button">
                    <Icon
                      name="window close outline"
                      color="red"
                      onClick={this.removeFile}
                    />
                  </label>
                </div>
              )
            }
            labelPosition="left"
            placeholder={
              this.state.isFile ? "Image Uploaded" : "Write your message"
            }
            onChange={this.onChange}
            value={this.state.message}
            disabled={this.state.isFile ? true : false}
          />
          <Button.Group icon widths="2">
            <Button
              color="teal"
              content="Send"
              labelPosition="left"
              icon="edit"
              onClick={this.onSubmit}
              className={this.state.loading ? "loading" : ""}
              disabled={this.state.isMessage ? false : true}
            />
          </Button.Group>
        </Segment>
      </Main>
    );
  }
}
export default MessageForm;
