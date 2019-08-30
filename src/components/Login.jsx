import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FormInput from './FormInput';
import axios from 'axios';

require('dotenv').config();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      valid: true,
      redirect: false,
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
    const { username, password, valid, redirect } = this.state;
    if (redirect){
      return <Redirect to='/dashboard' />
    }
    return (
      <div className="jumbotron login">
        <div id="formContent">
          <h5>Login</h5>
          <form>
            <FormInput
              as="input"
              disabled=""
              isInvalid=""
              isValid=""
              onChange={this.handleFieldChange}
              size="lg"
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
              size="lg"
              type="password"
              value={password}
              labelText="Password"
              labelColumn="false"
              groupControlId="password"
            ></FormInput>
            <FormInput
              type="button"
              labelText="Submit"
              onClick={this.handleSubmit}
              disabled={this.returnIsDisabled()}
            ></FormInput>
          </form>
          <div id="formFooter">
            <Link className="underlineHover small" to="/account/create/">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
