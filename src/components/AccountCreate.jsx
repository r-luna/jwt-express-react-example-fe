import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormInput from './FormInput';
import axios from 'axios';
import ButtonLink from './ButtonLink.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

require('dotenv').config();

class AccountCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      passwordVerify: '',
      createSuccess: false,
      fNameIsValid: undefined,
      fNameIsInValid: false,
      fNameMaxLength: 65,
      fNameMinLength: 2,
      lNameIsValid: undefined,
      lNameIsInValid: false,
      lNameMaxLength: 65,
      lNameMinLength: 2,
      emailIsValid: undefined,
      emailIsInValid: false,
      emailMaxLength: 65,
      emailMinLength: 6,
      passwordIsValid: undefined,
      passwordIsInValid: false,
      passwordMaxLength: 65,
      passwordMinLength: 7,
      passwordVerifyIsValid: undefined,
      passwordVerifyIsInValid: false,
      passwordsMatch: undefined,
      formIsValid: false,
    };
  }

  handleFieldChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  validateForm = () => {
    // get state
    const { fName, lName, email, password, passwordVerify } = this.state;
    const {
      fNameMaxLength, fNameMinLength,
      lNameMaxLength, lNameMinLength,
      emailMaxLength, emailMinLength,
      passwordMaxLength, passwordMinLength,
    } = this.state;
    // validate
    const stateObj = {
      fNameIsValid: (fName.length >= fNameMinLength && fName.length <= fNameMaxLength),
      fNameIsInValid: (fName.length < fNameMinLength || fName.length > fNameMaxLength),

      lNameIsValid: (lName.length >= lNameMinLength && lName.length <= lNameMaxLength),
      lNameIsInValid: (lName.length < lNameMinLength || lName.length > lNameMaxLength),

      emailIsValid: (email.length >= emailMinLength && email.length <= emailMaxLength),
      emailIsInValid: (email.length < emailMinLength || email.length > emailMaxLength),

      passwordIsValid: (password.length >= passwordMinLength && password.length <= passwordMaxLength),
      passwordIsInValid: (password.length < passwordMinLength || password.length > passwordMaxLength),

      passwordVerifyIsValid: (passwordVerify.length >= passwordMinLength && passwordVerify.length <= passwordMaxLength),
      passwordVerifyIsInValid: (passwordVerify.length < passwordMinLength || passwordVerify.length > passwordMaxLength),

      passwordsMatch: (password === passwordVerify),

      formIsValid: false,
    };
    const { fNameIsValid, lNameIsValid, emailIsValid, passwordIsValid, passwordVerifyIsValid, passwordsMatch, } = stateObj;

    if (fNameIsValid && lNameIsValid && emailIsValid && passwordIsValid && passwordVerifyIsValid && passwordsMatch) {
        stateObj.formIsValid = true;
    }

    this.setState({ ...stateObj });

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
    const { fName, lName, email, password, passwordVerify, createSuccess} = this.state;
    const {
      fNameIsValid, fNameIsInValid,
      lNameIsValid, lNameIsInValid,
      emailIsValid, emailIsInValid,
      passwordIsValid, passwordIsInValid,
      passwordVerifyIsValid, passwordVerifyIsInValid,
      passwordsMatch,
      formIsValid,
    } = this.state;
    const {
      fNameMaxLength, fNameMinLength,
      lNameMaxLength, lNameMinLength,
      emailMaxLength, emailMinLength,
      passwordMaxLength, passwordMinLength,
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
        <Container>
          <Row sm={2}></Row>
          <Row sm={8}>
            <Col>
              <h5>Create Account</h5>
              <form noValidate>
                <FormInput
                  as="input"
                  disabled=""
                  isInvalid={fNameIsInValid}
                  isValid={fNameIsValid}
                  onChange={this.handleFieldChange}
                  size="sm"
                  type="text"
                  value={fName}
                  labelText="First Name"
                  groupControlId="fName"
                  maxLength={fNameMaxLength}
                  minLength={fNameMinLength}
                  required="yes"
                ></FormInput>
                <FormInput
                  as="input"
                  disabled=""
                  isInvalid={lNameIsInValid}
                  isValid={lNameIsValid}
                  onChange={this.handleFieldChange}
                  size="sm"
                  type="text"
                  value={lName}
                  labelText="Last Name"
                  groupControlId="lName"
                  maxLength={lNameMaxLength}
                  minLength={lNameMinLength}
                  required="yes"
                ></FormInput>
                <FormInput
                  as="input"
                  disabled=""
                  isInvalid={emailIsInValid}
                  isValid={emailIsValid}
                  onChange={this.handleFieldChange}
                  size="sm"
                  type="email"
                  value={email}
                  labelText="Email"
                  groupControlId="email"
                  maxLength={emailMaxLength}
                  minLength={emailMinLength}
                  required="yes"
                ></FormInput>
                <FormInput
                  as="input"
                  disabled=""
                  isInvalid={passwordIsInValid || passwordsMatch && !passwordsMatch}
                  isValid={passwordIsValid && passwordsMatch}
                  onChange={this.handleFieldChange}
                  size="sm"
                  type="password"
                  value={password}
                  labelText="Password"
                  groupControlId="password"
                  maxLength={passwordMaxLength}
                  minLength={passwordMinLength}
                  required="yes"
                ></FormInput>
                <FormInput
                  as="input"
                  disabled=""
                  isInvalid={passwordVerifyIsInValid || passwordsMatch && !passwordsMatch}
                  isValid={passwordVerifyIsValid && passwordsMatch}
                  onChange={this.handleFieldChange}
                  size="sm"
                  type="password"
                  value={passwordVerify}
                  labelText="Verify Password"
                  groupControlId="passwordVerify"
                  maxLength={passwordMaxLength}
                  minLength={passwordMinLength}
                  required="yes"
                ></FormInput>
                <FormInput
                  type="button"
                  labelText="Create Account"
                  buttonVariant="primary"
                  onClick={this.handleSubmit }
                  disabled={this.formIsValid}
                ></FormInput>
              </form>
            </Col>
          </Row>
          <Row sm={2}></Row>
        </Container>
      );
    }
  }
}

export default AccountCreate;
