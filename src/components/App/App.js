import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import './App.css';

/**
 * Rotations App
 *
 * @TODO:
 * - Handle adding people with same name.
 * - Add undo capabilities.
 * - Remove people.
 * - Handle latecomers properly (number of rounds may no longer be n - 1).
 */

let offset = null, interval = null

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddPerson = this.handleAddPerson.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleResetAttempt = this.handleResetAttempt.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleHideResetModal = this.handleHideResetModal.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  getInitialState() {
    return {
      newPerson: "",
      people:[],
      roundNumber: 0,
      statusMessage: "Add 4 or more participants. When you're ready, press start.",
      validationMessage: "",
      showResetModal: false,
      clock: 0,
      time: '',
      paused: false,
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
        validationMessage: "There isn't enough people to start the game."
      })
      return false;
    }

    // Increment roundNumber 1
    this.setState({
      roundNumber: this.state.roundNumber + 1,
      statusMessage: "Round 1 of " + (this.state.people.length - 1),
    });

    this.play();

  }

  handleResetAttempt() {
    this.setState({ showResetModal: true });
  }

  handleReset() {
    this.setState(this.getInitialState());
  }

  handleHideResetModal() {
    this.setState({ showResetModal: false });
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
      statusMessage: "Round " + (this.state.roundNumber + 1) + " of " + (this.state.people.length - 1),
    });

    this.reset();
    this.play();

    return true;
  }

  handlePause() {
    this.pause();
  }

  handleResume() {
    this.play();
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

  // Timer functions

  play() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(this.update.bind(this), 1000);
      this.setState({paused: false});
    }
  }

  pause() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    this.setState({paused: true});
  }

  reset() {
    let clockReset = 0;
    this.setState({clock: clockReset });
    let time = this.secondsToHms(clockReset / 1000);
    this.setState({time: time });
  }

  update() {
    let clock = this.state.clock;
    clock += this.calculateOffset();
    this.setState({clock: clock });
    let time = this.secondsToHms(clock / 1000);
    this.setState({time: time });
  }

  calculateOffset() {
    let now = Date.now();
    let newOffset = now - offset;
    offset = now;
    return newOffset
  }

  secondsToHms(totalSeconds) {
    let hours   = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds);

    let result = (hours < 10 ? "0" + hours : hours);
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
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
              { this.state.people.length > 0 ? <Button className="action__reset" bsStyle="danger" onClick={this.handleResetAttempt}>Reset</Button> : false }
              { this.state.people.length> 3 && this.state.roundNumber === 0 ? <Button className="action__start" bsStyle="info" onClick={this.handleStart}>Start</Button> : false }
              { this.state.roundNumber > 0 ? <Button className="action__rotate" bsStyle="success" onClick={this.handleRotate}>Rotate</Button> : false }
            </ButtonToolbar>
          </FormGroup>
        </div>

        <div id="page__app-state app-state">
          <div className="app-state__msg flex-center-block">
            <div className="text-center">
              <div className={this.state.roundNumber === 0 ? "blink" : ""}>
                <h4>{this.state.statusMessage}</h4>
              </div>
              <div className={this.state.roundNumber === 0 ? "hide" : "timer"}>
                <div className="flex-center-block">
                  <h2 className="timer__time">{this.state.time === '' ? "00:00:00" : this.state.time}</h2>
                  <ButtonToolbar>
                    { this.state.paused ? <Button className="action__resume" bsStyle="info" onClick={this.handleResume}><i className="fa fa-play" aria-hidden="true"></i></Button> : false }
                    { !this.state.paused ? <Button className="action__pause" bsStyle="" onClick={this.handlePause}><i className="fa fa-pause" aria-hidden="true"></i></Button> : false }
                  </ButtonToolbar>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Layout people={this.state.people}/>

        <Modal
          {...this.props}
          show={this.state.showResetModal}
          onHide={this.handleHideResetModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Reset Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to reset the game?</h4>
            <p>Pressing <strong>Reset</strong> will delete every participant.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHideResetModal} >Cancel</Button>
            <Button onClick={this.handleReset} bsStyle="danger" >Reset</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
