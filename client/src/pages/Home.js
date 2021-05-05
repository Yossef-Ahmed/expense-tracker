import React, { Component } from 'react'

import Benefits from '../components/Home/Benefits'
import Header from '../components/Home/Header'
import EmailVerification from '../components/Home/EmailVerification'

export class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <Header toggleEmailVerification={this.toggleEmailVerification} />
                <Benefits />
                <EmailVerification />
            </div>
        )
    }
}

export default Home
