import React, { Component, Fragment } from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authActions';

// Components
import TransactionForm from '../transaction/TransactionForm';
import CategoriesForm from '../category/CategoriesForm';

export class Navbar extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired
    }
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            document.querySelector('.nav-links-mobile-container').classList.remove('active');
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    openMenu = e => {
        document.querySelector('.nav-links-mobile-container').classList.toggle('active');
    }
    render() {
        const {isAuthenticated} = this.props;
        const authLinks = (
            <Fragment>
                <li className="nav-item">
                    <NavLink exact to="/" className="nav-link">
                        <i className="fas fa-wallet nav-icon"></i>
                        <span>Transactions</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/categories" className="nav-link">
                        <i className="fas fa-cubes nav-icon"></i>
                        <span>Categories</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <span className="nav-link" onClick={this.props.logout}>
                        <i className="fas fa-sign-out-alt nav-icon"></i>
                        <span>Logout</span>
                    </span>
                </li>
                <li className="nav-item nav-item-btn">
                    {this.props.location.pathname === '/categories' ? <CategoriesForm /> : <TransactionForm />}
                </li>
            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
            </Fragment>
        );
        return (
            <nav className="nav">
                <h2 className="nav-brand">
                    <Link to="/">Expense Tracker</Link>
                </h2>
                <ul className="nav-mobile-items inline-ul">
                    {isAuthenticated ? (
                        <li className="nav-mobile-item">
                            {this.props.location.pathname === '/categories' ? <CategoriesForm /> : <TransactionForm />}
                        </li>
                    ) : null}
                    <li className="nav-mobile-item hamburger-menu" onClick={this.openMenu}>
                        <i className="fas fa-bars"></i>
                    </li>
                </ul>
                <div className="nav-links-mobile-container">
                    <div className="nav-link nav-links-close" onClick={this.openMenu}>
                        <i className="fas fa-times"></i>
                    </div>
                    <ul className="nav-links inline-ul">
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, {logout})(Navbar));
