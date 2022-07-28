from flask import Flask, render_template, redirect, url_for, request, flash, session
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import os
import datetime
import re
import util
import data_manager
import secrets

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
SECRET_KEY = secrets.token_urlsafe(16)
app.secret_key = SECRET_KEY
app.permanent_session_lifetime = datetime.timedelta(minutes=1)
load_dotenv()


@app.route("/")
def index():
    if request.method == 'GET':

        """
        This is a one-pager which shows all the boards and cards
        """
        return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()




@app.route("/api/boards/<int:board_id>/cards/", methods=["GET", "POST", "PUT"])
@json_response
def get_cards_for_board(board_id: int):
    if request.method == "POST":
        print("POST")
        print(f'board id : {board_id}')
        status = request.form.get('card_status')
        status_id = None
        if status == "New":
            status_id = 1
        if status == "In Progress":
            status_id = 2
        if status == "Testing":
            status_id = 3
        if status == "Done":
            status_id = 4
        print(f'status id : {status_id}')
        title = request.form.get('title')
        print(f'title : {title}')
        text = request.form.get('text')
        print(f'text : {text}')
        card_order = request.form.get('card_order')
        print(f'card_order : {card_order}')
        return queries.add_new_card(board_id, status_id, title, text, card_order)

    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    if request.method == "GET":
        return queries.get_cards_for_board(board_id)

    elif request.method == "POST":
        board = request.json["board_id"]
        status = request.json["status_id"]
        title = request.json["title"]
        text = request.json["text"]
        card_order = request.json["card_order"]
        return queries.add_new_card(board, status, title, text, card_order)


@app.route("/api/boards/${statusId}/cards/")
@json_response
def get_cards_status_for_board(statusId: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """

    return queries.get_cards_for_board(statusId)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form.get('username')
        original_password = request.form.get('password')
        is_username_taken = data_manager.get_user_by_username(request.form.get('username'))
        username_regex = re.compile(r'[A-Za-z0-9]+')

        if is_username_taken:
            flash('Username already exists, please choose another one!')
            return render_template('register.html')

        if not request.form.get("username") or not request.form.get("password"):
            flash('Fill out the registration form properly!')
            return render_template('register.html')

        elif not re.match(username_regex, username):
            flash('Username must contain only characters and numbers!')
            return render_template('register.html')

        elif len(username) <= 2:
            flash('Username must be at least 3 characters long!')
            return render_template('register.html')

        elif len(original_password) < 5:
            flash('Password must be at least 6 characters long!')
            return render_template('register.html')

        else:
            # Handle registration, adding to DB
            encrypted_password = util.hash_password(original_password)
            register_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            data_manager.add_user(username, encrypted_password, register_date)
            flash('Successful registration. Log in to continue.')
            return redirect(url_for('login'))

    elif request.method == 'POST':
        # Form is empty
        flash('Please fill out the form!')
        return render_template('register.html')

    else:
        return render_template('register.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    # Check if "username" and "password" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        account = data_manager.get_user_by_username(username)
        print(account)

        if account:
            session['id'] = account[0]['id']
            session['username'] = account[0]['username']
            encrypted_password = account[0]['password']
            session.permanent = True
            print(session)

            # If account exists in users table in the database
            if util.verify_password(password, encrypted_password):
                print("Passwords match")
                # Create session data, we can access this data in other routes
                # Redirect to home page
                return redirect(url_for('index'))
            elif 'user' in session:
                return redirect(url_for('index'))

            else:
                # Account doesnt exist or username/password incorrect
                flash('Wrong username or password')
                return redirect(url_for('login'))
        else:
            # Account doesnt exist or username/password incorrect
            flash('Wrong username or password')
            return redirect(url_for('login'))

    return render_template('login.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    user = session['username']
    flash(f'Goodbye {user}')
    session.pop("username", None)
    print(session)
    return redirect(url_for('index'))


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
