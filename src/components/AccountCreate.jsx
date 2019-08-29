import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextInput from './TextInput';
import axios from 'axios';

require('dotenv').config();

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
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
    const { username, email, password } = this.state;
    axios.post(`${process.env.REACT_APP_PROXY}/api/user/create`, {
      fname,
      lname,
      email,
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
              type="text"
              id="fname"
              name="fname"
              placeholder=""
              value={fname}
              labelText="First Name"
              className={ !valid ? 'form-control is-invalid': ''}
              onChange={this.handleFieldChange}
            ></TextInput>
            <TextInput
              type="text"
              id="lname"
              name="lname"
              placeholder=""
              value={lname}
              labelText="Last Name"
              className={ !valid ? 'form-control is-invalid': ''}
              onChange={this.handleFieldChange}
            ></TextInput>
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder=""
              value={email}
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
        </div>
      </div>
    );
  }
}

export default UserCreate;
