import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {closeEmailVerificationModal} from '../../actions/auth/toggleEmailVerification';
import {verifyEmail} from '../../actions/auth/verifyEmail';
import {clearAlert} from '../../actions/auth/alert';

import Modal from '../Reuseable/Modal'
import Alert from '../Reuseable/Alert';

export class EmailVerification extends Component {
    state = {
        verificationCode: null
    }
    static propTypes = {
        closeEmailVerificationModal: PropTypes.func.isRequired,
        verifyEmail: PropTypes.func.isRequired,
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
        
        const {verificationCode} = this.state;
        this.props.verifyEmail(this.props.email, verificationCode)
    }

    closeModal = () => {
        this.props.closeEmailVerificationModal(null)
        this.props.clearAlert()
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggleModal={this.closeModal}>
                <form className="form" onSubmit={this.onSubmit}>
                    <h2 className="form__title">We've Sent You An Email With The Verification Code</h2>

                    <Alert msg={this.props.alertMsg} type={this.props.alertType} clearAlert={this.props.clearAlert} />

                    <div className="input-field" onClick={this.focusOnInput}>
                        <p className="input-field__label">Verification Code</p>
                        <input
                            type="text"
                            name="verificationCode"
                            id="verificationCode"
                            className="input-field__input"
                            placeholder="198-276-874"
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn--block btn--green">Verify</button>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    modal: state.auth.isEmailVerificationOpen,
    email: state.auth.emailToVerify,
    sendVerificationCodeNow: state.auth.sendVerificationCodeNow,
    alertMsg: state.auth.alertMsg,
    alertType: state.auth.alertType
})

export default connect(mapStateToProps, {closeEmailVerificationModal, verifyEmail, clearAlert})(EmailVerification)
