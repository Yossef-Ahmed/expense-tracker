import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {closeTransactionDetails} from '../actions/transaction/transactionDetails';

import TransactionCard from '../components/Transactions/TransactionCard';
import TransactionDetails from '../components/Transactions/TransactionDetails';

export const Transactions = (props) => {
    useEffect(() => {
        return () => props.closeTransactionDetails();
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
    closeTransactionDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {closeTransactionDetails})(Transactions)
