import React, {Component} from 'react';
import $ from 'jquery';

class FormCategory extends Component {
    constructor(props) {
        super();
        this.state = {
            category: '',
            image: ''
        }
    }

    navTo(uri) {
        window.location.href = window.location.origin + uri;
    }

    submitCategory = (event) => {
        event.preventDefault();
        let data = new FormData();

        data.append('category', this.state.category);
        data.append('image', this.state.image);

        $.ajax({
            url: '/category',
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            dataType: 'JSON',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
                document.getElementById("add-category-form").reset();
                this.setState({image: ''});
                return;
            },
            error: (error) => {
                console.log(error.responseJSON.message)
                alert('Unable to add Category. Please try your request again' +
                    '\n' + error.responseJSON.message)
                return;
            }
        })
    }


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleFileChange = (event) => {
        this.setState({image: event.target.files[0]})
    }

    render() {
        return (
            <div id="add-form">
                <h2>Add a New Category</h2>
                <form className="form-view" id="add-category-form" onSubmit={this.submitCategory}>
                    <label>
                        Category Name
                        <input type="text" name="category" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Answer
                        <input type="file" name="image" onChange={this.handleFileChange}/>
                    </label>
                    <input type="submit" className="button" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default FormCategory;