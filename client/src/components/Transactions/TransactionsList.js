import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {addComma, getDayName, getMonthName} from '../../utils/index';
import {getTransactionDetails} from '../../actions/transaction/transactionDetails';
import {getDayTransactions} from '../../actions/transaction/dayTransactions';

export const TransactionsList = (props) => {
    const openTransactionDetails = e => {
        let id;

        if (e.target.classList.contains('transactions-list__amount') || e.target.classList.contains('transactions-list__item__data')) {
            id = e.target.parentElement.id;
        } else if (e.target.classList.contains('primary-text') || e.target.classList.contains('category-icon')) {
            id = e.target.parentElement.parentElement.id;
        } else if (e.target.classList.contains('fas') || e.target.classList.contains('transactions-list__item__note') || e.target.classList.contains('transactions-list__item__category')) {
            id = e.target.parentElement.parentElement.parentElement.id;
        } else {
            id = e.target.id;
        }

        props.getTransactionDetails(props.transactions.items.find(tran => tran._id === id));
    }

    const openDayTransactions = transactions => {
        if (window.matchMedia('screen and (max-width: 500px)').matches) {
            props.getDayTransactions(transactions);
        }
    }

    const transactionsDate = new Date(props.transactions.date);
    
    const totalAmount = addComma(props.transactions.total.toFixed(2));
    let totalType = '-';
    
    if (Math.sign(props.transactions.total) === 1) {
        totalType = '+';
    }

    return (
        <div className="card__list transactions-list">
            <div className="card__item transactions-list__header" onClick={() => openDayTransactions(props.transactions)}>
                <div className="transactions-list__full-date">
                    <div className="transactions-list__full-date__day">{transactionsDate.getDate()}</div>                    
                    <div className="transactions-list__full-date__date">
                        <div className="day">{getDayName(transactionsDate.getDay())}</div>
                        <div className="month">{`${getMonthName(transactionsDate.getMonth())} ${transactionsDate.getFullYear()}`}</div>
                    </div>
                </div>
                
                <div className="transactions-list__amount">{`${totalType}$ ${totalAmount}`}</div>
            </div>

            <div className="transactions-list__body not-sm-show">
                {props.transactions.items.map(transaction => {
                    let transactionCategroy = props.categories.find(cat => cat._id === transaction.category);
                    if (!transactionCategroy) {
                        transactionCategroy = {type: ""}
                    }

                    const transactionTypeClass = transactionCategroy.type === '-' ? 'expense' : 'income';
                    const transactionAmountFormated = addComma(transaction.amount.toFixed(2));
                    
                    return (
                        <div className="card__item transactions-list__item" id={transaction._id} onClick={openTransactionDetails} key={transaction._id}>
                            <div className="transactions-list__item__data">
                                <div className={`category-icon ${transactionTypeClass}`}>
                                    <i className={`fas fa-${transactionCategroy.type === '-' ? 'minus' : 'plus'}`}></i>
                                </div>

                                <div className="primary-text">
                                    <h4 className="transactions-list__item__category">{transactionCategroy.name}</h4>
                                    <p className="transactions-list__item__note">{transaction.note}</p>
                                </div>
                            </div>

                            <div className={`transactions-list__amount ${transactionTypeClass}`}>{`${transactionCategroy.type}$ ${transactionAmountFormated}`}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

TransactionsList.propTypes = {
    getTransactionDetails: PropTypes.func.isRequired,
    getDayTransactions: PropTypes.func.isRequired,
    transactions: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
}

export default connect(null, {getTransactionDetails, getDayTransactions})(TransactionsList)
