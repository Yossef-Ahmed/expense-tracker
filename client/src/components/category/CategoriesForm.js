import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createCategory, updateCategory} from '../../actions/categoryActions';
import {CSSTransition} from 'react-transition-group';

export class CategoriesForm extends Component {
    state = {
        modal: false,
        type: '+',
        name: '',
        valid: false
    }
    static propTypes = {
        formType: PropTypes.string,
        item: PropTypes.object,
        createCategory: PropTypes.func.isRequired,
        updateCategory: PropTypes.func.isRequired
    }
    componentDidMount() {
        if (this.props.formType === 'Edit') {
            const item = this.props.item;
            this.setState({
                name: item.name,
                type: item.type
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // Get current state
        const {type, name} = this.state;
        if (prevState.name !== name || prevState.type !== type) {
            // Validate the form
            this.validation();
        }
    }
    inputFocus = e => {
        if (e.target.className === 'form-label') {
            e.target.nextElementSibling.focus();
        } else if (e.target.className === 'form-group') {
            e.target.lastElementChild.focus();
        }
    }
    onChange = e => {
        // Change the input value
        this.setState({[e.target.name]: e.target.value});
    }
    toggle = () => {
        this.setState({
            name: '',
            type: '+',
            modal: !this.state.modal
        });
    }
    toggleEditForm = () => {
        this.setState({modal: !this.state.modal});
    }
    choose = e => {
        // Initiate Variables
        let chooseBtn = e.target;
        // Check the clicked button
        if (chooseBtn.classList.contains('choose-icon') || chooseBtn.classList.contains('choose-text')) {
            chooseBtn = chooseBtn.parentElement;
        } else if (chooseBtn.tagName === 'SPAN') {
            chooseBtn = chooseBtn.parentElement.parentElement;
        }
        // Save the value to state
        this.setState({type: chooseBtn.dataset.type});
    }
    validation = () => {
        const {name, type} = this.state;
        let valid = false;
        if (name !== '' && type !== '') {
            valid = true;
        }
        this.setState({valid})
    }
    saveCategory = () => {
        // Get the values
        const {name, type} = this.state;
        // Save the category
        if (this.props.formType === 'Edit') {
            // Get the category
            const category = this.props.item;
            // Update it's values
            category.name = name;
            category.type = type;
            // Send it to the database
            this.props.updateCategory(category);
            // Close the modal
            this.toggleEditForm();
        } else {
            this.props.createCategory({
                name,
                type
            });
            // Close the modal
            this.toggle();
        }
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('modal-container')) {
            if (this.props.formType === 'Edit') {
                this.toggleEditForm();
            } else {
                this.toggle();
            }
        }
    }
    render() {
        const {valid, type, name, modal} = this.state;
        const isEdit = this.props.formType === 'Edit' ? true : false;
        return (
            <Fragment>
                {isEdit ? (
                    this.props.screen === "Mobile" ? (
                        <button className="btn btn-secondary" onClick={this.toggleEditForm}>Edit</button>
                    ) : (
                        <button className="card-btn card-btn-success" onClick={this.toggleEditForm}>Edit</button>
                    )
                ) : (
                    <button className="nav-link btn btn-success" onClick={this.toggle}>Add Category</button>
                ) }
                <CSSTransition in={modal} timeout={400} unmountOnExit classNames="modal-fade">
                    <div className="modal-container" onClick={this.handleClickOutside}>
                        <div className="modal modal-with-form modal-category">
                            <div className="modal-header">
                                <h3>{`${isEdit ? 'Edit' : 'Add'} Category`}</h3>
                            </div>
                            <div className="modal-body">
                                <div className="modal-form">
                                    <div className="modal-form-row">
                                        <div className="form-choose" onClick={this.choose} data-type="+">
                                            <div className={`choose-icon ${type === "+" ? "active" : ""}`}>
                                                <span></span>
                                            </div>
                                            <span className="choose-text">Income</span>
                                        </div>
                                        <div className="form-choose" onClick={this.choose} data-type="-">
                                            <div className={`choose-icon ${type === "-" ? "active" : ""}`}>
                                                <span></span>
                                            </div>
                                            <span className="choose-text">Expense</span>
                                        </div>
                                    </div>
                                    <div className="modal-form-row">
                                        <div className="form-group" onClick={this.inputFocus}>
                                            <p className="form-label">Category Name</p>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                placeholder="Category Name"
                                                onChange={this.onChange}
                                                value={name}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button className="btn btn-secondary" onClick={isEdit ? this.toggleEditForm : this.toggle}>Cancel</button>
                                {valid
                                    ? <button className='btn btn-success' onClick={this.saveCategory}>Save</button>
                                    : <button className='btn btn-success btn-disabled' disabled='disabled'>Save</button>
                                }
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    item: state.categories.item
});

export default connect(mapStateToProps, {createCategory, updateCategory})(CategoriesForm);