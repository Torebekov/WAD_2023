import React, { Component } from 'react';

class CounterLifecycleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Counter Value: 0'
    };
  }

  componentDidMount() {
    console.log('CounterLifecycleComponent did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.count !== this.props.count) {
      this.updateMessage();
      console.log('CounterLifecycleComponent updated');
    }
  }

  updateMessage() {
    this.setState({ message: `Counter Value: ${this.props.count}` });
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}

export default CounterLifecycleComponent;
