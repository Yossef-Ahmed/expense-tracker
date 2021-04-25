import React, { Component, Fragment } from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logout} from '../../actions/authActions';

import AddTransaction from '../Transactions/TransactionForm';
import AddCategory from '../Categories/CategoriesForm';

import UserIcon from '../../images/user icon.png';

export class Navbar extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired
    }

    openMobileMenu = e => {
        e.target.nextElementSibling.classList.toggle('active');
    }

    closeMobileMenu = e => {
        e.target.parentElement.classList.toggle('active');
    }

    toggleUserLinksList = e => {
        document.querySelector('.navbar .user-links__list').classList.toggle("is-opend")
        document.querySelector('.navbar .user-links').classList.toggle("is-opend")
    }

    render() {
        const {isAuthenticated} = this.props;
        const authLinks = (
            <Fragment>
                <li>
                    <NavLink exact to="/" className="nav-link">
                        <i className="fas fa-wallet nav-icon"></i>
                        <span>Transactions</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/categories" className="nav-link">
                        <i className="fas fa-cubes nav-icon"></i>
                        <span>Categories</span>
                    </NavLink>
                </li>
            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                <li>
                    <button className="btn btn--green nav-btn">Login</button>
                </li>
                <li className="nav-link nav-mobile-btn">
                    <i className="fas fa-sign-in-alt nav-icon"></i>
                    <span>Login</span>
                </li>
            </Fragment>
        );

        return (
            <nav className="navbar">
                <h2 className="brand-name">
                    <Link to="/">Expense Tracker</Link>
                </h2>

                <div className="navbar-menu">
                    <i onClick={this.openMobileMenu} className="fas fa-bars navbar-menu__mobile-icon"></i>

                    <div className="navbar-menu__content">
                        <i onClick={this.closeMobileMenu} className="navbar-menu__close-btn fas fa-times"></i>

                        <div className="navbar-menu__links-container">
                            <ul className="navbar__links">
                                {isAuthenticated ? authLinks : guestLinks}
                            </ul>

                            {isAuthenticated ? (
                                <div className="user-links">
                                    <div className="user-links__user" onClick={this.toggleUserLinksList}>
                                        <img className="user-links__icon" src={UserIcon} alt="User Icon"/>
                                        <span className="user-links__username">Youssef Ahmed</span>
                                    </div>
                                    
                                    <ul className="user-links__list">
                                        <AddTransaction />
                                        <AddCategory />
                                        <li>
                                            <i className="fas fa-user-edit"></i>
                                            Edit Profile
                                        </li>
                                        <li onClick={this.props.logout}>
                                            <i className="fas fa-sign-out-alt"></i>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, {logout})(Navbar));
