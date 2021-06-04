import React, { useState, useEffect, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {createCategory} from '../../actions/category/createCategory';
import {updateCategory} from '../../actions/category/updateCategory';

import Modal from '../Reuseable/Modal'
import InputField from '../Reuseable/InputField';

function CategoriesForm(props) {
    const [modal, setModal] = useState(false);
    const [type, setType] = useState('+');
    const [name, setName] = useState('');
    const [valid, setValid] = useState(false);

    const toggleModal = () => {
        setModal((prevValue) => !prevValue);
    }

    const toggleAddModal = () => {
        setType('+');
        setName('');
        setValid(false);
        toggleModal()
    }

    const chooseType = e => {
        let chooseBtn = e.target;
        
        if (chooseBtn.classList.contains('form-choose__icon') || chooseBtn.classList.contains('form-choose__text')) {
            chooseBtn = chooseBtn.parentElement;
        } else if (chooseBtn.tagName === 'SPAN') {
            chooseBtn = chooseBtn.parentElement.parentElement;
        }
        
        setType(chooseBtn.dataset.type)
    }

    const isEdit = props.formMode === 'Edit' ? true : false;

    const saveCategory = () => {
        if (isEdit) {
            const category = props.item;
            category.name = name;
            category.type = type;
            
            props.updateCategory(category);
            toggleModal();
        } else {
            props.createCategory({
                name,
                type
            });
            
            toggleAddModal();
        }
    }

    useEffect(() => {
        if (isEdit && props.item) {
            const item = props.item;

            setName(item.name);
            setType(item.type);
        }
    }, [setName, setType, isEdit, props.item]);

    useEffect(() => {
        const validation = () => {
            let valid = false;
    
            if (name !== '' && type !== '') {
                valid = true;
            }
    
            setValid(valid);
        }

        validation();
    }, [name, type]);

    return (
        <Fragment>
            {isEdit ? (
                props.screen === 'Mobile' ? (
                    <button className="btn btn--sm btn--green " onClick={toggleModal}>Edit</button>
                ) : (
                    <button className="btn btn--sm btn--color-green btn--no-bg btn--modal-details" onClick={toggleModal}>Edit</button>
                )
            ) : (
                <li onClick={toggleAddModal}>
                    <i className="fas fa-plus"></i>
                    Add New Category
                </li>
            )}

            <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass={'modal-category modal--wide'}>
                <div className="modal__header">
                    <h2 className="modal__title">{`${isEdit ? 'Edit' : 'Add'} Category`}</h2>
                </div>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="form-choose-container">
                        <div className="form-choose" onClick={chooseType} data-type="+">
                            <div className={`form-choose__icon ${type === "+" ? "active" : ""}`}>
                                <span></span>
                            </div>

                            <span className="form-choose__text">Income</span>
                        </div>

                        <div className="form-choose" onClick={chooseType} data-type="-">
                            <div className={`form-choose__icon ${type === "-" ? "active" : ""}`}>
                                <span></span>
                            </div>

                            <span className="form-choose__text">Expense</span>
                        </div>
                    </div>

                    <InputField label="Category Name" name="name" placeholder="Gas, Salary, ect." defaultValue={name} saveValue={setName} />
                </form>
                
                <div className="modal__btns">
                    <button className="btn btn--gray btn--sm" onClick={isEdit ? toggleModal : toggleAddModal}>Cancel</button>
                    {valid
                        ? <button className='btn btn--sm btn--green' onClick={saveCategory}>Save</button>
                        : <button className='btn btn--sm btn--green btn--disabled' disabled='disabled'>Save</button>
                    }
                </div>
            </Modal>
        </Fragment>
    )
}

CategoriesForm.propTypes = {
    formMode: PropTypes.string,
    item: PropTypes.object,
    createCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    item: state.categories.item
});

export default connect(mapStateToProps, {createCategory, updateCategory})(CategoriesForm)