
import os
from flask import Flask, request, jsonify
from flaskext.mysql import MySQL
from dotenv import load_dotenv



load_dotenv()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = os.getenv('MYSQL_DATABASE_USER')
app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_DB'] = os.getenv('MYSQL_DATABASE_DB')
app.config['MYSQL_DATABASE_HOST'] = os.getenv('MYSQL_DATABASE_HOST')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mysql = MySQL()
mysql.init_app(app)

# Ensure the tasks table exists
def create_tasks_table():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(255) NOT NULL
        )
    ''')
    conn.commit()
    cursor.close()
    conn.close()

create_tasks_table()

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT id, description FROM tasks")
    tasks = [{'id': row[0], 'description': row[1]} for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    description = data.get('description')
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (description) VALUES (%s)", (description,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Task added'}), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
