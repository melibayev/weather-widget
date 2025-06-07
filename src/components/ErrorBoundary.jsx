import React from 'react';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <p>Error: {this.state.error.toString()}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
