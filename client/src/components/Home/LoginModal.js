import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {login} from '../../actions/auth/login';
import {clearAlert} from '../../actions/auth/alert';

import Modal from '../Reuseable/Modal'
import Alert from '../Reuseable/Alert';
import InputField from '../Reuseable/InputField';

export const LoginModal = (props) => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleModal = () => {
        setModal((prevValue) => !prevValue);
        props.clearAlert();
    }

    const handleLogin = e => {
        e.preventDefault();
        props.login({email, password});
    }

    return (
        <Fragment>
            <li>
                <button className="btn btn--green nav-btn" onClick={toggleModal}>Login</button>
            </li>
            <li className="nav-link nav-mobile-btn" onClick={toggleModal}>
                <i className="fas fa-sign-in-alt nav-icon"></i>
                <span>Login</span>
            </li>

            <Modal isOpen={modal} toggleModal={toggleModal}>
                <form className="form" onSubmit={handleLogin}>
                    <h2 className="modal__title form__title">Sign In</h2>

                    <Alert msg={props.alertMsg} type={props.alertType} clearAlert={props.clearAlert} />
                    
                    <InputField label="Email" type="email" name="email" placeholder="example@gmail.com" defaultValue={email} saveValue={setEmail} />

                    <InputField label="Password" type="password" name="password" placeholder="********" defaultValue={password} saveValue={setPassword} />

                    <button type="submit" className="btn btn--block btn--green">Sign In</button>
                </form>
            </Modal>
        </Fragment>
    )
}

LoginModal.propTypes = {
    login: PropTypes.func.isRequired,
    closeMobileMenu: PropTypes.func,
    clearAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    alertMsg: state.auth.alertMsg,
    alertType: state.auth.alertType
})

const mapDispatchToProps = {
    login,
    clearAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
