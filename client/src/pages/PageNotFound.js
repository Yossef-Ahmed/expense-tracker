import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {loaded} from '../actions/loaderActions';

export const PageNotFound = (props) => {
    const {
        loaded,
        isAuthenticated
    } = props;
    useEffect(() => {
        loaded();
    }, [loaded]);

    useEffect(() => {
        if (isAuthenticated) {
            loaded();
        }
    }, [isAuthenticated, loaded])

    return (
        <div className="not-found">
            <h1>404</h1>
            <h3>Page Not Found</h3>
        </div>
    )
}

PageNotFound.propTypes = {
    loaded: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    loaded
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound)
