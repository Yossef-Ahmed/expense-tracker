import React, { Fragment, useEffect, createRef, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link, NavLink, withRouter} from 'react-router-dom';

import {logout} from '../../actions/auth/logout';

import LoginModal from '../Home/LoginModal';
import TransactionForm from '../Transactions/TransactionForm';
import CategoriesForm from '../Categories/CategoriesForm';

import UserIcon from '../../images/user icon.png';

const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const Navbar = (props) => {
    const {
        logout,
        isAuthenticated,
        location
    } = props;

    const openMobileMenu = e => {
        e.target.nextElementSibling.classList.toggle('active');
    }

    const closeMobileMenuAndDropdown = useCallback(() => {
        document.querySelector('.navbar-menu__content').classList.remove('active');
        closeUserLinksList()
    }, [])

    const closeUserLinksList = e => {
        const userLinks = document.querySelector('.navbar .user-links');
        if (userLinks) {
            document.querySelector('.navbar .user-links__list').classList.remove("is-opend")
            userLinks.classList.remove("is-opend");
        }
    }

    const toggleUserLinksList = e => {
        document.querySelector('.navbar .user-links__list').classList.toggle("is-opend")
        document.querySelector('.navbar .user-links').classList.toggle("is-opend")
    }

    const closeMenuAndLogout = () => {
        closeMobileMenuAndDropdown()
        logout()
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside);
    })

    const userLinks = createRef();

    const handleClickOutside = e => {
        if (userLinks.current && !userLinks.current.contains(e.target)) {
            closeUserLinksList();
        }
    }

    const prevValues = usePrevious({location, isAuthenticated});

    useEffect(() => {
        if (prevValues !== undefined) {
            if (location.pathname !== prevValues.location.pathname) {
                closeMobileMenuAndDropdown()
            }
        }
    }, [location.pathname, prevValues, closeMobileMenuAndDropdown])

    useEffect(() => {
        if (prevValues !== undefined) {
            if (isAuthenticated !== prevValues.isAuthenticated) {
                closeMobileMenuAndDropdown()
            }
        }
    }, [prevValues, isAuthenticated, closeMobileMenuAndDropdown])

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
    const guestLinks = <LoginModal closeMobileMenu={closeMobileMenuAndDropdown} />;

    return (
        <nav className="navbar">
            <h2 className="brand-name">
                <Link to="/">Expense Tracker</Link>
            </h2>

            <div className="navbar-menu">
                <i className="navbar-menu__mobile-icon fas fa-bars" onClick={openMobileMenu}></i>

                <div className="navbar-menu__content">
                    <i className="navbar-menu__close-btn fas fa-times" onClick={closeMobileMenuAndDropdown}></i>

                    <div className="navbar-menu__links-container">
                        <ul className="navbar__links">
                            {isAuthenticated ? authLinks : guestLinks}
                        </ul>

                        {isAuthenticated ? (
                            <div className="user-links" ref={userLinks}>
                                <div className="user-links__user" onClick={toggleUserLinksList}>
                                    <img className="user-links__icon" src={UserIcon} alt="User Icon"/>
                                    <span className="user-links__username">Youssef Ahmed</span>
                                </div>
                                
                                <ul className="user-links__list">
                                    <TransactionForm closeMenu={closeMobileMenuAndDropdown} />
                                    <CategoriesForm closeMenu={closeMobileMenuAndDropdown} />

                                    <li onClick={closeMenuAndLogout}>
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

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
