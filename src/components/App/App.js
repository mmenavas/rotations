import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import './App.css';

/**
 * Rotations App
 *
 * @TODO:
 * - Handle adding people with same name.
 * - Add timer.
 * - Add undo capabilities.
 * - Trigger modal window when pressing reset.
 * - Remove people.
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddPerson = this.handleAddPerson.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
  }

  getInitialState() {
    return {
      newPerson: "",
      people:[],
      roundNumber: 0,
      statusMessage: "Add 4 or more participants. When you're ready, press start.",
      validationMessage: "",
    };
  }

  handleUserChange(event){
    this.setState({ newPerson: event.target.value });
  }

  handleAddPerson(event) {
    if (this.state.newPerson === '') {
      this.setState({ validationMessage: "Enter a valid name." })
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
        validationMessage: '',
      });
    }
    else {
      this.setState({
        people: people.concat([newPerson]),
        newPerson: '',
        validationMessage: '',
      });

    }

    return true;
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleAddPerson(event);
    }
  }

  handleStart() {
    // Check if there's enough people to start the game
    if (!this.canContinue()) {
      this.setState({
        validationMessage: "There's enough people to start the game."
      })
      return false;
    }

    // Increment roundNumber 1
    this.setState({
      roundNumber: this.state.roundNumber + 1,
      statusMessage: "Round 1 of " + (this.state.people.length - 1),
    });
  }

  handleReset() {
    this.setState(this.getInitialState());
  }

  handleRotate() {
    // Check if there's enough people to perform rotations
    if (!this.canContinue()) {
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
      ),
      roundNumber: this.state.roundNumber + 1,
      statusMessage: "Round " + (this.state.roundNumber + 1) + " of " + (this.state.people.length - 1)
    });


    return true;
  }

  canContinue() {

    let enoughPeople = true;

    // There needs to be 4 or more people.
    if (this.state.people.length < 4) {
      enoughPeople = false;
    }
    // There can only be n - 1 rounds.
    if (this.state.roundNumber >= (this.state.people.length - 1)) {
      enoughPeople = false;
    }

    return enoughPeople;
  }

  render() {
    let validationStatus = null;
    if (this.state.validationMessage !== "") {
      validationStatus = "error";
    }

    return (
      <div className="page__wrapper">

        <div className="page__header">
          <h1 className="page__app-name">
            <span className="page__app-icon"><i className="fa fa-repeat" aria-hidden="true"></i></span>
            Rotations</h1>
        </div>

        <div className="page__controls">
          <FormGroup className="flex-center-block" validationState={validationStatus}>
            <div className="page__add-person-field">
              <ControlLabel>New Participant:</ControlLabel>
              <FormControl type="text" id="new-user" placeholder="Enter name" value={this.state.newPerson} onChange={this.handleUserChange} onKeyPress={this.handleKeyPress} />
              <HelpBlock>{this.state.validationMessage}</HelpBlock>
            </div>
          </FormGroup>
          <FormGroup className="flex-center-block">
            <ButtonToolbar>
              <Button className="action__add-person" bsStyle="primary" onClick={this.handleAddPerson}>Add Participant</Button>
              <Button className="action__reset" bsStyle="danger" onClick={this.handleReset}>Reset</Button>
              { this.state.roundNumber === 0 ? <Button className="action__start" bsStyle="info" onClick={this.handleStart}>Start</Button> : false }
              { this.state.roundNumber > 0 ? <Button className="action__rotate" bsStyle="success" onClick={this.handleRotate}>Rotate</Button> : false }
            </ButtonToolbar>
          </FormGroup>
        </div>

        <div id="page__app-state app-state">
          <div className="app-state__msg flex-center-block">
            <span className="blink">{this.state.statusMessage}</span>
          </div>
        </div>

        <Layout people={this.state.people}/>
      </div>
    );
  }
}

export default App;
