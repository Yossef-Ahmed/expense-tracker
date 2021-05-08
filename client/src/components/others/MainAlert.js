import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {clearMainAlert} from '../../actions/mainAlertActions';
import Alert from '../Reuseable/Alert';

export class MainAlert extends Component {
    static propTypes = {
        clearMainAlert: PropTypes.func
    }

    render() {
        const {msg, type} = this.props.alert;

        return (
            <div className="alert-container">
                <Alert msg={msg} type={type} clearAlert={this.props.clearMainAlert} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    alert: state.mainAlert
})

export default connect(mapStateToProps, {clearMainAlert})(MainAlert);
