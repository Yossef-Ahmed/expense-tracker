import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {register} from '../../actions/auth/register';
import {clearAlert} from '../../actions/auth/alert';

import Modal from '../Reuseable/Modal'
import Alert from '../Reuseable/Alert';

export class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: ''
    }
    static propTypes = {
        register: PropTypes.func.isRequired,
        clearAlert: PropTypes.func.isRequired
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal});
        this.props.clearAlert();
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
        
        const {name, email, password} = this.state;
        this.props.register({name, email, password});
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.toggleModal} className="btn btn--green btn--small">Sign Up</button>

                <Modal isOpen={this.state.modal} toggleModal={this.toggleModal}>
                    <form className="form" onSubmit={this.onSubmit}>
                        <h2 className="form__title">Sign Up</h2>

                        <Alert msg={this.props.alertMsg} type={this.props.alertType} clearAlert={this.props.clearAlert} />
                        
                        <div className="input-field" onClick={this.focusOnInput}>
                            <p className="input-field__label">Full Name</p>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="input-field__input"
                                placeholder="John Doe"
                                onChange={this.onChange}
                            />
                        </div>

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

                        <button type="submit" className="btn btn--block btn--green">Sign Up</button>
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

export default withRouter(connect(mapStateToProps, {register, clearAlert})(RegisterModal));
