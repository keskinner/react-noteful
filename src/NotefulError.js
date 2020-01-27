import React from 'react';

export default class NotefulError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {      
          return (
            <h2>Sorry could not add this input.</h2>
          );
        }
        return this.props.children;
    }  
}