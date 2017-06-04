import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, Redirect, NavLink } from 'react-router-dom';
import '../App.css';

export default class Register extends Component {
    newUserData() {
        this.props.setUserName([
            this.refs.username.value,
            this.refs.email.value,
            this.refs.password.value,
            this.refs.city.value,
            this.refs.student_age.value
        ]);
    }

    render() {
        return (
            <div>
                <div>
                    <p>username</p>
                    <p><input type="text" ref="username" required /></p>
                    <p>email</p>
                    <p><input type="email" ref="email" required /></p>
                    <p>password</p>
                    <p><input type="password" ref="password" required /></p>
                    <p>city</p>
                    <p><input type="text" ref="city" required /></p>
                    <p>primary language</p>
                    <p><select ref="language">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                    </select></p>
                    <p>student age</p>
                    <p><input type="number" ref="student_age" required /></p>
                    <p><NavLink to="/">Already have an account? Login!</NavLink></p>
                    <button onClick={() => this.newUserData()}>Create Account</button>
                </div>
            </div>
        );
    }
}