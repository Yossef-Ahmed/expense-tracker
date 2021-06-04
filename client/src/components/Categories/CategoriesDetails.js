import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {deleteCategory} from '../../actions/category/deleteCategory';
import {closeCategoryDetails} from '../../actions/category/categoryDetails';
import {openConfirm} from '../../actions/confirmActions';

import CategoriesForm from './CategoriesForm';
import Modal from '../Reuseable/Modal'

export const CategoriesDetails = (props) => {
    const [modal, setModal] = useState(false);
    const [catType, setCatType] = useState('');
    const [catName, setCatName] = useState('');

    const toggleModal = () => {
        setModal((prevValue) => {
            if (prevValue) {
                setTimeout(() => props.closeCategoryDetails(), 500);
            }
            return !prevValue;
        });
    }

    const handleDelete = e => {
        props.openConfirm();
    }

    useEffect(() => {
        if (props.confirm && props.item) {
            props.deleteCategory(props.item._id);
            setTimeout(() => props.closeCategoryDetails(), 500);
            setModal(false);
        }
    }, [props.confirm, props.deleteCategory, props, setModal, props.closeCategoryDetails]);

    useEffect(() => {
        if (props.item) {
            setCatType(props.item.type)
            setCatName(props.item.name)
            setModal(true)
        } else {
            setModal(false)
        }
    }, [props.item, setCatType, setCatName, setModal]);

    const categoryType = catType === '-' ? 'expense' : 'income';

    return (
        <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass={'modal-details modal--wide'}>
            <div className="modal__header modal-details__header">
                <h2 className="modal__title modal__title--sm">Category details</h2>

                <div className="modal__btns modal__btns--no-padding not-sm-show">
                    <button className="btn btn--sm btn--color-red btn--no-bg btn--modal-details" onClick={handleDelete}>Delete</button>
                    <CategoriesForm formMode="Edit" />
                </div>
            </div>

            <div className="modal__body">
                <div className={`category-icon category-icon--bigger ${categoryType}`}>
                    <i className={`fas fa-${catType === '-' ? 'minus' : 'plus'}`}></i>
                </div>

                <div className="modal-details__info">
                    <h3 className="category-name">{catName}</h3>
                    <span className={`modal-details__cat-type ${categoryType}`}>{categoryType}</span>
                </div>
            </div>

            <div className="modal__btns sm-show">
                <button className="btn btn--gray-red btn--sm" onClick={handleDelete}>Delete</button>
                <CategoriesForm formMode="Edit" screen="Mobile" />
            </div>
        </Modal>
    )
}

CategoriesDetails.propTypes = {
    deleteCategory: PropTypes.func.isRequired,
    closeCategoryDetails: PropTypes.func.isRequired,
    openConfirm: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    confirm: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    item: state.categories.item,
    confirm: state.confirm.answer
})

export default connect(mapStateToProps, {deleteCategory, closeCategoryDetails, openConfirm})(CategoriesDetails)