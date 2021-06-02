import React, { Component } from 'react';
import CategoriesCard from '../components/Categories/CategoriesCard';
import CategoriesDetails from '../components/Categories/CategoriesDetails';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {unloadCategories} from '../actions/categoryActions';

export class Categories extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        unloadCategories: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }
    componentWillUnmount() {
        this.props.unloadCategories();
    }
    render() {
        return (
            <div className="card-page categories-page">
                <CategoriesCard />
                <CategoriesDetails />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {unloadCategories})(Categories);