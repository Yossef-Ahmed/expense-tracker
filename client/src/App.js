import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './Store';
import {loadUser} from './actions/authActions';

import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import PageNotFound from './pages/PageNotFound';

import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Loader from './components/Others/Loader';
import Alert from './components/Others/Alert';
import ConfirmModal from './components/Others/ConfirmModal';

import './sass/App.scss';

class App extends Component {
  componentDidMount() {
    Store.dispatch(loadUser());
  }

  render() {
    const isAuthenticated = Store.getState().auth.isAuthenticated;
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Loader />
            <Alert />
            <ConfirmModal />
            <Navbar />
            <div className="content">
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