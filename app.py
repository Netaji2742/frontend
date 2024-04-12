from flask import Flask, request, jsonify
import random
from level1 import divide_python_code_into_blocks as block_easy
from level2 import divide_python_code_into_blocks as block_medium
from level3 import divide_python_code_into_blocks as block_hard
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def shuffle_blocks(blocks):
    random.shuffle(blocks)
    return blocks

@app.route('/shuffle-blocks', methods=['POST'])
def shuffle_blocks_route():
    data = request.get_json()
    code = data['code']
    level = data['level']
    name = data['name']
    description = data['description']
    instructions = data['instructions']
    
    if level == 'EASY':
        blocks = block_easy(code)
    elif level == 'MEDIUM':
        blocks = block_medium(code)
    elif level == 'HARD':
        blocks = block_hard(code)
    else:
        return jsonify({'error': 'Invalid difficulty level'}), 400
    
    shuffled_blocks = shuffle_blocks(blocks)
    # for block in shuffled_blocks:
    #     for line in block:
    #         print(line)
    return jsonify({'shuffled_blocks': shuffled_blocks, 'level': level, 'name': name, 'description': description, 'instructions': instructions})

if __name__ == '__main__':
    app.run(debug=True)
