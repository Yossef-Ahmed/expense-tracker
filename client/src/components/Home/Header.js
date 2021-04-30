import React, { Component } from 'react'

import HeaderImage from '../../images/Header.png'

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__data">
                    <h1 className="header__title">Manage Your Incomes and Outcomes</h1>
                    <p className="header__description">The simplest way to record your daily transactions. And discover where your money goes.</p>
                    <button className="btn btn--green">Sign Up</button>
                </div>
                <img src={HeaderImage} alt="Header" className="header__img"/>
            </header>
        )
    }
}

export default Header
