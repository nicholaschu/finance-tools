import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertError.css';

class AlertError extends React.Component {
  state: { show: boolean };

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = { show: true };
  }

  hideError(): void {
    this.setState({ show: false });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert variant="danger" onClick={() => this.hideError()} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          {this.props.children}
        </Alert>
      );
    } else {
      return null;
    }
  }
}

export default AlertError;
