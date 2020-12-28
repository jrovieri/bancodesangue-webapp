import React from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ApiService from '../services/api.service';
import { Spinner } from 'react-bootstrap';

class LoadCandidatos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loading: false
    }
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onClickHandler = () => {
    this.setState({
      loading: true
    });

    ApiService.loadCandidatos(this.state.selectedFile)
      .then(response => {
        alert("Dados carregados com sucesso");
        this.props.history.push('/');  
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(err.message);
      });
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Selecionar arquivo</Form.Label>
          <Form.Control type="file" onChange={this.onChangeHandler} required></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={this.state.loading} onClick={this.onClickHandler}>
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

export default withRouter(LoadCandidatos);