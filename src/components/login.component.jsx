import React from 'react';
import { Spinner } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from "../actions/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  onChangeHandler = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value});
  }

  onSubmitHandler = event => {
    event.preventDefault();

    this.setState({
      loading: true
    });

    const { dispatch, history } = this.props;
    dispatch(login(this.state.username, this.state.password))
      .then(() => {
        history.push('/');
        window.location.reload();
      })
      .catch(() => {
        this.setState({ loading: false });
        alert('Acesso negado');
      });
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    
    return (
      <Form className='login-form' onSubmit={this.onSubmitHandler} >
        <Form.Group controlId="formUsername">
          <Form.Control type="text" 
            name="username"
            placeholder="Nome do usuário" 
            onChange={this.onChangeHandler} 
            defaultValue={this.state.username} 
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control type="password"
            name="password" 
            placeholder="Senha" 
            onChange={this.onChangeHandler} 
            defaultValue={this.state.password} 
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={this.state.loading}>
          {
            this.state.loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )
          }
          Enviar
        </Button>
        
      </Form>
    )
  } 
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);