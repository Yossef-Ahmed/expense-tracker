import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

import {createTransaction, updateTransaction} from '../../actions/transactionAction';
import {addComma, clearNumber} from '../../utils/index';

import CategoriesSelect from '../Categories/CategoriesSelect';
import SelectDate from '../Others/SelectDate';

export class TransactionForm extends Component {
    state = {
        modal: false,
        note: '',
        amount: '',
        categoryId: '',
        date: new Date().getTime(),
        valid: false
    }
    static propTypes = {
        formType: PropTypes.string,
        item: PropTypes.object,
        createTransaction: PropTypes.func.isRequired,
        updateTransaction: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired
    }
    componentDidMount() {
        if (this.props.formType === 'Edit') {
            const item = this.props.item;
            this.setState({
                categoryId: item.category,
                amount: item.amount.toString(),
                date: item.date,
                note: item.hasOwnProperty('note') ? item.note : ''
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // Get current state
        const {amount, categoryId, date} = this.state;
        if (prevState.amount !== amount || prevState.categoryId !== categoryId || prevState.date !== date) {
            // Validate the form
            this.validation();
        }
    }
    toggle = () => {
        // Set the state
        this.setState({
            amount: '',
            categoryId: '',
            note: '',
            date: new Date().getTime(),
            modal: !this.state.modal
        });
    }
    inputFocus = e => {
        if (e.target.className === 'form-label') {
            e.target.nextElementSibling.focus();
        } else if (e.target.className === 'form-group') {
            e.target.lastElementChild.focus();
        }
    }
    validation = () => {
        const {categoryId, amount, date} = this.state;
        let valid = false;
        if (amount !== '' && categoryId !== '' && date !== '') {
            const amountNum = parseFloat(amount);
            if (!isNaN(amountNum) && amountNum > 0) {
                valid = true;
            }
        }
        this.setState({valid})
    }
    onChange = e => {
        let val = e.target.value;
        if (e.target.name === 'amount') {
            if (val !== '') {
                // Clear any non numeric characters
                val = clearNumber(val);
                // Check if is a number
                if (!isNaN(parseFloat(val))) {
                    if (!Number.isInteger(parseFloat(val)) || val.search(/\./) > -1) {
                        // Index of the first "."
                        const index = val.indexOf('.');
                        // Remove any "." in the value
                        val = val.replace(/\./g, '');
                        // Our Array Output
                        let valArr = [val.slice(0, index), ".", val.slice(index)]
                        // Remove any number after 2 numbers of the "."
                        if (valArr[2].length > 2) {
                            valArr[2] = valArr[2].slice(0, 2);
                        }
                        // Make the first number valid number
                        valArr[0] = parseFloat(valArr[0]).toString();
                        // Join the array
                        val = valArr.join('');
                    } else {
                        // Make the value a valid number
                        val = parseFloat(val).toString();
                    }
                }
            }
        }
        // Change the input value
        this.setState({[e.target.name]: val});
    }
    saveValue = (name, val) => {
        // Set the value
        this.setState({[name]: val});
        this.validation();
    }
    saveTransaction = () => {
        // Get the values
        const {categoryId, amount, date, note} = this.state;
        // Save the transaction
        if (this.props.formType === 'Edit') {
            // Get the transaction
            const transaction = this.props.item;
            // Update it's values
            transaction.categoryId = categoryId;
            transaction.amount = amount;
            transaction.date = date;
            transaction.note = note;
            // Send it to the database
            this.props.updateTransaction(transaction);
            // Close the modal
            this.toggleEditForm();
        } else {
            this.props.createTransaction({
                categoryId,
                amount,
                date,
                note
            });
            // Close the modal
            this.toggle();
        }
    }
    toggleEditForm = () => {
        this.setState({modal: !this.state.modal});
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('modal-container') && e.target.dataset.modal === "TransactionsForm") {
            if (this.props.formType === 'Edit') {
                this.toggleEditForm();
            } else {
                this.toggle();
            }
        }
    }
    render() {
        const {valid, amount, note, categoryId, date, modal} = this.state;
        const isEdit = this.props.formType === 'Edit' ? true : false;
        const category = isEdit ? this.props.categories.find(cat => cat._id === categoryId) : null;
        return (
            <Fragment>
                {isEdit ? (
                    this.props.screen === "Mobile" ? (
                        <button className="btn btn-secondary" onClick={this.toggleEditForm}>Edit</button>
                    ) : (
                        <button className="card-btn card-btn-success" onClick={this.toggleEditForm}>Edit</button>
                    )
                ) : (
                    <button className="nav-link btn btn-success" onClick={this.toggle}>Add Transaction</button>
                ) }
                <CSSTransition in={modal} timeout={400} unmountOnExit classNames="modal-fade">
                        <div className="modal-container" onClick={this.handleClickOutside} data-modal="TransactionsForm">
                            <div className="modal modal-with-form">
                                <div className="modal-header">
                                    <h3>{`${isEdit ? 'Edit' : 'Add'} Transaction`}</h3>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-form">
                                        <div className="modal-form-row">
                                            <CategoriesSelect saveValue={this.saveValue} category={isEdit ? category : null} />
                                            <div className="form-group" onClick={this.inputFocus}>
                                                <p className="form-label">Amount</p>
                                                <input
                                                    type="text"
                                                    name="amount"
                                                    id="amount"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    value={amount !== '' ?
                                                        !Number.isInteger(parseFloat(amount)) || amount.search(/\./) > -1 ? addComma(amount) : addComma(amount, false)
                                                    : ''}
                                                    onChange={this.onChange}
                                                />
                                                {amount === '' ? (
                                                    <span className="form-amount-value">0</span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="modal-form-row">
                                            <SelectDate saveValue={this.saveValue} date={isEdit ? date : null} />
                                            <div className="form-group" onClick={this.inputFocus}>
                                                <p className="form-label">Note</p>
                                                <input
                                                    type="text"
                                                    name="note"
                                                    id="note"
                                                    className="form-control"
                                                    placeholder="Note"
                                                    onChange={this.onChange}
                                                    value={note}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-buttons">
                                        <button className="btn btn-secondary" onClick={isEdit ? this.toggleEditForm : this.toggle}>Cancel</button>
                                        {valid
                                            ? <button className='btn btn-success' onClick={this.saveTransaction}>Save</button>
                                            : <button className='btn btn-success btn-disabled' disabled='disabled'>Save</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    item: state.transactions.item,
    categories: state.categories.items
});

export default connect(mapStateToProps, {createTransaction, updateTransaction})(TransactionForm);