import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTransactions} from '../../actions/transactionAction';
import {addComma} from '../../utils/index';
import TransactionsList from './TransactionsList';

const thisMonthDate = new Date();

export class TransactionCard extends Component {
    constructor() {
        super();
        this.state = {
            currMonth: new Date(),
            prevTab: null,
            currTab: null,
            nextTab: null,
            thisMonth: <span className="thisMonth" onClick={this.onClick} data-date={`${new Date(new Date().setFullYear(thisMonthDate.getFullYear(), thisMonthDate.getMonth(), 1)).toISOString()}/${thisMonthDate.toISOString()}`}>This Month</span>,
            lastMonth: <span className="lastMonth" onClick={this.onClick} data-date={`${new Date(new Date().setFullYear(thisMonthDate.getFullYear(), thisMonthDate.getMonth() - 1, 1)).toISOString()}/${new Date(new Date().setFullYear(thisMonthDate.getFullYear(), thisMonthDate.getMonth(), 0)).toISOString()}`}>Last Month</span>,
            future: <span className="future" onClick={this.onClick} data-date={`${new Date(new Date().setFullYear(thisMonthDate.getFullYear(), thisMonthDate.getMonth(), thisMonthDate.getDate() + 1)).toISOString()}/${new Date(new Date().setFullYear(thisMonthDate.getFullYear(), thisMonthDate.getMonth(), thisMonthDate.getDate() + 1)).toISOString()}`}>Future</span>
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!state.prevTab && !state.currTab && !state.nextTab) {
            state.prevTab = state.lastMonth;
            state.currTab = state.thisMonth;
            state.nextTab = state.future;
        }
        return state;
    }
    static propTypes = {
        transactions: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        item: PropTypes.object,
        getTransactions: PropTypes.func.isRequired
    }
    componentDidMount() {
        if(this.props.isAuthenticated) {
            // Get the Transactions
            this.props.getTransactions(this.state.currMonth);
        }
        // Set the postion of the card tab line to the active tab
        document.querySelector('.card-tab-line').style.left = `${document.querySelector('.card-tab.active').offsetLeft}px`;
    }
    onClick = e => {
        // Get the bar for animation
        const cardTabBar = document.querySelector('.card-tab-line');
        if (!e.target.classList.contains('future')) {
            cardTabBar.style.width = `${e.target.parentElement.offsetWidth}px`;
        }
        // Get Elements
        const tabsContainer = document.querySelector('.transactions-page .card-tabs');
        const futureTab = document.querySelector('.transactions-page .card-tab.nextTab');
        const currTabEle = document.querySelector('.transactions-page .card-tab.currTab');
        // Set The Values
        const end = e.target.dataset.date.split('/')[1];
        const currMonthDate = new Date(end);
        let {prevTab, currTab, nextTab} = this.state;
        // Check on which tab we clicked
        if (e.target.parentElement.classList.contains('prevTab')) {
            // Change the values
            const prevStart = new Date(new Date().setFullYear(currMonthDate.getFullYear(), currMonthDate.getMonth() - 1, 1));
            const prevEnd = new Date(new Date().setFullYear(currMonthDate.getFullYear(), currMonthDate.getMonth(), 0));
            prevTab = <span onClick={this.onClick} data-date={`${prevStart.toISOString()}/${prevEnd.toISOString()}`}>{`${prevStart.toLocaleDateString()}-${prevEnd.toLocaleDateString()}`}</span>;
            currTab = this.state.prevTab;
            nextTab = this.state.currTab;
            if (futureTab.classList.contains('active')) {
                // Remove & Add the active style
                futureTab.classList.remove('active');
                currTabEle.classList.add('active');
            }
            // Move the bar
            cardTabBar.style.left = `${tabsContainer.children[1].offsetLeft + tabsContainer.children[1].offsetWidth}px`;
        } else if (e.target.parentElement.classList.contains('nextTab')) {
            // Change the Values
            const nextStart = new Date(new Date().setFullYear(currMonthDate.getFullYear(), currMonthDate.getMonth() + 1, 1));
            const nextEnd = new Date(new Date().setFullYear(currMonthDate.getFullYear(), currMonthDate.getMonth() + 2, 0));
            nextTab = <span onClick={this.onClick} data-date={`${nextStart.toISOString()}/${nextEnd.toISOString()}`}>{`${nextStart.toLocaleDateString()}-${nextEnd.toLocaleDateString()}`}</span>;
            currTab = this.state.nextTab;
            prevTab = this.state.currTab;
            // Check if the next date is Last Month
            const lastMonthDates = this.state.lastMonth.props['data-date'].split('/');
            const lastMonthDate = new Date(lastMonthDates[1]);
            if (nextEnd.getMonth() === lastMonthDate.getMonth()) {
                nextTab = this.state.lastMonth;
            }
            // Check if we click on the Future or This Month
            if (e.target.classList.contains('future') || e.target.classList.contains('thisMonth')) {
                nextTab = this.state.future;
                currTab = this.state.thisMonth;
                prevTab = this.state.lastMonth;
            } else if (e.target.classList.contains('lastMonth')) {
                nextTab = this.state.thisMonth;
                currTab = this.state.lastMonth;
            }
            // Check if we click on the Future
            if (e.target.classList.contains('future')) {
                if (!e.target.parentElement.classList.contains('active')) {
                    // Remove & Add the active style
                    currTabEle.classList.remove('active');
                    futureTab.classList.add('active');
                    // Move the bar
                    cardTabBar.style.width = `${e.target.parentElement.offsetWidth - 30}px`;
                    cardTabBar.style.left = `${e.target.parentElement.offsetLeft + 15}px`;
                    // Get The Transactions
                    this.props.getTransactions(currMonthDate);
                }
            } else {
                // Move the bar
                cardTabBar.style.left = `${tabsContainer.lastElementChild.offsetLeft - tabsContainer.lastElementChild.offsetWidth}px`;
            }
        } else if (e.target.parentElement.classList.contains('currTab') && !e.target.parentElement.classList.contains('active')) {
            // Remove & Add the active style
            futureTab.classList.remove('active');
            currTabEle.classList.add('active');
            // Move the bar
            cardTabBar.style.left = `${e.target.parentElement.offsetLeft}px`;
            // Get The Transactions
            this.props.getTransactions(currMonthDate);
        }
        // Update the state
        this.setState({
            currMonth: currMonthDate,
            nextTab: nextTab,
            currTab: currTab,
            prevTab: prevTab
        });
        // If we didn't click on the currTab, Get The Transactions
        if (!e.target.parentElement.classList.contains('active')) {
            this.props.getTransactions(currMonthDate);
        }
    }
    render() {
        const {prevTab, currTab, nextTab} = this.state;
        // Check if there are transactions or not
        const transactionsNotExist = this.props.transactions.length === 0 ? true : false;
        // Filterd Transactions
        let transactionsFilterd = [];
        // Inflow & Outflow
        let inflowTotal = 0;
        let outflowTotal = 0;
        // Map through the transactions to reform them
        this.props.transactions.forEach(transaction => {
        // Get the transaction date
        const transactionDate = new Date(new Date().setTime(transaction.date));
        // Get every transaction that has the same date
        const transactionsMatched = this.props.transactions.filter(tran => new Date(new Date().setTime(tran.date)).getDate() === transactionDate.getDate());
        // Get the transaction category
        const transactionCategroy = this.props.categories.find(cat => cat._id === transaction.category);
        // Check for the transaction type & Add the amount to the Outflow and Inflow
        if (transactionCategroy.type === '-') {
            outflowTotal += transaction.amount;
        } else {
            inflowTotal += transaction.amount;
        }
        // Create an empty array to add it to the filterd array
        let newTransactions = [];
        // Initiate the total
        let total = 0;
        // Map through each match and add it to the empty array
        transactionsMatched.forEach(tran => {
            // Get the transaction category
            const tranCategroy = this.props.categories.find(cat => cat._id === tran.category);
            // Check for the transaction type
            if (tranCategroy.type === '-') {
                total -= tran.amount;
            } else {
                total += tran.amount;
            }
            // Push the transaction to the newTransactions array
            newTransactions.push(tran);
        });
        // Check if this date exists or not
        const isExists = transactionsFilterd.find(tran => tran.key === transactionDate.getDate());
        if (!isExists) {
            transactionsFilterd.push({
                key: transactionDate.getDate(),
                total: total,
                date: transactionDate,
                items: newTransactions
            });
        }
        });
        // Sort the transactions by date
        transactionsFilterd.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Total of the month
        const totalMonth = inflowTotal - outflowTotal;
        let totalMonthType = '-';
        if (Math.sign(totalMonth) === 1) {
            totalMonthType = '+';
        }
        return (
            <div className={`card ${this.props.item ? 'card-with-details' : null}`}>
                <div className="card-header">
                    <div className="card-tabs">
                        <div className="card-tab-line"></div>
                        <div className="card-tab prevTab">
                            {prevTab}
                        </div>
                        <div className="card-tab currTab active">
                            {currTab}
                        </div>
                        <div className="card-tab nextTab">
                            {nextTab}
                        </div>
                    </div>
                </div>
                {transactionsNotExist ? (
                    <div className="card-body">
                        <div className="card-no-results">No Transactions</div>
                    </div>
                ) : (
                    <Fragment>
                        <div className="card-stats">
                            <div className="card-state">
                                <span>Inflow</span>
                                <span className="card-state-number income state-inflow">{`+$ ${addComma(inflowTotal.toFixed(2))}`}</span>
                            </div>
                            <div className="card-state">
                                <span>Outflow</span>
                                <span className="card-state-number expense state-outflow">{`-$ ${addComma(outflowTotal.toFixed(2))}`}</span>
                            </div>
                            <div className="card-state card-state-total">
                                <span className="card-state-number state-total">{`${totalMonthType}$ ${addComma(totalMonth.toFixed(2)).replace('-', '')}`}</span>
                            </div>
                        </div>
                        <div className="card-bar"></div>
                        <div className="card-body">
                            {transactionsFilterd.map(transactions => {
                                // Check if this is the last transaction
                                const isLast = transactionsFilterd.lastIndexOf(transactions) === transactionsFilterd.length - 1 ? true : false;
                                // Transactions List Element
                                return (
                                    <Fragment>
                                        <TransactionsList key={transactions.key} categories={this.props.categories} transactions={transactions} />
                                        {isLast ? null : <div className="card-bar"></div>}
                                    </Fragment>
                                );
                            })}
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    transactions: state.transactions.items,
    item: state.transactions.item,
    categories: state.categories.items
});

export default connect(mapStateToProps, {getTransactions})(TransactionCard);
