import React, { Component } from 'react'

import Benefits from '../components/Home/Benefits'
import Header from '../components/Home/Header'

export class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <Header />
                <Benefits />
            </div>
        )
    }
}

export default Home
