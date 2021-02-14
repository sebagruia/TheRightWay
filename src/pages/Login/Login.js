import React, { useState } from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = ({ onRouteChange, changeLogStateToTrue, loadUser}) => {


    const [validated, setValidated] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const onEmailChange = (event) => {
        setLoginEmail(event.target.value);
    }
    const onPassChange = (event) => {
        setLoginPass(event.target.value);
    }

    const onLogInClick = (event) => {
        fetch('https://limitless-atoll-58976.herokuapp.com/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPass
            })
        })
            .then(response=>response.json())
            .then(user=>{
                if(user.id){
                    //Because the response of the "user.container" was a String and not a Json I had to Parse the "user.container"
                   let parsedContainer =  user.container.map((element)=>{
                        let parsedElement = JSON.parse(element);
                        return parsedElement;
                    });
                    user.container = parsedContainer;
                    //=====================================================================
                    onRouteChange('home');
                    changeLogStateToTrue();
                    loadUser(user);
                }
                else{
                    window.alert('Wrong Credentials');
                }
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <Form className="login-form justify-content-center" noValidate validated={validated} onSubmit={handleSubmit} >

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required onChange={onEmailChange} />
                            <Form.Control.Feedback type="invalid">Please type an email address</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required onChange={onPassChange} />
                            <Form.Control.Feedback type="invalid">Please type your password</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>

                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={onLogInClick} >
                            Log In
                        </Button>
                    </Form>
                </div>
            </div>

        </div>

    );
}


export default Login;