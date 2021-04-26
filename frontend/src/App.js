import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// import logo from './logo.svg';
import './stylesheets/App.css';
import FormView from './components/FormView';
import QuestionView from './components/QuestionView';
import Header from './components/Header';
import QuizView from './components/QuizView';
import FormCategory from "./components/FormCategory";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import axios from "axios";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: null,
            user: {}
        }
    }

    checkLoginStatus() {
        axios.get('http://localhost:5001/user')
            .then(response => {
                    this.handleLogin(response.data);
                }
            )
            .catch(error => {
                    this.setState({
                        logged_in: false,
                        user: {}
                    })
                }
            )
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogin = (data) => {
        this.setState({
            logged_in: data.authenticated,
            user: data.user
        })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Header isLoggedIn={this.state.logged_in} setUser={this.handleLogin}/>
                    <Switch>
                        <Route path="/"
                               exact
                               component={(props) => <QuestionView currentUser={this.state.user}/>}/>
                        <Route path="/add"
                               component={(props) => <FormView currentUser={this.state.user}/>}/>
                        <Route path="/play"
                               component={(props) => <QuizView currentUser={this.state.user}/>}/>
                        <Route path="/login"
                               component={(props) => <FormLogin isLoggedIn={this.state.logged_in} setUser={this.handleLogin}/>}/>
                        <Route path="/register"
                               component={FormRegister}/>
                        <Route path="/category"
                               component={FormCategory}/>
                        <Route component={(props) => <QuestionView currentUser={this.state.user}/>}/>
                    </Switch>
                </Router>
            </div>
        );

    }
}

export default App;
