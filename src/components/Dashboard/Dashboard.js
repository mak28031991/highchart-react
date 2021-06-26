import React from "react";
import {Container,Row, Col, Button, Jumbotron , Form} from 'react-bootstrap';
import '../../App.css';
import CovidCard from "./CovidCard";
import CovidGraph from "./CovidGraph";

export default class Dashboard extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      cards:[{
        cardTitle:"Month to Date Active Cases",
        cardValue:"122"
      },
      {
        cardTitle:"Last Month Active Cases",
        cardValue:"300"
      },
      {
        cardTitle:"Estimated Month End Active Cases",
        cardValue:"500"
      }],
      location:"",
      age:"",
      gender:"",
      status:"",
      fromDate:"",
      toDate:""
    }
  }
  render() {
    return (
        <Container>
            <Jumbotron>
                <h1 className="header">Dashboard</h1>
                <Row>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row>
                  {this.state.cards.map((card, index) => {
                    return (
                    <Col key={index}>
                      <CovidCard cardTitle={card.cardTitle} cardValue={card.cardValue}/>
                    </Col>
                    )
                  })}
                </Row>
                <hr/>
                <Row>
                  <Col>
                  <CovidGraph location gender age status fromDate toDate/>
                  </Col>
                </Row>
            </Jumbotron>    
      </Container>
    );
  }
}