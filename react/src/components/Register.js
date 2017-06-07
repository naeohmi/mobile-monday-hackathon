import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default class Register extends Component {
    getTimeZone(data) {
        //console.log(data)
        axios.get("https://maps.googleapis.com/maps/api/timezone/json?location=" + data.lat + "," + data.lng + "&timestamp=1331161200&key=AIzaSyDr2zhJhO3pmLbUhLtsEQ10UBmc1hLn5C0")
            .then((data) => {
                //console.log(data.data.timeZoneName)
                let timeZone = data.data.timeZoneName;
                this.newUserData(timeZone);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getLongitutdeLatitude(city) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyAqtpXVXzMwCZsCM2UzemTXXj4HvvzJwVc")
            .then((data) => {
                //console.log(data.data.results[0].geometry.location)
                let location = data.data.results[0].geometry.location;
                this.getTimeZone(location);
            }).catch((error) => {
                console.log(error);
            });
    }

    newUserData(timeZoneData) {
        console.log(timeZoneData);
        this.props.setUserName([
            this.refs.username.value,
            this.refs.email.value,
            this.refs.city.value,
            this.refs.primaryLanguage.value,
            this.refs.password.value,
            timeZoneData,
            this.refs.studentAge.value
        ]);
    }

    render() {
        return (
            <div>
                <div>
                    <center><br/><p>username</p>
                    <p><input type="text" ref="username" /></p>
                    <p>email</p>
                    <p><input type="email" ref="email" /></p>
                    <p>password</p>
                    <p><input type="password" ref="password" /></p>
                    <p>city</p>
                    <p><input type="text" ref="city" /></p>
                    <p>primary language</p>
                    <p><select ref="primaryLanguage">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                    </select></p>
                    <p>student age</p>
                    <p><input type="number" ref="studentAge" /></p>
                    <p><NavLink to="/">Already have an account? Login!</NavLink></p>
                    <button onClick={() => this.getLongitutdeLatitude(this.refs.city.value)}>Create Account</button></center>
                </div>
            </div>
        );
    }
}