import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCategory} from '../../actions/categoryActions';

export class CategoriesList extends Component {
    static propTypes = {
        getCategory: PropTypes.func.isRequired,
        saveValue: PropTypes.func,
        component: PropTypes.string,
        categories: PropTypes.array.isRequired,
        categoriesList: PropTypes.array.isRequired
    }
    onClick = e => {
        let id;
        if (e.target.classList.contains('card-item-icon') || e.target.classList.contains('card-item-name')) {
            id = e.target.parentElement.id;
        } else if (e.target.classList.contains('fas')) {
            id = e.target.parentElement.parentElement.id;
        } else {
            id = e.target.id;
        }
        if (this.props.component === "select") {
            this.props.saveValue(this.props.categories.find(cat => cat._id === id));
        } else {
            this.props.getCategory(this.props.categories.find(cat => cat._id === id));
        }
    }
    render() {
        const categories = this.props.categoriesList;
        return (
            <div className="card-list">
                {categories.map(cat => {
                    return (
                        <div className="card-item" id={cat._id} onClick={this.onClick} key={cat._id}>
                            <div className={`card-item-icon ${cat.type === '-' ? 'expense' : 'income'}`}>
                                <i className={`fas fa-${cat.type === '-' ? 'minus' : 'plus'}`}></i>
                            </div>
                            <div className="card-item-name">{cat.name}</div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items
});

export default connect(mapStateToProps, {getCategory})(CategoriesList);
