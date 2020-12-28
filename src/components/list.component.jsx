import React from 'react';
import { Table } from 'react-bootstrap';
import ApiService from '../../services/api.service';

class ListCandidatos extends React.Component {
  constructor(props) {
    super(props);
    const { page, size } = this.props;

    this.state = {
      page,
      size,
      content: null
    }
  }

  componentDidMount() {
    ApiService.listCandidatos(this.state).then(
      response => {
        this.setState({ content: response.data });
      },
      error => {
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
          <th>#</th>
          <th>Nome</th>
          <th>Estado</th>
          <th>Cidade</th>
        </thead>
        <tbody>
          {
            this.state.content.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.estado}</td>
                <td>{item.cidade}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    )
  }
}

export default ListCandidatos;