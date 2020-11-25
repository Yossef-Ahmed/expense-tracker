import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {closeConfirm} from '../../actions/confirmActions';
import {CSSTransition} from 'react-transition-group';

export class ConfirmModal extends Component {
    static propTypes = {
        closeConfirm: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired
    }
    closeOnClick = e => {
        const answer = e.target.dataset.answer === 'false' ? false : true;
        this.props.closeConfirm(answer);
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('modal-container') && e.target.firstElementChild.classList.contains('modal-confirm')) {
            this.props.closeConfirm(false);
        }
    }
    render() {
        return (
            <CSSTransition in={this.props.isOpen} timeout={400} unmountOnExit classNames="modal-fade">
                <div className="modal-container" onClick={this.handleClickOutside}>
                    <div className="modal modal-confirm">
                        <div className="modal-header">
                            <h3>Confirm Deletion</h3>
                        </div>
                        <div className="modal-body">
                            <p className="modal-body-msg">Delete this transaction?</p>
                            <div className="modal-buttons">
                                <button className="btn btn-secondary" onClick={this.closeOnClick} data-answer={false}>No</button>
                                <button className="btn btn-danger" onClick={this.closeOnClick} data-answer={true}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = state => ({
    isOpen: state.confirm.isOpen
});

export default connect(mapStateToProps, {closeConfirm})(ConfirmModal);