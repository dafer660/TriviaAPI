# Full Stack API Final Project

## Full Stack Trivia

------------

#### Changed and edited by Daniel Ferreira 

This project is a Trivia App created by Udacity as part of Full Stack Web Developer Program. Everyone can play Trivia and contribute by adding Questions and Categories.
It is also capable of registering new users and login in order to play the quiz!

Here it is what the Trivia App should be able to do:

1. **Display questions** - both all questions and by category. Questions should show the question, category and difficulty rating by default and can show/hide the answer.
2. **Delete questions**.
3. **Add questions** and require that they include question and answer text and select a category and rating.
4. **Add Categories** so that we can lookup and group questions by category.
5. **Search for questions** based on a text query string.
6. **Play the quiz game**, randomizing either all questions or within a specific category.
7. **Register**, **Login** and **Logout** feature.

## Getting Started

------------

### Pre-requisites and Local Development

Developers using this project should already have Python3, pip and node installed on their local machines.
Backend

From the **backend folder** run **pip install requirements.txt**. All required packages are included in the requirements file.

To run the application (on Windows) run the following commands:

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Virtual Environment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virtual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by navigating to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server.

- [Flask-Praetorian](https://flask-praetorian.readthedocs.io/en/latest/) which will be used to handle the register, login and logout features. It comes in handy as it allows for JWT authentication and we handle that well from React.

## Database Setup

------------
With Postgres running, restore a database using the trivia.psql file provided. From the backend folder in terminal run:

###### From the command line (Windows):
```commandline
psql trivia -f 'trivia.psql'
```
###### From the terminal (Linux/macOS):
```bash
psql trivia < trivia.psql
```

**NOTE:** you can also specify a database and user when running the _**psql**_ file if necessary. 
```commandline
psql -d trivia -U postgres -f 'trivia.psql'
```
## Running the server

------------

### Backend

From within the `backend` directory first ensure you are working using your created virtual environment. The server should run on port 5001.

To run the server (port 5001), execute:

```commandline
set FLASK_APP=flaskr
set FLASK_ENV=development
flask run --port 5001
```

The application should run on http://127.0.0.1:5001/ by default and there is a proxy in the ``frontend`` configuration.

- Setting the `FLASK_ENV` variable to `development` will detect file changes and restart the server automatically.
- Setting the `FLASK_APP` variable to `flaskr` directs flask to use the `flaskr` directory and the `__init__.py` file to find the application.

### Frontend

From within the `frontend` directory, check that you have a ``package.json`` file and run the command below:

```commandline
npm install // only once to install dependencies
npm start
```

By default, the frontend will run on localhost:3000.

### Tests

In order to run tests navigate to the backend folder and run the following commands:

```commandline
dropdb trivia_test
createdb trivia_test
psql -d trivia_test -U postgres -f 'trivia.psql'
python -m unittest test_flaskr.TriviaTestCase
```

NOTE: if running for the first time, you can ommit the command ``dropdb trivia_test``

## API Reference

------------

### Getting Started


- **Base URL**: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, http://127.0.0.1:5001/, which is set as a proxy in the frontend configuration.
  
- **Authentication**: This version of the application requires authentication but it is handled solely using **JWT tokens** generated using **Flask-Praetorian** package.


### Error Handling

Errors are returned as JSON objects in the following format, with an example below for code error ``400``:

```python
    @app.errorhandler(400)
    def bad_reques(error):
        return jsonify({
            'message': error.description,
            'error': 400,
            'success': False
        }), 400
```

The API will return the following error types when requests fail:
```python
400: Bad Request
401: Unauthorized
404: Resource Not Found
405: Method Not Allowed
422: Not Processable
500: Internal Server Error
```

### Endpoints

##### GET /test

- General:
    - It is a protected route using ``@auth_required`` decorator from Flask-Praetorian
    - Returns a test message to check the current authenticated user simply for testing.
    - Requires the user to have a valid JWT token in order to return the message
- Sample: ``curl http://127.0.0.1:5001/test -X GET -H "Authorization: Bearer TOKEN"``

```json
{
    "message": "protected endpoint (allowed user trivia)"
}
```

##### GET /user

- General:
    - It is a protected route using ``@auth_required`` decorator from Flask-Praetorian.
    - Tries to get the ``current_user()`` and return it with a JSON format using the ``format() method`` from the User object.
    
  
- Sample: ``curl http://127.0.0.1:5001/user -X GET -H "Authorization: Bearer TOKEN"``

````json
{
    "authenticated": true,
    "status": 200,
    "user": {
        "active": true,
        "id": 1,
        "roles": "admin",
        "username": "trivia"
    }
}
````

##### POST /login

- General:
    - Tries to login the user, provided the ``username`` and ``password``.
    - If successful, returns a JSON object with ``authenticated``, ``status``, ``token`` and the ``user``.
    - Otherwise, it will return a JSON object with ``authenticated to False``, ``status 400`` and a ``message``.
  
- Sample: 
```commandline
  curl http://127.0.0.1:5001/login -X POST -H "Content-Type: application/json" -d "{"username":"trivia", "password":"trivia"}"
  ```
```json
{
    "authenticated": true,
    "status": 200,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTkyNzQ0MzksImV4cCI6MTYxOTM2MDgzOSwianRpIjoiMmJiNGVlNGEtMjMxNC00Mjg0LTkzOTQtZDUwOTcyY2Y4NDc1IiwiaWQiOjEsInJscyI6ImFkbWluIiwicmZfZXhwIjoxNjIxODY2NDM5fQ.IcjlvXPv_nBE-clwhcSdN6QITa_f6ArilJhTm7rc-Pk",
    "user": {
        "active": true,
        "id": 1,
        "roles": "admin",
        "username": "trivia"
    }
}
```

##### POST /register

- General:
    - Registers the user.
    - Validates if the fields are empty and aborts with code 400 if that is the case.
    - If the passwords match, the user is registered (using the ``insert`` method) and redirected to the login page.

- Sample:
```commandline
curl http://127.0.0.1:5001/login -X POST -H "Content-Type: application/json" -d {"username":"test", "password":"test", "repeat_password": "test"}
```

````json
{
    "registered": true,
    "status": 200
}
````

##### GET /categories

- General:
    - Returns the **list of categories** (method ``categorize`` is ran) and the **amount of categories**.
  
- Sample: 
````commandline
curl http://127.0.0.1:5001/categories -X GET -H "Content-Type: application/json"
````
````json
{
    "categories": {
        "1": "Science",
        "2": "Art",
        "3": "Geography",
        "4": "History",
        "5": "Entertainment",
        "6": "Sports"
    },
    "total_categories": 6
}
````

##### POST /category

- General:
    - Adds a new category to the database.
    - It requires a ``category name`` and a ``svg image`` (which will be renamed to the category name passed).
    - The form has a ``file upload dialog`` in order to upload the file.
    - The file will be stored in the ``folder frontend/public``.
  
- Sample Result:
````json
{
    "category": "Football",
    "image": "test.svg"
}
````

##### GET /questions

- General:
    - Returns a list of ``questions``, ``categories`` and the ``amount of questions`` to show in the main page.
    - Results are paginated in groups of 10 according to the config variable ``PAGINATION`` in ``config.py``.
  
- Sample: 
````commandline
curl hhttp://localhost:5001/questions -X GET -H "Content-Type: application/json"
````  
````json
{
    "categories": {
        "1": "Science",
        "2": "Art",
        "3": "Geography",
        "4": "History",
        "5": "Entertainment",
        "6": "Sports",
        "7": "Football"
    },
    "current_category": {},
    "questions": [
        {
            "answer": "Apollo 13",
            "category": 5,
            "difficulty": 4,
            "id": 2,
            "question": "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?",
            "rating": null
        },
        {
            "answer": "Tom Cruise",
            "category": 5,
            "difficulty": 4,
            "id": 4,
            "question": "What actor did author Anne Rice first denounce, then praise in the role of her beloved Lestat?",
            "rating": null
        },
        {
            "answer": "Maya Angelou",
            "category": 4,
            "difficulty": 2,
            "id": 5,
            "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?",
            "rating": null
        },
        {
            "answer": "Edward Scissorhands",
            "category": 5,
            "difficulty": 3,
            "id": 6,
            "question": "What was the title of the 1990 fantasy directed by Tim Burton about a young man with multi-bladed appendages?",
            "rating": null
        },
        {
            "answer": "Muhammad Ali",
            "category": 4,
            "difficulty": 1,
            "id": 9,
            "question": "What boxer's original name is Cassius Clay?",
            "rating": null
        },
        {
            "answer": "Brazil",
            "category": 6,
            "difficulty": 3,
            "id": 10,
            "question": "Which is the only team to play in every soccer World Cup tournament?",
            "rating": null
        },
        {
            "answer": "Uruguay",
            "category": 6,
            "difficulty": 4,
            "id": 11,
            "question": "Which country won the first ever soccer World Cup in 1930?",
            "rating": null
        },
        {
            "answer": "George Washington Carver",
            "category": 4,
            "difficulty": 2,
            "id": 12,
            "question": "Who invented Peanut Butter?",
            "rating": null
        },
        {
            "answer": "Lake Victoria",
            "category": 3,
            "difficulty": 2,
            "id": 13,
            "question": "What is the largest lake in Africa?",
            "rating": null
        },
        {
            "answer": "The Palace of Versailles",
            "category": 3,
            "difficulty": 3,
            "id": 14,
            "question": "In which royal palace would you find the Hall of Mirrors?",
            "rating": null
        }
    ],
    "total_questions": 19
}
````

##### DELETE /questions/{question_id}

- General:
    - Deletes a question according to the ``question_id``.
    - This is triggered when you click the _trash bin_ on the main page on a specific question.
    - It returns ``questions``, ``total questions``, ``categories`` and the ``current category``.
  
- Sample:

````commandline
curl http://127.0.0.1:5001/questions/25 -X DELETE -H "Content-Type: application/json"
````

##### POST /question

- General:
    - Adds a new questions to the database.
    - Returns all the form data submitted.
  
- Sample: 
````commandline
curl http://127.0.0.1:5001/question -X POST -H "Content-Type: application/json" -d '{"question": "test question", "answer": "test answer", "category": 1, "difficulty": 1, "rating": 1}'
````
````json
{
    "answer": "test answer",
    "category": 1,
    "difficulty": 1,
    "question": "test question",
    "rating": 1
}
````

##### POST /questions

- General:
    - Returns the questions, total questions and current category according to the search term provided (case-insensitive).
  
- Sample: 
````commandline
curl http://127.0.0.1:5001/questions -X POST -H "Content-Type: application/json" -d "{"searchTerm": "bird"}"
````  
````json
{
    "current_category": {},
    "questions": [
        {
            "answer": "Maya Angelou",
            "category": 4,
            "difficulty": 2,
            "id": 5,
            "question": "Whose autobiography is entitled 'I Know Why the Caged Bird Sings'?",
            "rating": null
        }
    ],
    "total_questions": 1
}
````

##### GET /categories/{category_id}/questions

- General:
    - Returns the **questions** according to the **category id**.
    
- Sample:
````commandline
curl http://127.0.0.1:5001/categories/1/questions -H "Content-Type: application/json"
````
````json
{
    "current_category": {
        "id": 1,
        "type": "Science"
    },
    "questions": [
        {
            "answer": "The Liver",
            "category": 1,
            "difficulty": 4,
            "id": 20,
            "question": "What is the heaviest organ in the human body?",
            "rating": null
        }
      ...
    ],
    "total_questions": 5
}
````

##### POST /quizzes

- General:
    - Returns a list of the previous questions (*so they won't repeat if there are more than 5 questions in that specific category*) and a random question (according to the category selected).
      
- Sample:
````commandline
curl http://127.0.0.1:5001/questions -X POST -H "Content-Type: application/json" -d "{"previous_questions": [],"quiz_category": { "type": "", "id": 1 }}"
````  
````json
{
    "previousQuestions": [],
    "question": {
        "answer": "Blood",
        "category": 1,
        "difficulty": 4,
        "id": 22,
        "question": "Hematology is a branch of medicine involving the study of what?",
        "rating": null
    }
}
````

##### POST /save_score

- General:
    - Saves the user's quiz score to the database.
    - Returns status of 200 if score is saved.
    - Returns status of 400 if score is not saved.
    - Requires authentication, or a valid token.
  
- Sample:
````commandline
curl http://localhost:5001/save_score -X POST -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{"user": {"username": "test"}, "num_correct": 1}"
````  
````json
{
    "message": "score saved",
    "status": 200
}
````