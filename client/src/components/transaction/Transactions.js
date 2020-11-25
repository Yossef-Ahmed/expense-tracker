import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TransactionCard from './TransactionCard';
import TransactionDetails from './TransactionDetails';
import {unloadTransactions} from '../../actions/transactionAction';

export class Transactions extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        unloadTransactions: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/Login');
        }
    }
    componentDidMount() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/Login');
        }
    }
    componentWillUnmount() {
        this.props.unloadTransactions();
    }
    render() {
        return (
            <div className="card-page transactions-page">
                <TransactionCard />
                <TransactionDetails />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {unloadTransactions})(Transactions);