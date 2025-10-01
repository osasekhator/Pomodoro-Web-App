from flask import Flask, request, jsonify
from flask_cors import CORS
import database

app = Flask(__name__)
CORS(app, resources={r"/*": {"methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})

@app.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    name = data.get("name")
    
    new_project_id = database.add_project(name)
    
    if new_project_id is not None:
        new_project = {
            "id": new_project_id,
            "name": name,
            "sessions": []
        }
        return jsonify(new_project), 201
    else:
        return jsonify({"error": "Failed to create project in database"}), 500

@app.route('/projects', methods=['GET'])
def get_projects():
    project_list = database.get_projects()
    return jsonify(project_list)

@app.route('/sessions/<int:proj_id>', methods=['POST'])
def add_session(proj_id):
    project = database.get_project_by_id(proj_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    data = request.get_json()
    start_time = data.get("start_time")
    end_time = data.get("end_time") or None
    
    new_session_id = database.add_session(proj_id, start_time, end_time)

    if new_session_id is not None:
        new_session = {
            "id": new_session_id,
            "start_time": start_time,
            "end_time": end_time,
            "timers": []
        }
        return jsonify(new_session), 201
    else:
        return jsonify({"error": "Failed to add session to database"}), 500

@app.route('/sessions/<int:proj_id>', methods=['PUT'])
def update_session(proj_id):
    data = request.get_json()
    end_time = data.get("end_time")
    sesh_id = data.get("session_id")
    
    database.update_session(sesh_id, end_time)
    
    return jsonify({"message": "Session updated successfully"}), 200

@app.route('/timers/<int:proj_id>/<int:session_id>', methods=['POST'])
def add_timer(proj_id, session_id):
    data = request.get_json()
    timer_type = data.get("type")
    duration = data.get("duration")
    
    new_timer_id = database.add_timer(session_id, timer_type, duration)

    if new_timer_id is not None:
        new_timer = {
            "id": new_timer_id,
            "type": timer_type,
            "duration": duration
        }
        return jsonify(new_timer), 201
    else:
        return jsonify({"error": "Failed to add timer to database"}), 500
    
@app.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    """
    Handles DELETE requests to /projects/<project_id> to remove a project.
    """
    # 1. Call the database function to perform the deletion
    success = database.delete_project(project_id)
    
    # 2. Check the result and return the appropriate HTTP response
    if success:
        # 204 No Content is the standard response for a successful DELETE
        return '', 204 
    else:
        # If the project wasn't found or deletion failed
        return jsonify({"error": f"Project with ID {project_id} not found or could not be deleted"}), 404

if __name__ == '__main__':
    database.create_tables()
    app.run()
