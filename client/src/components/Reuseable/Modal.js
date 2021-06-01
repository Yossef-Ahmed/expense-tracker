import React from 'react'
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'

import BackBtn from '../../images/back.png'

function Modal(props) {
    const modalCustomClass = props.modalCustomClass ? props.modalCustomClass : '';

    const handleClickOutside = e => {
        const firstElementAfterModalContainer = modalCustomClass !== '' ? modalCustomClass.split(" ")[0] : 'modal';
        if (e.target.classList.contains('modal-container') && e.target.firstElementChild.classList.contains(firstElementAfterModalContainer)) {
            props.toggleModal();
        }
    }

    return (
        <CSSTransition in={props.isOpen} timeout={400} unmountOnExit classNames="modal-fade">
            <div className="modal-container" onClick={handleClickOutside}>
                <div className={`modal ${modalCustomClass}`}>
                    <img className="mobile-back-btn" onClick={props.toggleModal} src={BackBtn} alt="Left Arrow"/>
                    {props.children}
                </div>
            </div>
        </CSSTransition>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    modalCustomClass: PropTypes.string
}

export default Modal

