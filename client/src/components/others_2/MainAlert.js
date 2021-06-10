import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {clearMainAlert} from '../../actions/mainAlertActions';

import Alert from '../Reuseable/Alert';

export const MainAlert = (props) => {
    const {msg, type} = props.alert;

    return (
        <div className="alert-container">
            <Alert msg={msg} type={type} clearAlert={props.clearMainAlert} />
        </div>
    )
}

MainAlert.propTypes = {
    clearMainAlert: PropTypes.func
}

const mapStateToProps = (state) => ({
    alert: state.mainAlert
})

const mapDispatchToProps = {
    clearMainAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAlert)
