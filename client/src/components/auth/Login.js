import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';

export class Login extends Component {
    state = {
        loading: false,
        msg: null,
        email: '',
        password: ''
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        login: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps) {
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            this.props.history.push('/');
        }
    }
    inputFocus = e => {
        if (e.target.className === 'form-label') {
            e.target.nextElementSibling.focus();
        }
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = e => {
        e.preventDefault();
        // Get the values
        const {email, password} = this.state;
        // User Object
        const user = {
            email,
            password
        }
        // Attempt ro register
        this.props.login(user);
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form-header">
                    <h2 className="form-title">Login</h2>
                </div>
                <div className="form-body">
                    <div className="form-group" onClick={this.inputFocus}>
                        <p className="form-label">Email</p>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group" onClick={this.inputFocus}>
                        <p className="form-label">Password</p>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-block btn-block btn-primary">Login</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
