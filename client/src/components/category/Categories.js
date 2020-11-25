import React, { Component } from 'react';
import CategoriesCard from './CategoriesCard';
import CategoriesDetails from './CategoriesDetails';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {unloadCategories} from '../../actions/categoryActions';

export class Categories extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        unloadCategories: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/Login');
        }
    }
    componentDidMount() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/Login');
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