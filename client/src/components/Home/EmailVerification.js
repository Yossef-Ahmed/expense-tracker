import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {toggleEmailVerificationModal, verifyEmail} from '../../actions/authActions';

import Modal from '../Reuseable/Modal'

export class EmailVerification extends Component {
    state = {
        verificationCode: null
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

    toggleModal = () => {
        this.props.toggleEmailVerificationModal(this.props.email, this.props.sendVerificationCodeNow)
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggleModal={this.toggleModal}>
                <form className="form" onSubmit={this.onSubmit}>
                    <h2 className="form__title">We've Sent You An Email With The Verification Code</h2>

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
    sendVerificationCodeNow: state.auth.sendVerificationCodeNow
})

export default connect(mapStateToProps, {toggleEmailVerificationModal, verifyEmail})(EmailVerification)
