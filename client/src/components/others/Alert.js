import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearAlert} from '../../actions/alertActions';

export class Alert extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.alert.msg !== null) {
            const alertEle = document.querySelector('.alert');
            if (alertEle !== null && alertEle !== undefined) {
                setTimeout(() => {
                    alertEle.classList.add('fadeOut');
                    setTimeout(() => this.props.clearAlert(), 200);
                }, 3000);
            }
        }
    }
    static propTypes = {
        alert: PropTypes.object.isRequired,
        clearAlert: PropTypes.func.isRequired
    }
    onClick = e => {
        if (e.target.tagName === 'SPAN') {
            e.target.parentElement.classList.add('fadeOut');
            setTimeout(() => this.props.clearAlert(), 200);
        }
    }
    render() {
        const {msg, status, className} = this.props.alert;
        const fullClassName = `alert alert-${className}`;
        return (
            <Fragment>
                {msg !== null ? (
                    <div className="alert-container">
                        <div className={fullClassName}>
                            <strong>{status}</strong> {msg}
                            <span className="alert-close" onClick={this.onClick}>&times;</span>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(mapStateToProps, {clearAlert})(Alert);
