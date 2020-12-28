import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { register } from '../actions/auth';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      successful: false
    };
  }

  onChangeHandler = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value});
  }

  onSubmitHandler = event => {
    event.preventDefault();

    this.setState({
      successful: false
    });

    this.props.dispatch(register(
      this.state.name, 
      this.state.username, 
      this.state.password))
    .then(() => {
      this.setState({ successful: true });
    })
    .catch(() => {
      this.setState({ successful: false });
    });
  }

  render() {
    const { message } = this.props;

    return (
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" 
            placeholder="Nome do usuário" 
            onChange={this.onChangeHandler} 
            value={this.state.name} 
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Usuário</Form.Label>
          <Form.Control type="text" 
            placeholder="Nome do usuário" 
            onChange={this.onChangeHandler} 
            value={this.state.username} 
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" 
            placeholder="Senha" 
            onChange={this.onChangeHandler} 
            value={this.state.password} 
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={this.state.loading}>
          {
            this.state.loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )
          }
          Registrar
        </Button>
        {
          message && ShowAlert(message)
        }
      </Form>
    )
  }
}

const ShowAlert = message => {
  const [ setShow ] = useState(true);
  return (
    <>
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Erro!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </>
  );
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);