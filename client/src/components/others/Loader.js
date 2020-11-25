import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Loader extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired
    }
    render() {
        return (
            <Fragment>
                {this.props.isLoading ? (
                    <div className="loader-container">
                        <div className="loader">
                            <div className="loader-bar"></div>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.loader.isLoading
});

export default connect(mapStateToProps, null)(Loader);
