import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon, Input, Label, Message, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signup } from "../../actions";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  & div {
    width: 400px;
  }
  & button {
    margin-top: 20px !important;
  }
`;
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
      loading: false
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const User = {
      fullname: this.state.fullname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    await this.props.signup(User, this.props.history);
    this.setState({
      loading: false
    });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <Main>
        <Header as="h2" icon>
          <Icon name="braille" />
          Cool It!
          <Header.Subheader>Create New Account</Header.Subheader>
        </Header>

        <div>
          <Label pointing="below" size="medium">
            Full Name
          </Label>
          <Input
            icon="vcard"
            iconPosition="left"
            placeholder="Enter fullname here"
            name="fullname"
            value={this.state.fullname}
            onChange={this.onChange}
          />
        </div>
        <div>
          <Label pointing="right" size="medium">
            Username
          </Label>
          <Input
            icon="user"
            iconPosition="left"
            placeholder="Enter username here"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
        </div>
        <div>
          <Label pointing="right" size="medium">
            Email
          </Label>
          <Input
            icon="mail"
            iconPosition="left"
            placeholder="Enter email here"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div>
          <Label pointing="right" size="medium">
            Password
          </Label>
          <Input
            icon="lock"
            iconPosition="left"
            placeholder="Enter password here"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            type="password"
          />
        </div>
        <div>
          <Label pointing="right" size="medium">
            Confirm Password
          </Label>
          <Input
            icon="repeat"
            iconPosition="left"
            placeholder="Confirm password here"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.onChange}
            type="password"
          />
        </div>
        <Button
          icon
          labelPosition="right"
          color="black"
          onClick={this.onSubmit}
          disabled={this.state.loading}
          className={this.state.loading ? "loading" : ""}
        >
          Signup
          <Icon name="right arrow" />
        </Button>
        <Message>
          Have an account? <Link to="/login">Login</Link>
        </Message>
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(
  mapStateToProps,
  { signup }
)(Signup);
