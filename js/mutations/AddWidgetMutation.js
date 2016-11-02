import Relay from 'react-relay';

export default class AddWidgetMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };

  getMutation() {

    console.log('getMutation', this.props);
    return Relay.QL`mutation{addWidget}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddWidgetPayload @relay(pattern: true) {
        widgetEdge,
        viewer {
          widgets,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'widgets',
      edgeName: 'widgetEdge',
      rangeBehaviors: () => {
        return 'append';
      },
    }];
  }

  getVariables() {
    return {
      name: this.props.name
    };
  }
  
  getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      widgetEdge: {
        node: {
          name: this.props.name
        },
      },
      viewer: {
        id: this.props.viewer.id,
      },
    };
  }
}