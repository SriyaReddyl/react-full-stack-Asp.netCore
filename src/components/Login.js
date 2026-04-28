import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Button, Header } from 'semantic-ui-react';
import { serverUrl } from '../environment/environment';
import Toast from './Toast';

class Login extends Component {

  state = { username: '', password: '', toastMsg: '' };

  showToast = (msg) => {
    this.setState({ toastMsg: msg });
    setTimeout(() => this.setState({ toastMsg: '' }), 2000);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(serverUrl + 'auth/login', {
        userName: this.state.username,
        password: this.state.password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
	  localStorage.setItem('userId', res.data.userId);

      window.location.href = "/products";

    } catch (err) {
      this.showToast("❌ Invalid credentials");
    }
  };

  render() {
    return (
      <Container text style={{ marginTop: '50px' }}>

        <Toast message={this.state.toastMsg} />

        <Header as="h2" textAlign="center">
          🔐 Login
        </Header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input label="Username" name="username" onChange={this.handleChange} />
          <Form.Input type="password" label="Password" name="password" onChange={this.handleChange} />

          <Button primary fluid type="submit">
            Login
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;