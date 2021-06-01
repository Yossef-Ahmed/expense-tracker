import React, { useState, useEffect, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import {createTransaction, updateTransaction} from '../../actions/transactionAction';
import {addComma, removeNonNumericCharsFromString, leave2NumbersAfterDot, isAmountFloat} from '../../utils/index';

import Modal from '../Reuseable/Modal'
import CategoriesSelect from '../Categories/CategoriesSelect';
import SelectDate from '../Others/SelectDate';
import InputField from '../Reuseable/InputField';

const TransactionForm = (props) => {
    const [modal, setModal] = useState(false);
    const [note, setNote] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(new Date().getTime());
    const [valid, setValid] = useState(false);

    const toggleModal = () => {
        setModal((prevValue) => !prevValue);
    }

    const toggleAddModal = () => {
        setNote('');
        setAmount('');
        setCategoryId('');
        setDate(new Date().getTime());
        setValid(false);
        toggleModal()
    }

    const handleAmount = amount => {
        // let amount = e.target.value;

        if (amount !== '') {
            amount = removeNonNumericCharsFromString(amount);

            if (!isNaN(parseFloat(amount))) {
                if (isAmountFloat(amount)) {
                    amount = leave2NumbersAfterDot(amount);
                } else {
                    amount = parseFloat(amount).toString();
                }
            }
        }

        setAmount(amount)
        return amount !== '' ? addComma(amount) : '';
    }

    const isEdit = props.formMode === 'Edit' ? true : false;

    useEffect(() => {
        if (isEdit) {
            const item = props.item;

            setAmount(item.amount.toString());
            setCategoryId(item.category);
            setDate(item.date);
            setNote(item.hasOwnProperty('note') ? item.note : '');
        }
    }, [setAmount, setCategoryId, setDate, setNote, isEdit, props.item]);

    useEffect(() => {
        const validation = () => {
            let valid = false;
    
            if (amount !== '' && categoryId !== '' && date !== '') {
                const amountNum = parseFloat(amount);
                if (!isNaN(amountNum) && amountNum > 0) {
                    valid = true;
                }
            }
    
            setValid(valid);
        }

        validation();
    }, [categoryId, amount, date]);

    const saveTransaction = () => {
        if (isEdit) {
            const transaction = props.item;
            
            transaction.categoryId = categoryId;
            transaction.amount = amount;
            transaction.date = date;
            transaction.note = note;
            
            props.updateTransaction(transaction);
            toggleModal();
        } else {
            props.createTransaction({
                categoryId,
                amount,
                date,
                note
            });
            toggleAddModal();
        }
    }

    const category = isEdit ? props.categories.find(cat => cat._id === categoryId) : null;

    return (
        <Fragment>
            {isEdit ? (
                <button className="card-btn card-btn-success" onClick={toggleModal}>Edit</button>
            ) : (
                <li onClick={toggleAddModal}>
                    <i className="fas fa-plus"></i>
                    Add New Transaction
                </li>
            )}

            <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass={'modal--wide'}>
                <div className="modal__header">
                    <h2 className="modal__title">{`${isEdit ? 'Edit' : 'Add'} Transaction`}</h2>
                </div>

                <form className="form form--grid" onSubmit={e => e.preventDefault()}>
                    <CategoriesSelect saveValue={(val) => setCategoryId(val)} category={category} />

                    <InputField label="Amount" name="amount" defaultValue={amount !== '' ? addComma(amount) : ''} saveValue={(val) => handleAmount(val)}>
                        {amount === '' ? (
                            <span className="form-amount-value">0</span>
                        ) : null}
                    </InputField>

                    <SelectDate saveValue={(name, val) => setDate(val)} date={date} />

                    <InputField label="Note" name="note" placeholder="Write any note..." saveValue={setNote} />
                </form>

                <div className="modal__btns">
                    <button className="btn btn--gray btn--sm" onClick={isEdit ? toggleModal : toggleAddModal}>Cancel</button>
                    {valid
                        ? <button className='btn btn--sm btn--green' onClick={saveTransaction}>Save</button>
                        : <button className='btn btn--sm btn--green btn--disabled' disabled='disabled'>Save</button>
                    }
                </div>
            </Modal>
        </Fragment>
    )
}

TransactionForm.propTypes = {
    createTransaction: PropTypes.func.isRequired,
    updateTransaction: PropTypes.func.isRequired,
    item: PropTypes.object,
    categories: PropTypes.array,
    formMode: PropTypes.string
}

const mapStateToProps = state => ({
    item: state.transactions.item,
    categories: state.categories.items
});

export default connect(mapStateToProps, {createTransaction, updateTransaction})(TransactionForm);