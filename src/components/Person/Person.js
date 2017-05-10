import React, {Component} from 'react';
import './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="person">{this.props.name}</div>
    );
  }
}

export default Person;
