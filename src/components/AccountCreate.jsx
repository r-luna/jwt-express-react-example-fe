import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormInput from './FormInput';
import axios from 'axios';
import ButtonLink from './ButtonLink.jsx';

require('dotenv').config();

class AccountCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      passwordVerify: '',
      fNameIsValid: true,
      lNameIsValid: true,
      emailIsValid: true,
      passwordIsValid: true,
      passwordVerifyIsValid: true,
      passwordsMatch: true,
      formIsValid: true,
      createSuccess: null,
    };
  }

  handleFieldChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  validateForm = () => {
    console.log('inside');
    const { fname, lname, email, password, passwordVerify, formIsValid } = this.state;
    const stateObj = {
      fNameIsValid: (fname.length > 0),
      lNameIsValid: (lname.length > 0),
      emailIsValid: (email.length > 5),
      passwordIsValid: (password.length > 7),
      passwordVerifyIsValid: (passwordVerify.length > 7),
      passwordsMatch: (password === passwordVerify),
      formIsValid: true, // default
    };
    console.log(stateObj);
    for (const prop in stateObj) {
      if (!stateObj[prop]){
        stateObj.formIsValid = false;
        break;
      }
    }
    this.setState(stateObj);
  };

  handleSubmit = (e) => {
    this.validateForm();
    if (this.state.formIsValid) {
      return;
    }
    const that = this;
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
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
    const {
      fname,
      lname,
      email,
      password,
      passwordVerify,
      createSuccess,
      valid, 
      fNameIsValid,
      lNameIsValid,
      emailIsValid,
      passwordIsValid,
      passwordVerifyIsValid,
      passwordsMatch,
      formIsValid,
    } = this.state;

    if (createSuccess){
      return (
        <div class="jumbotron login">
          <h5>Account Created</h5>
          <p>You account has been created. Click the button below to login.</p>
          <ButtonLink to="/">Login</ButtonLink>
        </div>
      );
    } else {
      return (
        <div className="jumbotron login">
          <div id="formContent">
            <h5>Create Account</h5>
            <form>
            <FormInput
                type="text"
                id="fname"
                name="fname"
                placeholder=""
                value={fname}
                labelText="First Name"
                validationClasses={ !fNameIsValid ? 'form-control-warning': ''}
                onChange={this.handleFieldChange}
              ></FormInput>
              <FormInput
                type="text"
                id="lname"
                name="lname"
                placeholder=""
                value={lname}
                labelText="Last Name"
                validationClasses={ !lNameIsValid ? 'form-control-warning': ''}
                onChange={this.handleFieldChange}
              ></FormInput>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder=""
                value={email}
                labelText="Email"
                validationClasses={ !emailIsValid ? 'form-control-warning': ''}
                onChange={this.handleFieldChange}
              ></FormInput>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder=""
                value={password}
                labelText="Password"
                validationClasses={ !passwordIsValid ? 'form-control-warning': ''}
                onChange={this.handleFieldChange}
              ></FormInput>
              <FormInput
                type="password"
                id="passwordVerify"
                name="passwordVerify"
                placeholder=""
                value={passwordVerify}
                labelText="Confirm Password"
                validationClasses={ !passwordVerifyIsValid ? 'form-control-warning': ''}
                onChange={this.handleFieldChange}
              ></FormInput>
              <FormInput
                type="button"
                value="Create Account"
                onClick={this.handleSubmit}
                disabled={this.formIsValid}
              ></FormInput>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default AccountCreate;
