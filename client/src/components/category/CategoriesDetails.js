import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {closeDetailsCard, deleteCategory} from '../../actions/categoryActions';
import {openConfirm} from '../../actions/confirmActions';
import CategoriesForm from './CategoriesForm';

export class CategoriesDetails extends Component {
    static propTypes = {
        deleteCategory: PropTypes.func.isRequired,
        closeDetailsCard: PropTypes.func.isRequired,
        openConfirm: PropTypes.func.isRequired,
        item: PropTypes.object,
        confirm: PropTypes.bool.isRequired
    }
    componentDidUpdate() {
        if (this.props.confirm) {
            document.querySelector('.details-modal-container').classList.add('fadeOut');
            setTimeout(() => this.props.deleteCategory(this.props.item._id), 200);
        }
    }
    closeOnClick = e => {
        if (window.matchMedia('screen and (max-width: 600px)').matches) {
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('fadeOut');
            setTimeout(() => this.props.closeDetailsCard(), 200);
        } else {
            this.props.closeDetailsCard();
        }
    }
    deleteOnClick = e => {
        this.props.openConfirm();
    }
    handleClickOutside = e => {
        if (e.target.classList.contains('details-modal-container')) {
            if (window.matchMedia('screen and (max-width: 600px)').matches) {
                e.target.classList.add('fadeOut');
                setTimeout(() => this.props.closeDetailsCard(), 200);
            } 
        }
    }
    render() {
        const category = this.props.item;
        // Check if it's a mobile screen
        const isMobile = window.matchMedia('screen and (max-width: 600px)').matches ? true : false;
        if (category) {
            const categoryType = category.type === '-' ? 'expense' : 'income';
            return (
                <div className="details-modal-container" onClick={isMobile ? this.handleClickOutside : null}>
                    <div className="details-modal">
                        <div className="card-container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-close">
                                        <i onClick={this.closeOnClick} className="fas fa-times"></i>
                                    </div>
                                    <span className="card-title">Category details</span>
                                    <div className="card-buttons">
                                        <button className="card-btn card-btn-danger" onClick={this.deleteOnClick}>Delete</button>
                                        <CategoriesForm formType="Edit" />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="card-row">
                                        <div className={`card-icon ${categoryType}`}>
                                            <i className={`fas fa-${category.type === '-' ? 'minus' : 'plus'}`}></i>
                                        </div>
                                        <div className="card-info">
                                            <h3>{category.name}</h3>
                                            <span className={`card-info-tag ${categoryType}`}>{categoryType}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-buttons details-modal-buttons">
                                    <button className="btn btn-secondary-red" onClick={this.deleteOnClick}>Delete</button>
                                    <CategoriesForm formType="Edit" screen="Mobile" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Fragment></Fragment>;
        }
    }
}

const mapStateToProps = state => ({
    item: state.categories.item,
    confirm: state.confirm.answer
});

export default connect(mapStateToProps, {closeDetailsCard, deleteCategory, openConfirm})(CategoriesDetails);