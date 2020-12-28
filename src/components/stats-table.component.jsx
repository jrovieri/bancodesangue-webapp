import React from 'react';

import Table from 'react-bootstrap/Table';

import ApiService from '../services/api.service';

class StatsTable extends React.Component {
  constructor(props) {
    super(props);
    const { path } = this.props;

    this.state = {
      path,
      labels: this.getLabels(path),
      data: null
    }
  }

  getLabels(path) {
    let labels;
    
    switch(path) {
      case 'obesos':
        labels = ['Sexo', 'Proporção' ];
        break;
      case 'estado':
        labels = ['Estado', 'Quantidade'];
        break;
      case 'avg-imc':
        labels = ['Faixa Etária', 'IMC Médio'];
        break;
      case 'avg-idade-sangue':
        labels = ['Tipo Sanguineo', 'Média de Idade'];
        break;
      case 'doadores':
        labels = ['Tipo Sanguineo', 'Quantidade'];
        break;
      default:
        labels = ['Texto', 'Número'];
    }
    return labels;
  }

  componentDidMount() {
    ApiService.getStats(this.state).then(
      response => {
        this.setState({ data: response.data })
      }
    )
  }

  render() {
    return (
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>{this.state.labels[0]}</th>
              <th>{this.state.labels[1]}</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data && this.state.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.text}</td>
                  <td>{Number(item.value).toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
      </Table>
    )
  }
}

export default StatsTable;