import React from "react";
import {Container,Row, Col, Button, Jumbotron , Form} from 'react-bootstrap';
import '../../App.css';
import axios from "axios";
import CovidCard from "./CovidCard";
import CovidGraph from "./CovidGraph";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      month:"",
      selectedMonth:"",
      states:[
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "State Unassigned",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
      ]
    }
  }
  componentDidMount(){
    this.updateMonthlyCards();
  }

  handleStateChange = (event) => {
    console.log(event.target.value)
    this.setState({ location: event.target.value });
  };
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };
  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };
  handleMonthChange = (date) => {
    let d = new Date(date);
    var month = (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})
    var year = d.getFullYear()
    console.log("birthday=="+month);
    this.setState({ month: month+"/"+year, selectedMonth:date });
  };
  
  updateMonthlyCards() {
    axios.get("http://localhost:3001/dashboard/monthly_cards/v1")
      .then((response) => {
        // console.log(response.data);
        const cardData = response.data.data;
        console.log(cardData);
        this.setState({
          cards: cardData
        });
      });
  }

  render() {
    const {location, gender, age, month, selectedMonth, cards, states} = this.state;
    return (
        <Container>
            <Jumbotron>
                <h1 className="header">Dashboard</h1>
                <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Select Month</Form.Label>
                    <br/>
                    <DatePicker selected={selectedMonth} onChange={this.handleMonthChange } dateFormat="MM/yyyy"
      showMonthYearPicker />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" custom onChange={this.handleStateChange} >
                    <option value="">Select State</option>
                    {states.map((state, index) => {
                    return (
                      <option value={state}>{state}</option>
                    )
                    })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" custom onChange={this.handleGenderChange} >
                    <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Age Bracket</Form.Label>
                    <Form.Control as="select" custom onChange={this.handleAgeChange} >
                      <option value="">Select Age Bracket</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="20">25</option>
                      <option value="20">30</option>
                      <option value="20">35</option>
                      <option value="20">40</option>
                      <option value="20">45</option>
                      <option value="20">50</option>
                      <option value="20">55</option>
                      <option value="20">60</option>
                      <option value="20">65</option>
                      <option value="20">70</option>
                      <option value="20">75</option>
                      <option value="20">80</option>
                      <option value="20">85</option>
                      <option value="20">90</option>
                      <option value="20">95</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                
                
                </Row>
                <Row>
                  {cards.map((card, index) => {
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
                  <CovidGraph location={location} gender={gender} age={age} month={month}/>
                  </Col>
                </Row>
            </Jumbotron>    
      </Container>
    );
  }
}