<<<<<<< HEAD
import psycopg2
from psycopg2 import sql

DB_HOST = "localhost"
DB_PORT = "5432"
DB_USER = "postgres"
DB_PASSWORD = "ONOshokwe5002"
DB_NAME = "pomodoro_db"

try:
    connection_o = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cursor_o = connection_o.cursor()
except psycopg2.Error as e:
    print(f"Error connecting to the database: {e}")
    connection_o = None
    cursor_o = None

def create_tables():
    if not cursor_o:
        return
    
    cursor_o.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );
    """)
    cursor_o.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id SERIAL PRIMARY KEY,
            project_id INT REFERENCES projects(id) ON DELETE CASCADE,
            start_time TEXT,
            end_time TEXT
        );
    """)
    cursor_o.execute("""
        CREATE TABLE IF NOT EXISTS timers (
            id SERIAL PRIMARY KEY,
            session_id INT REFERENCES sessions(id) ON DELETE CASCADE,
            type TEXT,
            duration INT
        );
    """)
    connection_o.commit()

def add_project(name):
    if not cursor_o:
        return None
    try:
        adding = """INSERT INTO projects (name) VALUES (%s) RETURNING id"""
        cursor_o.execute(adding, (name,))
        new_id = cursor_o.fetchone()[0]
        connection_o.commit()
        return new_id
    except psycopg2.Error as e:
        print(f"Error adding project: {e}")
        connection_o.rollback()
        return None

def get_projects():
    if not cursor_o:
        return []
    try:
        proj = """SELECT * FROM projects"""
        cursor_o.execute(proj)
        rows = cursor_o.fetchall()
        projects = []
        for row in rows:
            to_add = {"id": row[0], "name": row[1]}
            projects.append(to_add)
        return projects
    except psycopg2.Error as e:
        print(f"Error getting projects: {e}")
        return []

def get_project_by_id(project_id):
    if not cursor_o:
        return None
    try:
        query = """SELECT * FROM projects WHERE id = %s"""
        cursor_o.execute(query, (project_id,))
        row = cursor_o.fetchone()
        if row:
            return {"id": row[0], "name": row[1]}
        return None
    except psycopg2.Error as e:
        print(f"Error checking project: {e}")
        return None


def add_session(project_id, start_time, end_time):
    if not cursor_o:
        return None
    try:
        adding = """
            INSERT INTO sessions (project_id, start_time, end_time)
            VALUES (%s, %s, %s) RETURNING id
        """
        cursor_o.execute(adding, (project_id, start_time, end_time))
        new_id = cursor_o.fetchone()[0]
        connection_o.commit()
        return new_id
    except psycopg2.Error as e:
        print(f"Error adding session: {e}")
        connection_o.rollback()
        return None

def update_session(sesh_id, end_time):
    if not cursor_o:
        return
    try:
        updating = """
            UPDATE sessions
            SET end_time = %s
            WHERE id = %s
        """
        cursor_o.execute(updating, (end_time, sesh_id))
        connection_o.commit()
    except psycopg2.Error as e:
        print(f"Error updating session: {e}")
        connection_o.rollback()

def add_timer(session_id, type, duration):
    if not cursor_o:
        return None
    try:
        adding = """
            INSERT INTO timers (session_id, type, duration)
            VALUES (%s, %s, %s) RETURNING id
        """
        cursor_o.execute(adding, (session_id, type, duration))
        new_id = cursor_o.fetchone()[0]
        connection_o.commit()
        return new_id
    except psycopg2.Error as e:
        print(f"Error adding timer: {e}")
        connection_o.rollback()
        return None
    
def delete_project(project_id):
    if not cursor_o:
        return False
        
    try:
        query = "DELETE FROM projects WHERE id = %s"
        cursor_o.execute(query, (project_id,))
        
        if cursor_o.rowcount == 0:
            connection_o.rollback()
            return False
            
        connection_o.commit()
        return True
        
    except psycopg2.Error as e:
        connection_o.rollback()
        return False

