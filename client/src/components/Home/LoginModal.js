import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {login} from '../../actions/authActions';

import Modal from '../Reuseable/Modal'
import GoogleBtn from './GoogleBtn'

export class Login extends Component {
    state = {
        modal: false,
        msg: null,
        email: '',
        password: ''
    }
    static propTypes = {
        login: PropTypes.func.isRequired
    }

    focusOnInput = e => {
        if (e.target.className === 'input-field__label') {
            e.target.nextElementSibling.focus();
        } else if (e.target.className === 'input-field') {
            e.target.lastElementChild.focus();
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit = e => {
        e.preventDefault();
        
        const {email, password} = this.state;
        this.props.login({email, password});
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal});
    }

    render() {
        return (
            <Fragment>
                <Fragment>
                    <li>
                        <button className="btn btn--green nav-btn" onClick={this.toggleModal}>Login</button>
                    </li>
                    <li className="nav-link nav-mobile-btn" onClick={this.toggleModal}>
                        <i className="fas fa-sign-in-alt nav-icon"></i>
                        <span>Login</span>
                    </li>
                </Fragment>

                <Modal isOpen={this.state.modal} toggleModal={this.toggleModal}>
                    <form className="form" onSubmit={this.onSubmit}>
                        <h2 className="form__title">Sign In</h2>
                        
                        <GoogleBtn method="Sign In" />

                        <div className="form__span">Or</div>

                        <div className="input-field" onClick={this.focusOnInput}>
                            <p className="input-field__label">Email</p>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="input-field__input"
                                placeholder="example@gmail.com"
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="input-field" onClick={this.focusOnInput}>
                            <p className="input-field__label">Password</p>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="input-field__input"
                                placeholder="********"
                                onChange={this.onChange}
                            />
                        </div>

                        <button type="submit" className="btn btn--block btn--green">Sign In</button>

                        <span className="form__reset-password">Forgot Your Password?</span>
                    </form>
                </Modal>
            </Fragment>
        )
    }
}

export default withRouter(connect(null, {login})(Login));