import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addComma, getDayName, getMonthName} from '../../utils/index';
import {getTransaction} from '../../actions/transactionAction';

export class TransactionsList extends Component {
    static propTypes = {
        getTransaction: PropTypes.func.isRequired,
        transactions: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired
    }
    onClick = e => {
        let id;
        if (e.target.classList.contains('card-item-icon') || e.target.classList.contains('transaction-data')) {
            id = e.target.parentElement.id;
        } else if (e.target.classList.contains('fas') || e.target.classList.contains('primary-text') || e.target.classList.contains('transaction-note')) {
            id = e.target.parentElement.parentElement.id;
        } else if (e.target.classList.contains('transaction-category') || e.target.classList.contains('transaction-amount')) {
            id = e.target.parentElement.parentElement.parentElement.id;
        } else {
            id = e.target.id;
        }
        this.props.getTransaction(this.props.transactions.items.find(tran => tran._id === id));
    }
    render() {
        // Get the transactions date
        const transactionsDate = new Date(this.props.transactions.date);
        // Get the total of transactions
        const total = addComma(this.props.transactions.total.toFixed(2));
        let totalType = '';
        // check if the total is positive or negative
        if (Math.sign(this.props.transactions.total) === 1) {
            totalType = '+';
        } else {
            totalType = '-';
        }
        return (
            <div className="card-list transactions">
                <div className="transactions-header">
                    <div className="transactions-full-date">
                        <div className="transactions-day">{transactionsDate.getDate()}</div>
                        <div className="transactions-date">
                            <div className="days">{getDayName(transactionsDate.getDay())}</div>
                            <div className="months">{`${getMonthName(transactionsDate.getMonth())} ${transactionsDate.getFullYear()}`}</div>
                        </div>
                    </div>
                    <div className="transactions-total">{`${totalType}$ ${total}`}</div>
                </div>
                <div className="transactions-body">
                {this.props.transactions.items.map(transaction => {
                    // Get the transaction category
                    const transactionCategroy = this.props.categories.find(cat => cat._id === transaction.category);
                    const transactionTypeClass = transactionCategroy.type === '-' ? 'expense' : 'income';
                    const transactionType = transactionCategroy.type === '-' ? true : false;
                    // Get the transaction amount and format it
                    const amountFormat = addComma(transaction.amount.toFixed(2));
                    // The transaction 
                    return (
                        <div className="card-item transaction" id={transaction._id} onClick={this.onClick} key={transaction._id}>
                            <div className={`card-item-icon ${transactionTypeClass}`}>
                                <i className={`fas fa-${transactionType ? 'minus' : 'plus'}`}></i>
                            </div>
                            <div className="transaction-data">
                                <div className="primary-text">
                                    <h4 className="transaction-category">{transactionCategroy.name}</h4>
                                    <div className={`transaction-amount ${transactionTypeClass}`}>{`${transactionCategroy.type}$ ${amountFormat}`}</div>
                                </div>
                                <p className="transaction-note">{transaction.note}</p>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        )
    }
}

export default connect(null, {getTransaction})(TransactionsList);