if __name__ == '__main__':
    create_tables()
    
    if cursor_o:
        cursor_o.close()
    if connection_o:
=======
import psycopg2
from psycopg2 import sql

DB_HOST = "localhost"
DB_PORT = "5432"
DB_USER = "postgres"
DB_PASSWORD = "ONOshokwe5002"
DB_NAME = "pomodoro_db"

try:
    connection_o = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cursor_o = connection_o.cursor()
except psycopg2.Error as e:
    print(f"Error connecting to the database: {e}")
    connection_o = None
    cursor_o = None

def create_tables():
    if not cursor_o:
        return
    
    cursor_o.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );
    """)
    cursor_o.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id SERIAL PRIMARY KEY,
            project_id INT REFERENCES projects(id) ON DELETE CASCADE,
            start_time TEXT,
            end_time TEXT
        );
    """)
    cursor_o.execute("""
        CREATE TABLE IF NOT EXISTS timers (
            id SERIAL PRIMARY KEY,
            session_id INT REFERENCES sessions(id) ON DELETE CASCADE,
            type TEXT,
            duration INT
        );
    """)
    connection_o.commit()

def add_project(name):
    if not cursor_o:
        return None
    try:
        adding = """INSERT INTO projects (name) VALUES (%s) RETURNING id"""
        cursor_o.execute(adding, (name,))
        new_id = cursor_o.fetchone()[0]
        connection_o.commit()
        return new_id
    except psycopg2.Error as e:
        print(f"Error adding project: {e}")
        connection_o.rollback()
        return None

def get_projects():
    if not cursor_o:
        return []
    try:
        proj = """SELECT * FROM projects"""
        cursor_o.execute(proj)
        rows = cursor_o.fetchall()
        projects = []
        for row in rows:
            to_add = {"id": row[0], "name": row[1]}
            projects.append(to_add)
        return projects
    except psycopg2.Error as e:
        print(f"Error getting projects: {e}")
        return []

def get_project_by_id(project_id):
    if not cursor_o:
        return None
    try:
        query = """SELECT * FROM projects WHERE id = %s"""
        cursor_o.execute(query, (project_id,))
        row = cursor_o.fetchone()
        if row:
            return {"id": row[0], "name": row[1]}
        return None
    except psycopg2.Error as e:
        print(f"Error checking project: {e}")
        return None


def add_session(project_id, start_time, end_time):
    if not cursor_o:
        return None
    try:
        adding = """
            INSERT INTO sessions (project_id, start_time, end_time)
            VALUES (%s, %s, %s) RETURNING id
        """
        cursor_o.execute(adding, (project_id, start_time, end_time))
        new_id = cursor_o.fetchone()[0]
        connection_o.commit()
        return new_id
    except psycopg2.Error as e:
        print(f"Error adding session: {e}")
        connection_o.rollback()
        return None

def update_session(sesh_id, end_time):
    if not cursor_o:
        return
    try:
        updating = """
            UPDATE sessions
            SET end_time = %s
            WHERE id = %s
        """
        cursor_o.execute(updating, (end_time, sesh_id))
        connection_o.commit()
    except psycopg2.Error as e:
        print(f"Error updating session: {e}")
        connection_o.rollback()

def add_timer(session_id, type, duration):
    if not cursor_o:
        return None
    try:
        adding = """
            INSERT INTO timers (session_id, type, duration)
            VALUES (%s, %s, %s) RETURNING id
        """
        cursor_o.execute(adding, (session_id, type, duration))
        new_id = cursor_o.fetchone()[0]
        connection_o.commit()
        return new_id
    except psycopg2.Error as e:
        print(f"Error adding timer: {e}")
        connection_o.rollback()
        return None

if __name__ == '__main__':
    create_tables()
    
    if cursor_o:
        cursor_o.close()
    if connection_o:
>>>>>>> b853dbc7d9cece335d08c268a4a957f4f04f93c7
        connection_o.close()