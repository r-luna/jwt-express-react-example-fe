import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextInput from './TextInput';
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
    this.setState({[e.target.name]: e.target.value});
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
            <TextInput
              type="email"
              id="username"
              name="username"
              placeholder=""
              value={username}
              labelText="Email"
              className={ !valid ? 'form-control is-invalid': ''}
              onChange={this.handleFieldChange}
            ></TextInput>
            <TextInput
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={password}
              labelText="Password"
              className={ !valid ? 'form-control is-invalid': ''}
              onChange={this.handleFieldChange}
            ></TextInput>
            <TextInput
              type="button"
              value="Submit"
              onClick={this.handleSubmit}
              disabled={this.returnIsDisabled()}
            ></TextInput>
          </form>
          <div id="formFooter">
            <a className="underlineHover small" href="/account/create/">Create Account</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
