import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

def establish_connection():
    """
    Create a database connection based on the :connection_data: parameter
    :connection_data: Connection string attributes
    :returns: psycopg2.connection
    """
    try:
        load_dotenv()

        connect_str = "dbname={} user={} host={} password={}".format(os.environ.get('MY_PSQL_DBNAME'),
                                                                     os.environ.get('MY_PSQL_USER'),
                                                                     os.environ.get('MY_PSQL_HOST'),
                                                                     os.environ.get('MY_PSQL_PASSWORD'))
        conn = psycopg2.connect(connect_str)
        conn.autocommit = True
    except psycopg2.DatabaseError as e:

        print("Cannot connect to database.")
        print(e)
    else:
        return conn


def execute_select(statement, variables=None, fetchall=True):
    """
    Execute SELECT statement optionally parameterized.
    Use fetchall=False to get back one value (fetchone)

    Example:
    > execute_select('SELECT %(title)s; FROM shows', variables={'title': 'Codecool'})
    statement: SELECT statement
    variables:  optional parameter dict, optional parameter fetchall"""
    result_set = []
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute(statement, variables)
            result_set = cursor.fetchall() if fetchall else cursor.fetchone()
    return result_set


def execute_insert(statement, variables=None):
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cursor:
            cursor.execute(statement, variables)


def get_user_by_username(username):
    return(execute_select("""SELECT * FROM promanusers WHERE username = %(username)s;""", variables={'username': username}))


def add_user(username, password, registration_date):
    return(execute_insert("""
    INSERT INTO promanusers (username, password, registration_date) 
    VALUES (%(username)s, %(password)s, %(registration_date)s);""",
                          variables={
                              'username': username,
                              'password': password,
                              'registration_date': registration_date
    }))

