import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {closeEmailVerificationModal} from '../../actions/auth/toggleEmailVerification';
import {verifyEmail} from '../../actions/auth/verifyEmail';
import {clearAlert} from '../../actions/auth/alert';

import Modal from '../Reuseable/Modal'
import Alert from '../Reuseable/Alert'
import InputField from '../Reuseable/InputField'

export const EmailVerification = (props) => {
    const [verificationCode, setVerificationCode] = useState(null);

    const handleSubmition = e => {
        e.preventDefault();
        props.verifyEmail(props.email, verificationCode)
    }

    const closeModal = () => {
        props.closeEmailVerificationModal(null)
        props.clearAlert()
    }

    return (
        <Modal isOpen={props.modal} toggleModal={closeModal}>
            <form className="form" onSubmit={handleSubmition}>
                <h2 className="modal__title form__title">We've Sent You An Email With The Verification Code</h2>

                <Alert msg={props.alertMsg} type={props.alertType} clearAlert={props.clearAlert} />

                <InputField label="Verification Code" name="verificationCode" placeholder="198276874" defaultValue={verificationCode} saveValue={setVerificationCode} />

                <button type="submit" className="btn btn--block btn--green">Verify</button>
            </form>
        </Modal>
    )
}

EmailVerification.propTypes = {
    closeEmailVerificationModal: PropTypes.func.isRequired,
    verifyEmail: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    modal: state.auth.isEmailVerificationOpen,
    email: state.auth.emailToVerify,
    sendVerificationCodeNow: state.auth.sendVerificationCodeNow,
    alertMsg: state.auth.alertMsg,
    alertType: state.auth.alertType
})

const mapDispatchToProps = {
    closeEmailVerificationModal,
    verifyEmail,
    clearAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification)
