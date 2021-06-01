import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'

import InputField from '../Reuseable/InputField';
import Modal from '../Reuseable/Modal';
import CategoriesCard from './CategoriesCard';

function CategoriesSelect(props) {
    const [modal, setModal] = useState(false)
    const [category, setCategory] = useState(null)

    const toggleModal = () => {
        setModal(prevModal => !prevModal)
    }

    const saveValue = cat => {
        setCategory(cat);
        props.saveValue(cat._id);
        toggleModal();
    }

    return (
        <Fragment>
            <InputField label="Category" noInput={true} onClick={toggleModal} >
                <div className="input-field__input">
                    {category ? (
                        <Fragment>
                            <div className={`category-icon ${category.type === '-' ? 'expense' : 'income'}`}>
                                <i className={`fas fa-${category.type === '-' ? 'minus' : 'plus'}`}></i>
                            </div>
                            {category.name}
                        </Fragment>
                    ) : "Select Category"}
                </div>
            </InputField>

            <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass="modal-select-category">
                <div className="modal__header">
                    <div className="modal__close-btn">
                        <i onClick={toggleModal} className="fas fa-times"></i>
                    </div>

                    <h3 className="modal__title">Select Category</h3>
                </div>

                <div className="modal__body">
                    <CategoriesCard component={"select"} saveValue={saveValue} />
                </div>
            </Modal>
        </Fragment>
    )
}

CategoriesSelect.propTypes = {
    saveValue: PropTypes.func.isRequired,
    category: PropTypes.object
}

export default CategoriesSelect

