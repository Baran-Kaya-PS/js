"""
fichier qui servira à créer une API REST pour notre application pour rajouter des données dans notre base de données
et afficher les données de manière dynamique dans notre application web
voici a quoi ressemble les données du shéma :

{
        "id": 1,
        "guid": "ae5e2029-d3dd-494c-961b-232eb6bba420",
        "isActive": false,
        "balance": "$1,646.55",
        "age": 24,
        "eyeColor": "green",
        "name": "Baxter Paul",
        "gender": "male",
        "company": "ZILCH",
        "email": "baxterpaul@zilch.com",
        "phone": "+1 (912) 554-2036",
        "address": "865 Oceanview Avenue, Graball, North Carolina, 980",
        "about": "Minim non et laborum ut aliqua culpa dolor qui ea esse. Eu amet consectetur aliquip in enim magna eu pariatur Lorem enim commodo cillum nostrud adipisicing. Sint consectetur eiusmod esse cillum nisi labore duis non ullamco. Ad anim ut proident consequat. Id deserunt aliquip commodo laborum sint incididunt. Incididunt nisi id aliqua occaecat exercitation voluptate excepteur sit nisi deserunt.\r\n",
        "registered": "2014-03-11T00:57:16 -01:00",
        "latitude": 44.202238,
        "longitude": 95.099099,
        "tags": [
            "non",
            "esse",
            "voluptate",
            "consequat",
            "deserunt",
            "eu",
            "irure"
        ],
        "friends": [
            {
                "pid": 0,
                "name": "Sheryl Knox"
            },
            {
                "pid": 1,
                "name": "Berta Dawson"
            },
            {
                "pid": 2,
                "name": "Cindy Andrews"
            }
        ],
        "greeting": "Hello, Baxter Paul! You have 6 unread messages.",
        "favoriteFruit": "strawberry"
    }
"""

from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def get_users():
    return jsonify({'users': users})

@app.route('/api/<string:name>', methods=['GET'])
def get_user(name):
    user = [user for user in users if user['name'] == name]
    return jsonify({'user': user[0]})

@app.route('/api', methods=['POST'])
def create_user():
    user = {
        'name': request.json['name'],
        'age': request.json['age'],
        'email': request.json['email']
    }
    users.append(user)
    return jsonify({'users': users})

@app.route('/api/<string:name>', methods=['PUT'])
def edit_user(name):
    user = [user for user in users if user['name'] == name]
    user[0]['name'] = request.json['name']
    user[0]['age'] = request.json['age']
    user[0]['email'] = request.json['email']
    return jsonify({'user': user[0]})

@app.route('/api/<string:name>', methods=['DELETE'])
def delete_user(name):
    user = [user for user in users if user['name'] == name]
    users.remove(user[0])
    return jsonify({'users': users})

if __name__ == '__main__':
    app.run(debug=True, port=8080)


from flask_cors import CORS

CORS(app)
