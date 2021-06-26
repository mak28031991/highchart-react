import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {Container,Alert, Col, Button, Jumbotron , Form} from 'react-bootstrap';
import '../../App.css';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/login/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async e => {
        e.preventDefault();
        const loginResponse = await loginUser({
          email,
          password
        });
        if(loginResponse.token){
            //if token is received from login the only set token
            setToken(loginResponse.token);
        }else{
            //show the error mesage in alert
            setErrorMessage(loginResponse.statusMessage)
        }
    }

    return (
        <Container>
            <Jumbotron>
                <h1 className="header">Login</h1>
                { errorMessage != ""? <Alert variant="danger">
                    {errorMessage}
                    </Alert> : null 
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} lg={4} sm={12}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} lg={4} sm={12}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <hr/>
                <h3 className="header">Login via Google</h3>
                <Button variant="primary" type="submit">
                        Login via Google
                </Button>   
            </Jumbotron>    
      </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}