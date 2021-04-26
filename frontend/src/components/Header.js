import React, {Component} from 'react';
import classes from '../stylesheets/Header.module.css';
import {Link} from "react-router-dom";



class Header extends Component {

    handleLogout = () => {
        sessionStorage.clear();
        this.props.setUser({
            authenticated: false,
            user: null
        });
    }

    render() {
        let buttons;

        if (this.props.isLoggedIn) {
            buttons = (
                <>
                    <Link className={classes.HeaderItem} to={'/play'}>Quiz</Link>
                    <Link className={classes.HeaderAuth} to={'/'} onClick={this.handleLogout}>Logout</Link>
                </>
            )
        } else {
            buttons = (
                <>
                    <Link className={classes.HeaderAuth} to={'/login'}>Login</Link>
                    <Link className={classes.HeaderAuth} to={'/register'}>Register</Link>
                </>
            )
        }
        return (
            <div className={classes.Header}>
                <Link className={classes.HeaderItem} to={'/'}>Udacitrivia</Link>
                <Link className={classes.HeaderItem} to={'/add'}>Add Question</Link>
                {buttons}
            </div>

        )
    }
}

export default Header;
