import React, { Component, Fragment } from 'react';
import CategoriesCard from './CategoriesCard';
import {CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';
import InputField from '../Reuseable/InputField';

export class CategoriesSelect extends Component {
    state = {
        modal: false,
        category: null
    }
    static propTypes = {
        saveValue: PropTypes.func.isRequired,
        category: PropTypes.object
    }
    componentDidMount() {
        if (this.props.category) {
            this.setState({category: this.props.category});
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    saveValue = (cat) => {
        this.setState({category: cat});
        this.props.saveValue('categoryId', cat._id);
        this.toggle();
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('modal-container')) {
            this.toggle();
        }
    }
    render() {
        const cat = this.state.category;
        return (
            <Fragment>
                <InputField label="Category" noInput={true} onClick={this.toggle} >
                    <div className="input-field__input">
                        {cat ? (
                            <Fragment>
                                <div className={`category-icon ${cat.type === '-' ? 'expense' : 'income'}`}>
                                    <i className={`fas fa-${cat.type === '-' ? 'minus' : 'plus'}`}></i>
                                </div>
                                {cat.name}
                            </Fragment>
                        ) : "Select Category"}
                    </div>
                </InputField>

                <CSSTransition in={this.state.modal} timeout={400} unmountOnExit classNames="modal-fade">
                    <div className="modal-container" onClick={this.handleClickOutside}>
                        <div className="modal modal-select">
                            <div className="modal-header">
                                <div className="modal-close">
                                    <i onClick={this.toggle} className="fas fa-times"></i>
                                </div>
                                <h3>Select Category</h3>
                            </div>
                            <div className="modal-body">
                                <CategoriesCard component={"select"} saveValue={this.saveValue} />
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </Fragment>
        )
    }
}

export default CategoriesSelect;
