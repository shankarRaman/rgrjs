import Relay from 'react-relay';

class CreateLinkMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL `
      mutation {createLink}
    `;
  }

  getVariables() {
    return {
      title: this.props.title,
      url: this.props.url
    }
  }

  getFatQuery() {
    return Relay.QL `
      fragment on CreateLinkPayload {
        
      }
    `
  }
}
