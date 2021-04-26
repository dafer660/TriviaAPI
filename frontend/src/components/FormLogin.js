import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import $ from 'jquery';

import '../stylesheets/FormLogin.css';

class FormLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }

    }

    login = (event) => {
        event.preventDefault();

        $.ajax({
            url: '/login',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
                if (result.status  === 200) {
                    sessionStorage.setItem('token', result.token)
                    this.props.setUser(result);
                }
                return;
            },
            error: (error) => {
                document.getElementById("login-form").reset();
                alert('Unable to login. Please try your request again')
                return;
            }
        })

        this.setState({
            redirect: true
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'}/>
        }
        return (
            <div id="add-form">
                <h2>Login</h2>
                <form className="form-view" id="login-form" onSubmit={this.login}>
                    <label>
                        Username
                        <input type="text" name="username" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" className="button" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default FormLogin;
