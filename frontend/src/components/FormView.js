import React, {Component} from 'react';
import $ from 'jquery';

import classes from '../stylesheets/FormView.module.css';

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer: "",
            difficulty: 1,
            category: 1,
            categories: {},
            rating: 1
        }
    }

    componentDidMount() {
        $.ajax({
            url: `/categories`,
            type: "GET",
            success: (result) => {
                this.setState({categories: result.categories})
                return;
            },
            error: (error) => {
                alert('Unable to load categories. Please try your request again')
                return;
            }
        })
    }


    submitQuestion = (event) => {
        event.preventDefault();
        $.ajax({
            url: '/question',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                question: this.state.question,
                answer: this.state.answer,
                difficulty: this.state.difficulty,
                category: this.state.category,
                rating: this.state.rating
            }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
                document.getElementById("add-question-form").reset();
                return;
            },
            error: (error) => {
                alert('Unable to add question. Please try your request again')
                return;
            }
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div id={classes.addForm}>
                <h2>Add a New Trivia Question</h2>
                <form className={classes.addForm} id="add-question-form" onSubmit={this.submitQuestion}>
                    <label>
                        Question:
                        <input type="text" name="question" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Answer:
                        <input type="text" name="answer" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Difficulty:
                        <select name="difficulty" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <label>
                        Rating:
                        <select name="rating" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <select name="category" onChange={this.handleChange}>
                            {Object.keys(this.state.categories).map(id => {
                                return (
                                    <option key={id} value={id}>{this.state.categories[id]}</option>
                                )
                            })}
                        </select>
                    </label>
                    <input type="submit" className="button" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default FormView;
