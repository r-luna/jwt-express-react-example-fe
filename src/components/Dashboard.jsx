import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

require('dotenv').config();

const pageRole = 'admin';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      role: false,
      redirect: false,
    };
  }

  handleFieldChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  doVerify = () => {
    const that = this;
    axios.post(`${process.env.REACT_APP_PROXY}/api/user/verify`, {}, {
      withCredentials: true,
    })
    .then(function (response) {
      if (response.status === 200){
        // user has valid jwt
        const { role, email, fname, lname } = response.data.claims;
        if (role === pageRole){
          // authorized to view this page, set the props
          that.setState({
            fname,
            lname,
            email,
            role,
          });
        } else {
          // user is not of role admin, redirect to account/
          that.setState({
            redirect: true,
            role,
          });
        }
      } else {
        // jwt absent or not valid
        that.setState({
          redirect: true,
          role: undefined,
        });
      }
    })
    .catch(function (error) {
      that.setState({
        redirect: true,
        role: undefined,
      });
    });
  };

  componentDidMount = async () => {
    await this.doVerify();
  };

  render() {
    const { fname, lname, email, role, redirect } = this.state;
    if (redirect && role === 'employer'){
      return <Redirect to={`/account/${role}/`} />
    } else if (redirect && !role) {
      return <Redirect to='/' />
    }
    return (
      <div>
          <h5>Dashboard</h5>
          <p>{ fname } { lname }, { email }, { role }</p>

      </div>
    );
  }
}

export default Dashboard;
