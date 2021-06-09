import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'

function Alert(props) {
    const {
        msg,
        type,
        clearAlert
    } = props;

    const closeAlert = e => {
        e.target.parentElement.classList.add('fadeOut');
        setTimeout(() => clearAlert(), 200);
    }

    useEffect(() => {
        if (msg !== null) {
            const alertElement = document.querySelector('.alert');
            if (alertElement !== null && alertElement !== undefined) {
                setTimeout(() => {
                    alertElement.classList.add('fadeOut');
                    setTimeout(() => clearAlert(), 200);
                }, 4000);
            }
        }
    }, [msg, clearAlert])

    const alertClassName = `alert--${type}`;
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle'

    return (
        <Fragment>
            {msg !== null && msg !== '' ? (
                    <div className={`alert ${alertClassName}`}>
                        <div className="alert__info">
                            <i className={`alert__icon ${icon}`}></i>
                            <p className="alert__msg">{msg}</p>
                        </div>

                        <svg className="alert__close-btn svg-inline--fa fa-times-circle fa-w-16" onClick={closeAlert} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"/></svg>
                    </div>
            ) : null}
        </Fragment>
    )
}

Alert.propTypes = {
    clearAlert: PropTypes.func
}

export default Alert

