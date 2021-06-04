import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CategoriesList from './CategoriesList';

export const CategoriesCard = (props) => {
    const [catsType, setCatsType] = useState('-');
    const [searchResult, setSearchResult] = useState(null);

    const searchCategories = e => {
        if (e.target.value !== '') {
            let results = [];

            props.categories.forEach(cat => {
                if (cat.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                    results.push(cat);
                }
            });

            setSearchResult(results);
        } else {
            setSearchResult(null);
        }
    }

    useEffect(() => {
        document.querySelector('.card__tab-line').style.left = `${document.querySelector('.card__tab.active').offsetLeft}px`;
    });

    const isSelect = props.component === "select" ? "select" : "normal";
    let categories = searchResult === null ? props.categories : searchResult;
    categories = categories.filter(cat => cat.type === catsType);

    const changeCatsType = e => {
        if (!e.target.parentElement.classList.contains('active')) {
            document.querySelectorAll('.card__tabs .card__tab').forEach(tab => {
                tab.classList.remove('active');
            });

            e.target.parentElement.classList.add('active');
            document.querySelector('.card__tab-line').style.left = `${e.target.offsetLeft}px`;

            setCatsType(e.target.dataset.type);
        }
    }

    return (
        <div className="card">
            <div className="card__search-container">
                <div className="card__search">
                    <i className="fas fa-search"></i>
                    <input type="text" name="search" placeholder="Search" onChange={searchCategories} />
                </div>
            </div>

            <div className="card__header">
                <div className="card__tabs">
                    <div className="card__tab-line"></div>
                    <div className="card__tab prevTab active">
                        <span onClick={changeCatsType} data-type='-'>Expense</span>
                    </div>
                    <div className="card__tab nextTab">
                        <span onClick={changeCatsType} data-type='+'>Income</span>
                    </div>
                </div>
            </div>

            <div className="card__body">
                {categories.length === 0 ? (
                    <div className="card__no-results">
                        <i className="far fa-smile card__no-results__icon"></i>
                        <p>No categories found, please add some.</p>
                    </div>
                ) : (
                    <CategoriesList categoriesList={categories} component={isSelect} saveValue={isSelect ? props.saveValue : null} />
                )}
            </div>
        </div>
    )
}

CategoriesCard.propTypes = {
    categories: PropTypes.array.isRequired,
    saveValue: PropTypes.func,
    component: PropTypes.string,
    item: PropTypes.object
}

const mapStateToProps = (state) => ({
    categories: state.categories.items,
    item: state.categories.item
})

export default connect(mapStateToProps, null)(CategoriesCard)
