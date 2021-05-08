import React, { Component, Fragment } from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logout} from '../../actions/auth/logout';

import LoginModal from '../Home/LoginModal';
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

    closeMobileMenu = () => {
        document.querySelector('.navbar-menu__content').classList.toggle('active');
    }

    toggleUserLinksList = e => {
        document.querySelector('.navbar .user-links__list').classList.toggle("is-opend")
        document.querySelector('.navbar .user-links').classList.toggle("is-opend")
    }

    closeMenuAndLogout = () => {
        this.closeMobileMenu()
        this.props.logout()
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
        const guestLinks = <LoginModal closeMobileMenu={this.closeMobileMenu} />;

        return (
            <nav className="navbar">
                <h2 className="brand-name">
                    <Link to="/">Expense Tracker</Link>
                </h2>

                <div className="navbar-menu">
                    <i className="navbar-menu__mobile-icon fas fa-bars" onClick={this.openMobileMenu}></i>

                    <div className="navbar-menu__content">
                        <i className="navbar-menu__close-btn fas fa-times" onClick={this.closeMobileMenu}></i>

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
                                        <li onClick={this.closeMenuAndLogout}>
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
