import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {login} from '../../actions/auth/login';
import {clearAlert} from '../../actions/auth/alert';

import Modal from '../Reuseable/Modal'
import Alert from '../Reuseable/Alert';

export class Login extends Component {
    state = {
        modal: false,
        email: '',
        password: ''
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
        closeMobileMenu: PropTypes.func,
        clearAlert: PropTypes.func.isRequired
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
        this.props.closeMobileMenu()
        
        const {email, password} = this.state;
        this.props.login({email, password});
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal});
        this.props.clearAlert();
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
                        <h2 className="modal__title form__title">Sign In</h2>

                        <Alert msg={this.props.alertMsg} type={this.props.alertType} clearAlert={this.props.clearAlert} />
                        
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
                    </form>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    alertMsg: state.auth.alertMsg,
    alertType: state.auth.alertType
})

export default withRouter(connect(mapStateToProps, {login, clearAlert})(Login));