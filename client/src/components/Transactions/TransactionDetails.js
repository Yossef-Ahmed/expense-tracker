import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {deleteTransaction} from '../../actions/transaction/deleteTransaction';
import {closeTransactionDetails} from '../../actions/transaction/transactionDetails';
import {openConfirm} from '../../actions/confirmActions';
import {addComma, getDayName, formatDate} from '../../utils/index';

import TransactionForm from './TransactionForm';
import Modal from '../Reuseable/Modal'

export const TransactionDetails = (props) => {
    const [modal, setModal] = useState(false);
    const [transaction, setTransaction] = useState({
        category: "",
        note: "",
        date: new Date().getTime(),
        amount: 100
    });
    const [category, setCategory] = useState({
        name: "",
        type: ""
    });

    const {
        openConfirm,
        closeTransactionDetails,
        deleteTransaction,
        confirm,
        categories,
        item
    } = props;

    const toggleModal = () => {
        setModal((prevValue) => {
            if (prevValue) {
                setTimeout(() => closeTransactionDetails(), 500);
            }
            return !prevValue;
        });
    }

    const handleDelete = e => {
        openConfirm();
    }

    useEffect(() => {
        if (confirm && item) {
            deleteTransaction(item._id);
            setTimeout(() => closeTransactionDetails(), 500);
            setModal(false);
        }
    }, [confirm, deleteTransaction, item, setModal, closeTransactionDetails]);

    useEffect(() => {
        if (item) {
            setTransaction(item)
            setCategory(categories.find(cat => cat._id === item.category))
            setModal(true)
        } else {
            setModal(false)
        }
    }, [item, categories, setTransaction, setCategory, setModal]);

    const categoryType = category.type === '-' ? 'expense' : 'income';
    const transactionDate = new Date(parseInt(transaction.date));

    return (
        <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass={'modal-details modal--wide'}>
            <div className="modal__header modal-details__header">
                <h2 className="modal__title modal__title--sm">Transaction details</h2>

                <div className="modal__btns modal__btns--no-padding not-sm-show">
                    <button className="btn btn--sm btn--color-red btn--no-bg btn--modal-details" onClick={handleDelete}>Delete</button>
                    <TransactionForm formMode="Edit" />
                </div>
            </div>

            <div className="modal__body">
                <div className="modal-details__data">
                    <div className={`category-icon category-icon--bigger ${categoryType}`}>
                        <i className={`fas fa-${category.type === '-' ? 'minus' : 'plus'}`}></i>
                    </div>

                    <div className="modal-details__info">
                        <h3 className="category-name">{category.name}</h3>
                        <div className="modal-details__date">{`${getDayName(transactionDate.getDay())}, ${formatDate(transactionDate)}`}</div>
                        <p className="modal-details__note">{transaction.note}</p>
                    </div>
                </div>

                <div className={`modal-details__amount ${categoryType}`}>{`${category.type}$ ${addComma(parseInt(transaction.amount).toFixed(2))}`}</div>
            </div>

            <div className="modal__btns sm-show">
                <button className="btn btn--gray-red btn--sm" onClick={handleDelete}>Delete</button>
                <TransactionForm formMode="Edit" screen="Mobile" />
            </div>
        </Modal>
    )
}

TransactionDetails.propTypes = {
    categories: PropTypes.array.isRequired,
    confirm: PropTypes.bool.isRequired,
    item: PropTypes.object,
    deleteTransaction: PropTypes.func.isRequired,
    closeTransactionDetails: PropTypes.func.isRequired,
    openConfirm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    item: state.transactions.item,
    categories: state.categories.items,
    confirm: state.confirm.answer
})

const mapDispatchToProps = {
    deleteTransaction,
    closeTransactionDetails,
    openConfirm
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails)
