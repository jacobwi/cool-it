import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
class MessagesHeader extends React.Component {
  componentDidMount() {
    console.log();
  }
  render() {
    return (
      <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {this.props.currentGroup && this.props.currentGroup.name}
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>
           
            1 Members
          </Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.user,
  currentGroup: state.groups.currentGroup
});

export default connect(mapStateToProps)(MessagesHeader);