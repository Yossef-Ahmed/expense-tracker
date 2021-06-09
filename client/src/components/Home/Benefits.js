import React from 'react'

import Benefit1 from '../../images/Benefits/Benefit 1.png'
import Benefit2 from '../../images/Benefits/Benefit 2.png'
import Benefit3 from '../../images/Benefits/Benefit 3.png'

const Benefits = () => {
    return (
        <div className="benefits">
            <div className="benefit">
                <img src={Benefit1} alt="Cash Register" className="benefit__icon"></img>
                <h3 className="benefit__text">Have A Clear Picture Of Where Your Money Went</h3>
            </div>

            <div className="benefit">
                <img src={Benefit2} alt="Reports" className="benefit__icon"></img>
                <h3 className="benefit__text">Discover Your Spending Habits With Reports</h3>
            </div>

            <div className="benefit">
                <img src={Benefit3} alt="Wallet" className="benefit__icon"></img>
                <h3 className="benefit__text">Easily Record Your Daily Transactions</h3>
            </div>
        </div>
    )
}

export default Benefits