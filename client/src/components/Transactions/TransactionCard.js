import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {getTransactions} from '../../actions/transaction/getTransactions';
import {addComma, getMonthName} from '../../utils/index';

import TransactionsList from './TransactionsList';

export const TransactionCard = (props) => {
    const [currMonthDate, setCurrMonthDate] = useState(new Date());
    const [currSlide, setCurrSlide] = useState(`${getMonthName(currMonthDate.getMonth())} ${currMonthDate.getFullYear()}`);

    const changeSlide = method => {
        if (method === "next") {
            let newDate = new Date(new Date(currMonthDate).setFullYear(currMonthDate.getFullYear(), currMonthDate.getMonth() + 2, 0));

            if (isDateInCurrentMonth(newDate)) {
                newDate.setDate(new Date().getDate());
            }

            if ((!isDateInFuture(currMonthDate) && !isDateInFuture(newDate)) || (!isDateInFuture(currMonthDate) && isDateInFuture(newDate))) {
                setCurrMonthDate(newDate)
            }
        } else {
            let newDate = new Date(new Date(currMonthDate).setFullYear(currMonthDate.getFullYear(), currMonthDate.getMonth(), 0));

            if (isDateInCurrentMonth(newDate)) {
                newDate.setDate(new Date().getDate());
            }

            setCurrMonthDate(newDate)
        }
    }

    const printSlideTitle = date => {
        return `${getMonthName(date.getMonth())} ${date.getFullYear()}`
    }

    const isDateInCurrentMonth = date => {
        return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? true : false
    }

    const isDateInFuture = date => {
        return date > new Date() ? true : false
    }

    const {isAuthenticated, getTransactions, categories, transactions} = props;

    useEffect(() => {
        if(isAuthenticated) {
            if (isDateInFuture(currMonthDate)) {
                setCurrSlide("Future");
            } else {
                setCurrSlide(printSlideTitle(currMonthDate));
            }

            getTransactions(currMonthDate);
        }
    }, [isAuthenticated, getTransactions, currMonthDate, setCurrSlide]);

    let transactionsFilterd = [];
    let incomeTotal = 0;
    let outcomeTotal = 0;

    transactions.forEach(transaction => {
        const transactionDate = new Date(new Date().setTime(transaction.date));
        const transactionCategroy = categories.find(cat => cat._id === transaction.category);
        
        if (transactionCategroy) {
            if (transactionCategroy.type === '-') {
                outcomeTotal += transaction.amount;
            } else {
                incomeTotal += transaction.amount;
            }
        }
        
        const matchedTransactions = transactions.filter(tran => new Date(new Date().setTime(tran.date)).getDate() === transactionDate.getDate());
        let newTransactions = [];
        let total = 0;
        
        matchedTransactions.forEach(tran => {
            const tranCategroy = categories.find(cat => cat._id === tran.category);
            
            if (tranCategroy) {
                if (tranCategroy.type === '-') {
                    total -= tran.amount;
                } else {
                    total += tran.amount;
                }
            }
            
            newTransactions.push(tran);
        });
        
        const isDateExists = transactionsFilterd.find(tran => tran.key === transactionDate.getDate());
        if (!isDateExists) {
            transactionsFilterd.push({
                key: transactionDate.getDate(),
                total: total,
                date: transactionDate,
                items: newTransactions
            });
        }
    });
    
    transactionsFilterd.sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalMonth = incomeTotal - outcomeTotal;
    let totalMonthType = '-';
    if (Math.sign(totalMonth) === 1) {
        totalMonthType = '+';
    }

    return (
        <div className="card">
            <div className="card__header">
                <div className="card__slider">
                    <i className="card__slider__btn fas fa-chevron-left fa-lg" onClick={() => changeSlide("prev")}></i>
                    <div className="card__slider__curr-slide">{currSlide}</div>
                    <i className="card__slider__btn fas fa-chevron-right fa-lg" onClick={() => changeSlide("next")}></i>
                </div>
            </div>

            {transactions.length === 0 ? (
                <div className="card__no-results">
                    <i className="far fa-smile card__no-results__icon"></i>
                    <p>No transactions found, please add some.</p>
                </div>
            ) : (
                <Fragment>
                    <div className="transactions-states">
                        <div className="transactions-states__item">
                            <span>Income</span>
                            <span className="income">{`+$ ${addComma(incomeTotal.toFixed(2))}`}</span>
                        </div>

                        <div className="transactions-states__item">
                            <span>Outcome</span>
                            <span className="expense">{`-$ ${addComma(outcomeTotal.toFixed(2))}`}</span>
                        </div>

                        <div className="transactions-states__item transactions-states__total">
                            <div className="transactions-states__bar"></div>

                            <span>{`${totalMonthType}$ ${addComma(totalMonth.toFixed(2)).replace('-', '')}`}</span>
                        </div>
                    </div>

                    <div className="card__bar"></div>

                    <div className="card__body">
                        {transactionsFilterd.map(transactions => {
                            const isLast = transactionsFilterd.lastIndexOf(transactions) === transactionsFilterd.length - 1 ? true : false;
                            
                            return (
                                <Fragment key={transactions.key}>
                                    <TransactionsList key={transactions.key} categories={categories} transactions={transactions} />
                                    {isLast ? null : <div className="card__bar not-sm-show"></div>}
                                </Fragment>
                            );
                        })}
                    </div>
                </Fragment>
            )}
        </div>
    )
}

TransactionCard.propTypes = {
    transactions: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    getTransactions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    transactions: state.transactions.items,
    categories: state.categories.items
})

const mapDispatchToProps = {
    getTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard)
