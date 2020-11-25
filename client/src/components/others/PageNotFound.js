import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loaded} from '../../actions/loaderActions';

export class PageNotFound extends Component {
    static propTypes = {
        loaded: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired
    }
    componentDidMount() {
        this.props.loaded();
    }
    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.loaded();
        }
    }
    render() {
        return (
            <div className="not-found">
                <h1>404</h1>
                <h3>Page Not Found</h3>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {loaded})(PageNotFound);
