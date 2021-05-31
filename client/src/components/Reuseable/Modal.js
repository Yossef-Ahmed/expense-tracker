import React, { Component } from 'react'
import {CSSTransition} from 'react-transition-group'

import BackBtn from '../../images/back.png'

export class Modal extends Component {
    handleClickOutside = e => {
        if (e.target.classList.contains('modal-container') && e.target.dataset.modal === "true") {
            this.props.toggleModal();
        }
    }

    render() {
        const modalCustomClass = this.props.modalCustomClass ? this.props.modalCustomClass : '';

        return (
            <CSSTransition in={this.props.isOpen} timeout={400} unmountOnExit classNames="modal-fade">
                <div className="modal-container" onClick={this.handleClickOutside} data-modal="true">
                    <div className={`modal ${modalCustomClass}`}>
                        <img className="mobile-back-btn" onClick={this.props.toggleModal} src={BackBtn} alt="Left Arrow"/>
                        {this.props.children}
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Modal
