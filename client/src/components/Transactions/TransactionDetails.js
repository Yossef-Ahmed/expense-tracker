import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TransactionForm from './TransactionForm';
import {closeDetailsCard, deleteTransaction} from '../../actions/transactionAction';
import {openConfirm} from '../../actions/confirmActions';
import {addComma, getDayName, formatDate} from '../../utils/index';

export class TransactionDetails extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        confirm: PropTypes.bool.isRequired,
        item: PropTypes.object
    }
    componentDidUpdate() {
        if (this.props.confirm) {
            document.querySelector('.details-modal-container').classList.add('fadeOut');
            setTimeout(() => this.props.deleteTransaction(this.props.item._id), 200);
        }
    }
    closeOnClick = e => {
        if (e.target.tagName === "I") {
            if (window.matchMedia('screen and (max-width: 800px)').matches) {
                e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('fadeOut');
                setTimeout(() => this.props.closeDetailsCard(), 200);
            } else {
                this.props.closeDetailsCard();
            }
        }
    }
    deleteOnClick = e => {
        this.props.openConfirm();
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('details-modal-container')) {
            if (window.matchMedia('screen and (max-width: 800px)').matches) {
                e.target.classList.add('fadeOut');
                setTimeout(() => this.props.closeDetailsCard(), 200);
            } 
        }
    }
    render() {
        const {item, categories} = this.props;
        if (item) {
            // Get the category
            const category = categories.find(cat => cat._id === item.category);
            // Check if it is expense or income
            const categoryType = category.type === '-' ? 'expense' : 'income';
            // Get the date
            const date = new Date(parseInt(item.date));
            // Check if it's a mobile screen
            const isMobile = window.matchMedia('screen and (max-width: 800px)').matches ? true : false;
            return (
                <div className="details-modal-container" onClick={isMobile ? this.handleClickOutside : null}>
                    <div className="details-modal">
                        <div className="card-container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-close">
                                        <i onClick={this.closeOnClick} className="fas fa-times"></i>
                                    </div>
                                    <span className="card-title">Transaction details</span>
                                    <div className="card-buttons">
                                        <button className="card-btn card-btn-danger" onClick={this.deleteOnClick}>Delete</button>
                                        <TransactionForm formType="Edit" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="card-row">
                                        <div className={`card-icon ${categoryType}`}>
                                            <i className={`fas fa-${category.type === '-' ? 'minus' : 'plus'}`}></i>
                                        </div>
                                        <div className="card-info">
                                            <h3>{category.name}</h3>
                                            <span className="card-info-date">{`${getDayName(date.getDay())}, ${formatDate(date)}`}</span>
                                            <p className="card-info-note">{item.note}</p>
                                        </div>
                                    </div>
                                    <div className={`card-amount ${categoryType}`}>
                                        <span>{`${category.type}$ ${addComma(item.amount.toFixed(2))}`}</span>
                                    </div>
                                </div>
                                <div className="modal-buttons details-modal-buttons">
                                    <button className="btn btn-secondary-red" onClick={this.deleteOnClick}>Delete</button>
                                    <TransactionForm formType="Edit" screen="Mobile" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Fragment></Fragment>;
        }
    }
}

const mapStateToProps = state => ({
    item: state.transactions.item,
    categories: state.categories.items,
    confirm: state.confirm.answer
});

export default connect(mapStateToProps, {closeDetailsCard, deleteTransaction, openConfirm})(TransactionDetails);