import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CategoriesList from './CategoriesList';
import {NavLink} from 'react-router-dom';

export class CategoriesCard extends Component {
    state = {
        catsType: '-',
        searchResult: null
    }
    static propTypes = {
        categories: PropTypes.array.isRequired,
        component: PropTypes.string,
        item: PropTypes.object
    }
    componentDidMount() {
        // Set the postion of the card tab line to the active tab
        document.querySelector('.card-tab-line').style.left = `${document.querySelector('.card-tab.active').offsetLeft}px`;
    }
    onClick = e => {
        // Check if it's already clicked
        if (!e.target.parentElement.classList.contains('active')) {
            // Remove & Add the style
            document.querySelectorAll('.card-tabs .card-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.parentElement.classList.add('active');
            // Move the bar
            document.querySelector('.card-tab-line').style.left = `${e.target.offsetLeft}px`;
            // Filter the categories
            this.setState({catsType: e.target.dataset.type});
        }
    }
    search = e => {
        // Initiate the Searched Categories
        let searchedCategories = [];
        // Loop through the categories and search
        this.props.categories.forEach(cat => {
            if (cat.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                searchedCategories.push(cat);
            }
        });
        // Set The Searched Categories
        this.setState({searchResult: searchedCategories});
    }
    render() {
        const isSelect = this.props.component === "select" ? "select" : "normal";
        let categories = this.state.searchResult === null ? this.props.categories : this.state.searchResult;
        categories = categories.filter(cat => cat.type === this.state.catsType);
        return (
            <div className={`card ${this.props.item ? 'card-with-details' : ''}`}>
                <div className="card-search-container">
                    <div className="card-search">
                        <i className="fas fa-search"></i>
                        <input type="text" name="search" placeholder="Search" onChange={this.search} />
                    </div>
                </div>
                <div className="card-header">
                    <div className="card-tabs">
                        <div className="card-tab-line"></div>
                        <div className="card-tab prevTab active">
                            <span onClick={this.onClick} data-type='-'>Expense</span>
                        </div>
                        <div className="card-tab nextTab">
                            <span onClick={this.onClick} data-type='+'>Income</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {categories.length === 0 ? (
                        <div className="card-no-results">
                            <p>You've No Categories of That Type</p>
                            {isSelect === 'select' ? (
                                <NavLink to="/categories">Categories Page</NavLink>
                            ) : null}
                        </div>
                    ) : (
                        <CategoriesList categoriesList={categories} component={isSelect} saveValue={isSelect ? this.props.saveValue : null} />
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items,
    item: state.categories.item
});

export default connect(mapStateToProps, null)(CategoriesCard);
