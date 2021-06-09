import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {closeDayTransactions} from '../../actions/transaction/dayTransactions';
import {addComma, getMonthName} from '../../utils/index';

import TransactionsList from './TransactionsList'
import Modal from '../Reuseable/Modal'

export const DayTransactions = (props) => {
    const [modal, setModal] = useState(false);
    const [transactions, setTransactions] = useState({
        date: new Date(),
        total: 100.00,
        items: [],
        key: ""
    });

    const {
        closeDayTransactions,
        dayTransactions,
        categories
    } = props;

    const toggleModal = () => {
        setModal((prevValue) => {
            if (prevValue) {
                setTimeout(() => closeDayTransactions(), 500);
            }
            return !prevValue;
        });
    }

    useEffect(() => {
        if (Object.keys(dayTransactions).length !== 0) {
            setTransactions(dayTransactions)
            setModal(true)
        } else {
            setModal(false)
        }
    }, [dayTransactions, setModal, setTransactions]);

    const transactionsDate = new Date(transactions.date);

    const totalAmount = addComma(transactions.total.toFixed(2));
    let totalType = '-';
    
    if (Math.sign(transactions.total) === 1) {
        totalType = '+';
    }

    return (
        <Modal isOpen={modal} toggleModal={toggleModal} modalCustomClass={'modal-day-transactions'} containerClass="modal-day-transactions-container">
            <div className="modal__header">
                <h2 className="modal__title modal__title--sm">
                    {`${transactionsDate.getDate()} ${getMonthName(transactionsDate.getMonth())} ${transactionsDate.getFullYear()}`}
                </h2>

                <div className="modal-day-transactions__total">
                    Total:
                    <span className={totalType === '-' ? 'expense' : 'income'}>{`${totalType}$ ${totalAmount}`}</span>
                </div>
            </div>

            <TransactionsList key={transactions.key} categories={categories} transactions={transactions} />
        </Modal>
    )
}

DayTransactions.propTypes = {
    closeDayTransactions: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    dayTransactions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    dayTransactions: state.transactions.dayTransactions,
    categories: state.categories.items
})

const mapDispatchToProps = {
    closeDayTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(DayTransactions)
