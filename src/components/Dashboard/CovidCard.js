import React from "react";
import {Toast} from 'react-bootstrap';
import '../../App.css';

export default class CovidCard extends React.Component {
  constructor(props) {
    super(props);
    //set the value of card title and card value received from parent component of Dashbaord 
    this.state = { cardTitle: props.cardTitle, cardValue: props.cardValue };
  }
  /**
   * This method will be called when ever title or value parameter changes
   * from parent dashboard component 
   */
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cardTitle !== prevProps.cardTitle || this.props.cardValue !== prevProps.cardValue) {
      this.setState({
        cardTitle: this.props.cardTitle,
        cardValue: this.props.cardValue
      });
    }
  }
  render() {
    return (
        <Toast>
            <Toast.Header closeButton={false}	>
                <strong className="mr-auto">{this.state.cardTitle}</strong>
            </Toast.Header>
            <Toast.Body>{this.state.cardValue}</Toast.Body>
        </Toast>
    );
  }
}