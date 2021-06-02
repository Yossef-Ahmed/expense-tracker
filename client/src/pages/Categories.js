import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {closeCategoryDetails} from '../actions/category/categoryDetails';

import CategoriesCard from '../components/Categories/CategoriesCard';
import CategoriesDetails from '../components/Categories/CategoriesDetails';

export const Categories = (props) => {
    useEffect(() => {
        if(!props.isAuthenticated) {
            props.history.push('/');
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        return () => props.closeCategoryDetails();
    });

    return (
        <div className="card-page">
            <CategoriesCard />
            <CategoriesDetails />
        </div>
    )
}

Categories.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    closeCategoryDetails: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {closeCategoryDetails})(Categories)
