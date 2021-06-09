import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {register} from '../../actions/auth/register';
import {clearAlert} from '../../actions/auth/alert';

import Modal from '../Reuseable/Modal'
import Alert from '../Reuseable/Alert';
import InputField from '../Reuseable/InputField';

export const RegisterModal = (props) => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const toggleModal = () => {
        setModal((prevValue) => !prevValue);
        props.clearAlert();
    }

    const handleRegister = e => {
        e.preventDefault();
        props.register({name, email, password});
    }

    return (
        <Fragment>
            <button onClick={toggleModal} className="btn btn--green btn--small">Sign Up</button>

            <Modal isOpen={modal} toggleModal={toggleModal}>
                <form className="form" onSubmit={handleRegister}>
                    <h2 className="modal__title form__title">Sign Up</h2>

                    <Alert msg={props.alertMsg} type={props.alertType} clearAlert={props.clearAlert} />
                    
                    <InputField label="Full Name" name="name" placeholder="John Doe" defaultValue={name} saveValue={setName} />

                    <InputField label="Email" type="email" name="email" placeholder="example@gmail.com" defaultValue={email} saveValue={setEmail} />

                    <InputField label="Password" type="password" name="password" placeholder="********" defaultValue={password} saveValue={setPassword} />

                    <button type="submit" className="btn btn--block btn--green">Sign Up</button>
                </form>
            </Modal>
        </Fragment>
    )
}

RegisterModal.propTypes = {
    register: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    alertMsg: state.auth.alertMsg,
    alertType: state.auth.alertType
})

const mapDispatchToProps = {
    register,
    clearAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
