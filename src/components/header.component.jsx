import React from 'react';
import { withRouter } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({ currentUser, showCandidatosMenu, showStatsMenu, history }) => (
  <div className='header'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">WK Banco de Sangue</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {
                showStatsMenu && (
                  <NavDropdown title="Estatística" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/stats/estado">Candidatos por Estado</NavDropdown.Item>
                    <NavDropdown.Item href="/stats/avg-imc">IMC Médio por Faixa Etária</NavDropdown.Item>
                    <NavDropdown.Item href="/stats/avg-idade-sangue">Média de Idade por Tipo Sanguineo</NavDropdown.Item>
                    <NavDropdown.Item href="/stats/obesos">Obesos por Sexo</NavDropdown.Item>
                    <NavDropdown.Item href="/stats/doadores">Total de Doadores por Tipo Sanguineo</NavDropdown.Item>
                </NavDropdown>
                )
              }
              {
                showCandidatosMenu && (
                  <NavDropdown title="Candidatos" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/candidatos/load">Carregar</NavDropdown.Item>
                  </NavDropdown>
                )
              }
            </Nav>
            <Nav>
              {
                currentUser ? (<Nav.Link onClick={() => {
                  localStorage.removeItem('user');
                  history.push('/');
                  window.location.reload();
                }}>Logout</Nav.Link>) : (<Nav.Link href="/login">Login</Nav.Link>)
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
)

export default withRouter(Header);