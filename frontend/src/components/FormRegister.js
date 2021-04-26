import React, {Component} from 'react';
import $ from 'jquery';

import '../stylesheets/FormRegister.module.css';
import {Redirect} from "react-router-dom";

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            repeat_password: "",
            redirect: false
        }
    }

    register = (event) => {
        event.preventDefault();
        $.ajax({
            url: '/register',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                repeat_password: this.state.repeat_password
            }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
                return;
            },
            error: (error) => {
                document.getElementById("register-form").reset();
                alert(error.responseJSON.message)
                return;
            }
        })

        this.setState({redirect: true})
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'} />
        }

        return (
            <div id="add-form">
                <h2>Register</h2>
                <form className="form-view" id="register-form" onSubmit={this.register}>
                    <label>
                        Username
                        <input type="text" name="username" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Repeat Password
                        <input type="password" name="repeat_password" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" className="button" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default FormRegister;
