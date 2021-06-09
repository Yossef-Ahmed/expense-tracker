import React from 'react'
import Benefits from '../components/Home/Benefits'
import Header from '../components/Home/Header'
import EmailVerification from '../components/Home/EmailVerification'

function Home() {
    return (
        <div className="home-page">
            <Header />
            <Benefits />
            <EmailVerification />
        </div>
    )
}

export default Home
