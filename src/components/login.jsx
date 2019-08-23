import React, { Component } from 'react';
import TextInput from './TextInput';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleFieldChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  returnIsDisabled = () => {
    const usernameLen = this.state.username.length;
    const passwordLen = this.state.password.length;
    return (usernameLen < 6 || passwordLen == 0);
  };

  render() {
    return (
      <div className="jumbotron login">
        <div id="formContent">
          <h5>Login</h5>
          <form>
            <TextInput
              type="email"
              id="username"
              name="username"
              placeholder="login"
              value={this.state.username}
              labelText="User Name"
              onChange={this.handleFieldChange}
            ></TextInput>
            <TextInput
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={this.state.password}
              labelText="Password"
              onChange={this.handleFieldChange}
            ></TextInput>
            <TextInput
              type="submit"
              onChange={this.handleFieldChange}
              disabled={this.returnIsDisabled()}
            ></TextInput>
          </form>
          <div id="formFooter">
            <a className="underlineHover small" href="/create">Create Account</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
