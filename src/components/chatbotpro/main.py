from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Carga el modelo GPT-2
chatbot = pipeline("text-generation", model="gpt2")

def chat_with_gpt(prompt):
    respuesta = chatbot(prompt, max_new_tokens=200, pad_token_id=50256)[0]['generated_text']
    return respuesta[len(prompt):].strip()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    response = chat_with_gpt(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    print("Servidor iniciado en http://localhost:5000")
    app.run(port=5000)