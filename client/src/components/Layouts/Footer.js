import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <h3>Copyright  &copy; 2020 Youssef Ahmed</h3>
                <ul className="inline-ul">
                    <li className="footer-link">
                        <a href="https://github.com/Yossef-Ahmed" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
