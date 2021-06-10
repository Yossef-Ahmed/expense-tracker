import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const Loader = (props) => {
    return (
        <Fragment>
            {props.isLoading ? (
                <div className="loader-container">
                    <div className="loader">
                        <div className="loader-bar"></div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    )
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isLoading: state.loader.isLoading
})

export default connect(mapStateToProps, null)(Loader)
