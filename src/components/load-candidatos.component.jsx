import React from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ApiService from '../services/api.service';

class LoadCandidatos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onClickHandler = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    
    ApiService.loadCandidatos(this.state.selectedFile)
      .then(() => {
        alert("Dados carregados com sucesso");
        this.props.history.push('/');  
      })
      .catch(err => alert(err.message));
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Selecionar arquivo</Form.Label>
          <Form.Control type="file" onChange={this.onChangeHandler}></Form.Control>
        </Form.Group>
        <Button onClick={this.onClickHandler}>Enviar</Button>
      </Form>
    )
  }
}

export default withRouter(LoadCandidatos);