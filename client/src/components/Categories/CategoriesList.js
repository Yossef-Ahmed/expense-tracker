import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {getCategoryDetails} from '../../actions/category/categoryDetails';

export const CategoriesList = (props) => {
    const handleItemClick = e => {
        let id;

        if (e.target.classList.contains('category-icon') || e.target.classList.contains('card__item-name')) {
            id = e.target.parentElement.id;
        } else if (e.target.classList.contains('fas')) {
            id = e.target.parentElement.parentElement.id;
        } else {
            id = e.target.id;
        }

        if (props.component === "select") {
            props.saveValue(props.categories.find(cat => cat._id === id));
        } else {
            props.getCategoryDetails(props.categories.find(cat => cat._id === id));
        }
    }

    return (
        <div className="card__list">
            {props.categoriesList.map(cat => {
                return (
                    <div className="card__item" id={cat._id} onClick={handleItemClick} key={cat._id}>
                        <div className={`category-icon category-icon--big ${cat.type === '-' ? 'expense' : 'income'}`}>
                            <i className={`fas fa-${cat.type === '-' ? 'minus' : 'plus'}`}></i>
                        </div>

                        <div className="card__item-name">{cat.name}</div>
                    </div>
                );
            })}
        </div>
    )
}

CategoriesList.propTypes = {
    getCategoryDetails: PropTypes.func.isRequired,
    saveValue: PropTypes.func,
    component: PropTypes.string,
    categories: PropTypes.array.isRequired,
    categoriesList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    categories: state.categories.items
})

export default connect(mapStateToProps, {getCategoryDetails})(CategoriesList)