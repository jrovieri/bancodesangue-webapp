import React from 'react';
import { Table } from 'react-bootstrap';
import ApiService from '../services/api.service';

class ListCandidatos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      content: null
    }
  }

  componentDidMount() {
    ApiService.listCandidatos(this.state)
      .then(
        response => {
          console.log(response.data);
          this.setState({ content: response.data });
        })
      .catch(error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </Table>
    )
  }
}

export default ListCandidatos;