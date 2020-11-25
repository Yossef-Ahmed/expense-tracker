// Modules
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './Store';
import {loadUser} from './actions/authActions';

// Components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Transactions from './components/transaction/Transactions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/others/Loader';
import Alert from './components/others/Alert';
import PageNotFound from './components/others/PageNotFound';
import ConfirmModal from './components/others/ConfirmModal';
import Categories from './components/category/Categories';

// Styles
import './css/all.min.css';
// import './App.scss';
import './sass/App.scss';

class App extends Component {
  componentDidMount() {
    Store.dispatch(loadUser());
  }
  render() {
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
                <Route exact path="/" component={Transactions} />
                <Route path="/categories" component={Categories} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
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