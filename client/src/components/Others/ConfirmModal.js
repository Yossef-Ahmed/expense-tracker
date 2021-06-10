import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {closeConfirm} from '../../actions/confirmActions';
import Modal from '../Reuseable/Modal'

export const ConfirmModal = (props) => {
    const [modal, setModal] = useState(false);

    const closeModal = (answer) => {
        setModal(false);
        setTimeout(() => props.closeConfirm(answer), 500);
    }

    useEffect(() => {
        if (props.isOpen) {
            setModal(true);
        }
    }, [props.isOpen, setModal]);

    return (
        <Modal isOpen={modal} toggleModal={() => closeModal(false)} modalCustomClass={'modal-confirm'} containerClass={'modal-confirm-container'}>
            <div className="modal__header">
                <h2 className="modal__title modal__title--sm">Confirm Deletion</h2>
            </div>

            <div className="modal__body">
                <p className="modal__body__msg">Are you sure that you want to delete this?</p>

                <div className="modal__btns">
                    <button className="btn btn--gray" onClick={() => closeModal(false)} data-answer={false}>No</button>
                    <button className="btn btn--red" onClick={() => closeModal(true)} data-answer={true}>Yes</button>
                </div>
            </div>
        </Modal>
    )
}

ConfirmModal.propTypes = {
    closeConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isOpen: state.confirm.isOpen
})

const mapDispatchToProps = {
    closeConfirm
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal)
