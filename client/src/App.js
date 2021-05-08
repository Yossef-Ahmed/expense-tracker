import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './Store';
import {loadUser} from './actions/auth/loadUser';

import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import PageNotFound from './pages/PageNotFound';

import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Loader from './components/Others/Loader';
import MainAlert from './components/Others/MainAlert';
import ConfirmModal from './components/Others/ConfirmModal';

import './sass/App.scss';

class App extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    Store.dispatch(loadUser());
    this.subscribeToStateChnage();
  }

  subscribeToStateChnage = () => {
    Store.subscribe(() => {
      const prev = Store.getState().auth.isAuthenticated;
      const current = this.state.isAuthenticated;
      if(this.isPrevNotEqualCurrent(prev, current)) {
        this.setState({isAuthenticated: !current});
      }
    })
  };

  isPrevNotEqualCurrent = (prev, current) => {
    return prev !== current;
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Loader />
            <ConfirmModal />
            <Navbar />
            <div className="content">
              <MainAlert />
              <Switch>
                <Route exact path="/" component={isAuthenticated ? Transactions : Home} />
                <Route path="/categories" component={Categories} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;