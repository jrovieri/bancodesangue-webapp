import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Header from './components/header.component';
import Homepage from './pages/homepage.component';
import Stats from './pages/stats.component';
import LoadCandidatos from './components/load-candidatos.component';

import Login from './components/login.component';

import { clearMessage } from './actions/message';

import { history } from './helpers/history';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: undefined,
      showCandidatosMenu: false,
      canLoadCandidatos: false,
      canDeleteCandidatos: false
    }

    history.listen(location => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      const roles = user.roles.map(item => item.name);

      this.setState({
        currentUser: user,
        showCandidatosMenu: roles.includes('ADMIN'),
        showStatsMenu: roles.includes('USER')
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header {...this.state} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/stats/:path' component={Stats}/>
          <Route exact path='/candidatos/load' component={LoadCandidatos} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);