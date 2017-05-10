import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPerson: "",
      people:[],
      rotationsCount: 0
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddPerson = this.handleAddPerson.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
  }

  handleUserChange(event){
    this.setState({ newPerson: event.target.value });
  }

  handleAddPerson(event) {
    if (this.state.newPerson === '') {
      return false;
    }

    let people = this.state.people;
    let newPerson = {
      key: people.length,
      name: this.state.newPerson
    };

    if (people.length % 2 == 0) {
      this.setState({
        people: [].concat(
          people.slice(0, (people.length + 1) / 2),
          newPerson,
          people.slice((people.length + 1) / 2, people.length)
        ),
        newPerson: '',
      });
    }
    else {
      this.setState({
        people: people.concat([newPerson]),
        newPerson: '',
      });

    }

    return true;
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleAddPerson(event);
    }
  }

  handleReset() {
    this.setState({ people: [] });
  }

  handleRotate() {
    // There needs to be 3 or more people.
    if (this.state.people.length < 4) {
      return false;
    }

    let people = this.state.people.slice(0);

    let head = people.shift();
    let second = people.shift();
    let third = people.shift();
    let tail = people.pop();
    people.unshift(third);
    people.unshift(head);

    this.setState({
      people: [].concat(
        people.slice(0, (people.length + 1) / 2),
        tail,
        second,
        people.slice((people.length + 1) / 2, people.length)
      )
    });

    this.rotations++;

    return true;
  }

  render() {
    return (
      <div className="page__wrapper">

        <div className="page__header">
          <h1 className="page__app-name">
            <span className="page__app-icon"><i className="fa fa-repeat" aria-hidden="true"></i></span>
            Rotations</h1>
        </div>

        <div className="page__controls">
          <FormGroup className="flex-center-block">
            <div className="page__add-person-field">
              <ControlLabel>New Participant:</ControlLabel>
              <FormControl type="text" id="new-user" placeholder="Enter name" value={this.state.newPerson} onChange={this.handleUserChange} onKeyPress={this.handleKeyPress} />
            </div>
          </FormGroup>
          <FormGroup className="flex-center-block">
            <ButtonToolbar>
              <Button id="action__add-person" bsStyle="primary" onClick={this.handleAddPerson}>Add Participant</Button>
              <Button id="action__reset" bsStyle="warning" onClick={this.handleReset}>Reset</Button>
              <Button id="action__rotate" bsStyle="success" onClick={this.handleRotate}>Rotate</Button>
            </ButtonToolbar>
          </FormGroup>
        </div>

          <span id="info-rotations"></span>
        <Layout people={this.state.people}/>
      </div>
    );
  }
}

export default App;
