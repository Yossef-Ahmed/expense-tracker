import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {unloadTransactions} from '../actions/transaction/unloadTransactions';

import TransactionCard from '../components/Transactions/TransactionCard';
import TransactionDetails from '../components/Transactions/TransactionDetails';

export const Transactions = (props) => {
    useEffect(() => {
        return () => props.unloadTransactions();
    });

    useEffect(() => {
        if(!props.isAuthenticated) {
            props.history.push('/');
        }
    }, [props.isAuthenticated, props.history]);

    return (
        <div className="card-page">
            <TransactionCard />
            <TransactionDetails />
        </div>
    )
}

Transactions.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    unloadTransactions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {unloadTransactions})(Transactions)
