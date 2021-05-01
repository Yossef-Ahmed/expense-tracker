import React, { Component } from 'react'

import GoogleLogo from '../../images/google.png'

export class GoogleBtn extends Component {
    render() {
        return (
            <div className="google-btn">
                <div className="google-btn__image">
                    <img src={GoogleLogo} alt="Google Logo"/>
                </div>
                <span className="google-btn__text">Sign Up With Google</span>
            </div>
        )
    }
}

export default GoogleBtn
