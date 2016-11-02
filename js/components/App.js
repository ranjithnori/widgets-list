import React from 'react';
import Relay from 'react-relay';

import AddWidgetMutation from '../mutations/AddWidgetMutation';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      newWidget: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const widget = {
      name: this.state.newWidget,
      viewer: this.props.viewer
    }
    Relay.Store.commitUpdate(new AddWidgetMutation(widget));
  }

  handleChange = (e) => {
    this.setState({newWidget: e.target.value});
  }

  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder='Add widget' name='newWidget' onChange={this.handleChange}/>
          <input type="submit" value='Add'/>
        </form>
        <ul>
          {this.props.viewer.widgets.edges.reverse().map(edge =>
            <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: 100000) {
          edges {
            node {
              id,
              name,
            },
          },
        },
        ${AddWidgetMutation.getFragment('viewer')}
      },
    `,
  },
});
