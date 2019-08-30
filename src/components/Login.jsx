import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FormInput from './FormInput';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

require('dotenv').config();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      valid: true,
      redirect: false,
      labelStyles: {
        textAlign: 'right'
      }
    };
  }

  handleFieldChange = (e) => {
    console.log(e.target.id);
    this.setState({[e.target.id]: e.target.value});
  }

  returnIsDisabled = () => {
    const usernameLen = this.state.username.length;
    const passwordLen = this.state.password.length;
    return (usernameLen < 6 || passwordLen === 0);
  };

  handleSubmit = (e) => {
    const that = this;
    e.preventDefault();
    const { username, password } = this.state;
    axios.post(`${process.env.REACT_APP_PROXY}/api/user/login`, {
      email: username,
      password,
    },{
      withCredentials: true,
    })
    .then(function (response) {
      that.setState({ valid:true });
      if (response.status === 200){
        that.setState({ redirect: true });
      } else {
        that.setState({ valid:false });
      }
    })
    .catch(function (error) {
      that.setState({ valid:false });
    });
  };

  render() {
    const { username, password, valid, redirect, inputStyles } = this.state;
    if (redirect){
      return <Redirect to='/dashboard' />
    }
    return (
      <div className="jumbotron login">
        <div id="formContent">
          <Container>
            <Row>
              <Col>
                <h5 className="text-left">Login</h5>
              </Col>
            </Row>
          </Container>
          <form noValidate id="login-form">
            <FormInput
              as="input"
              disabled=""
              isInvalid=""
              isValid=""
              onChange={this.handleFieldChange}
              size="sm"
              type="email"
              value={username}
              labelText="Email"
              labelColumn="false"
              groupControlId="username"
            ></FormInput>
            <FormInput
              as="input"
              disabled=""
              isInvalid=""
              isValid=""
              onChange={this.handleFieldChange}
              size="sm"
              type="password"
              value={password}
              labelText="Password"
              labelColumn="false"
              groupControlId="password"
            ></FormInput>
            <Container>
              <Row>
                <Col sm={4}>
                  <FormInput
                    type="button"
                    labelText="Submit"
                    buttonVariant="primary"
                    onClick={this.handleSubmit}
                    disabled={this.returnIsDisabled()}
                  ></FormInput>
                </Col>
                <Col sm={8} className="my-auto">
                  <Link to="/account/create/" className="small">Create Account</Link>
                </Col>
              </Row>
            </Container>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
