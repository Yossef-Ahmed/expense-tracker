import React from 'react'

function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__copyright">Designed &amp; Developed by Youssef Ahmed 2020</h3>
            <ul className="footer__links">
                <li className="footer__link">
                    <a href="https://youssef-ahmed.herokuapp.com/" target="_blank" rel="noopener noreferrer">
                        Portfolio
                    </a>
                </li>
                <li className="footer__link">
                    <a href="https://github.com/Yossef-Ahmed/expense-tracker" target="_blank" rel="noopener noreferrer">
                        Code
                    </a>
                </li>
                <li className="footer__link">
                    <a href="https://www.upwork.com/freelancers/~01308eb52705e89d58" target="_blank" rel="noopener noreferrer">
                        Upwork
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
